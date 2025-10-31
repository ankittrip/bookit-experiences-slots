import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getExperienceById,
  createBooking,
  validatePromoCode,
} from "../api/experiencesApi";
import type { Experience, PromoValidationResponse,  } from "../api/experiencesApi";

interface BackendBookingData {
  experienceId: string;
  userName: string;
  email: string;
  selectedDate: string;
  selectedTime: string;
  numSeats: number;
  promoCode?: string;
}

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { experienceId, date, slot, quantity = 1 } = location.state || {};

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoValidation, setPromoValidation] =
    useState<PromoValidationResponse | null>(null);
  const [isPromoValidating, setIsPromoValidating] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);


  useEffect(() => {
    const fetchExperience = async () => {
      try {
        if (experienceId) {
          const data = await getExperienceById(experienceId);
          setExperience(data);
        } else {
          setError("No experience selected");
        }
      } catch {
        setError("Failed to fetch experience details");
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [experienceId]);


  const handlePromoValidation = async () => {
    if (!promoCode.trim()) return;
    setIsPromoValidating(true);
    setPromoValidation(null);
    try {
      const result = await validatePromoCode(promoCode);
      setPromoValidation(result);
    } catch {
      setPromoValidation({ valid: false, message: "Invalid promo code" });
    } finally {
      setIsPromoValidating(false);
    }
  };


  const handleBooking = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!experienceId || !date || !slot) {
      setBookingError("Missing booking info");
      return;
    }
    if (!name || !email) {
      setBookingError("Please fill in all required fields");
      return;
    }
    if (!isChecked) {
      setBookingError("Please agree to the terms before proceeding");
      return;
    }

    setIsBooking(true);
    setBookingError(null);

    try {
      const bookingData: BackendBookingData = {
  experienceId,
  userName: name,
  email,
  selectedDate: date,
  selectedTime: slot,
  numSeats: quantity,
  ...(promoValidation?.valid && { promoCode }), 
};


      const result = await createBooking(bookingData);
      navigate("/result", { state: { bookingResult: result } });
    } catch (err: unknown) {
      console.error("Booking failed:", err);
      setBookingError("Booking failed. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };


  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-2 border-gray-400 border-t-transparent rounded-full" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 font-medium mt-10">{error}</div>
    );

  if (!experience) return null;


const subtotal = (experience.price || 0) * quantity;
const taxes = Math.round(subtotal * 0.06);

let discount = 0;

if (promoValidation?.valid) {
  const type = promoValidation.data?.type;
  const value = promoValidation.data?.value;

  if (type === "percentage" && value) {
    discount = Math.round((subtotal * value) / 100);
  } else if (type === "flat" && value) {
    discount = value;
  }
}

const total = subtotal + taxes - discount;



  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-lg font-medium mb-6 flex items-center">
        <span className="mr-2 cursor-pointer" onClick={() => navigate(-1)}>
          ←
        </span>
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <form
          onSubmit={handleBooking}
          className="bg-gray-50 rounded-lg p-6 shadow-sm"
        >
          {bookingError && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
              {bookingError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 bg-white focus:ring-1 focus:ring-yellow-400"
              required
            />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 bg-white focus:ring-1 focus:ring-yellow-400"
              required
            />
          </div>


          <div className="flex mb-3">
            <input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePromoValidation()}
              className="flex-1 p-2 border border-gray-300 rounded-l bg-white"
            />
            <button
              type="button"
              onClick={handlePromoValidation}
              disabled={isPromoValidating}
              className="bg-black text-white px-4 rounded-r font-medium"
            >
              {isPromoValidating ? "..." : "Apply"}
            </button>
          </div>


          <div className="text-sm text-gray-600 mb-4">
            Try these:{" "}
            <span
              className="bg-gray-200 px-3 py-1 rounded cursor-pointer hover:bg-gray-300 mr-2"
              onClick={() => setPromoCode("WELCOME500")}
            >
              WELCOME500
            </span>
            <span
              className="bg-gray-200 px-3 py-1 rounded cursor-pointer hover:bg-gray-300"
              onClick={() => setPromoCode("FESTIVE20")}
            >
              FESTIVE20
            </span>
          </div>

          {promoValidation && (
            <p
              className={`text-sm mb-4 ${
                promoValidation.valid ? "text-green-600" : "text-red-500"
              }`}
            >
              {promoValidation.valid
                ? ` ${promoValidation.message || "Promo applied successfully:)"}`
                : ` ${promoValidation.message || "Invalid promo code"}`}
            </p>
          )}

          <label className="flex items-center text-sm text-gray-700 mb-6">
            <input
              type="checkbox"
              className="mr-2 accent-yellow-400"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            I agree to the terms and safety policy
          </label>
        </form>


        <div className="bg-gray-50 rounded-lg p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-4">Experience</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="flex justify-between">
                <span>Experience</span> <span>{experience.title}</span>
              </p>
              <p className="flex justify-between">
                <span>Date</span>{" "}
                <span>
                  {new Date(date).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Time</span> <span>{slot} IST</span>
              </p>
              <p className="flex justify-between">
                <span>Qty</span> <span>{quantity}</span>
              </p>
              <hr className="my-3" />
              <p className="flex justify-between">
                <span>Subtotal</span> <span>₹{subtotal}</span>
              </p>
              <p className="flex justify-between">
                <span>Taxes</span> <span>₹{taxes}</span>
              </p>
              {discount > 0 && (
                <p className="flex justify-between text-green-600">
                  <span>Discount</span> <span>-₹{discount}</span>
                </p>
              )}
              <hr className="my-3" />
              <p className="flex justify-between font-bold text-base mb-4">
                <span>Total</span> <span>₹{total}</span>
              </p>
            </div>
          </div>


          <button
            onClick={handleBooking}
            disabled={isBooking}
            className={`w-full mt-4 py-3 rounded-md font-semibold transition ${
              isBooking
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-yellow-400 hover:bg-yellow-500 text-black"
            }`}
          >
            {isBooking ? "Processing..." : "Pay and Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
