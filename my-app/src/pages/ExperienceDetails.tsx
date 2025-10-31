import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExperienceById } from "../api/experiencesApi";
import type { Experience, ExperienceDate, Slot } from "../api/experiencesApi";
import { ArrowLeft } from "lucide-react";

const ExperienceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);


  useEffect(() => {
    const fetchExperience = async () => {
      try {
        if (id) {
          const data = await getExperienceById(id);
          setExperience(data);
        }
      } catch (err) {
        console.error("Error fetching experience:", err);
        setError("Failed to fetch experience details");
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id]);


  const handleBooking = () => {
    if (selectedDate && selectedSlot && id) {
      navigate("/checkout", {
        state: { experienceId: id, date: selectedDate, slot: selectedSlot, quantity },
      });
    }
  };


  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64 text-red-500 font-medium">
        {error}
      </div>
    );

  if (!experience)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 font-medium">
        Experience not found
      </div>
    );


  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + taxes;


  const selectedDateSlots: Slot[] =
    experience.dates?.find((d: ExperienceDate) => d.date === selectedDate)?.slots ?? [];

  return (
    <div className="w-full bg-white pt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2">

          <div className="flex items-center gap-2 mb-4">
            <button onClick={() => navigate(-1)} className="flex items-center text-black">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-semibold text-lg">Details</span>
            </button>
          </div>


          <div className="mb-6">
            {experience.images?.length ? (
              <img
                src={experience.images[0]}
                alt={experience.title}
                className="w-full h-80 sm:h-96 object-cover rounded-lg"
              />
            ) : (
              <div className="bg-gray-200 w-full h-80 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>


          <h1 className="text-2xl font-bold text-gray-900 mb-2">{experience.title}</h1>
          <p className="text-gray-600 mb-6">{experience.description}</p>


          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Choose date</h3>
            <div className="flex flex-wrap gap-2">
              {experience?.dates?.length ? (
                experience.dates.map((dateObj: ExperienceDate) => (
                  <button
                    key={dateObj.date}
                    onClick={() => {
                      setSelectedDate(dateObj.date);
                      setSelectedSlot(null);
                    }}
                    className={`px-4 py-2 rounded-md border transition ${
                      selectedDate === dateObj.date
                        ? "bg-yellow-400 text-white border-yellow-400"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {new Date(dateObj.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </button>
                ))
              ) : (
                <p className="text-gray-500">No available dates</p>
              )}
            </div>
          </div>


          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Choose time</h3>
              {experience.dates && experience.dates.length ? (
                <div className="flex flex-wrap gap-3">
                  {(selectedDateSlots.length ? selectedDateSlots : experience.dates[0].slots).map(
                    (slot: Slot) => {
                      const seatsLeft = slot.maxCapacity - slot.bookedCount;
                        const isAvailable = seatsLeft > 0;

                  return (
            <button
              key={slot.time}
              onClick={() => isAvailable && setSelectedSlot(slot.time)} 
              disabled={!isAvailable} 
              className={`px-4 py-2 rounded-md border font-medium text-left transition ${
                selectedSlot === slot.time
                  ? "bg-yellow-400 text-white border-yellow-400"
                  : isAvailable
                  ? "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                  : "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed opacity-70"
              }`}
            >
              <div>{slot.time} IST</div>
              <div className="text-xs mt-1 font-medium">
                {isAvailable ? `${seatsLeft} seats left` : "Sold Out"}
              </div>
            </button>
          );
        }
      )}
    </div>
  ) : (
    <p className="text-gray-500">No available time slots</p>
  )}
</div>



          <div className="border-t pt-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
            <p className="text-gray-600">
              Scenic routes, trained guides, and complete safety gear provided.
              Helmets and life jackets included. Perfect for beginners and adventure seekers alike!
            </p>
          </div>
        </div>


        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-xl shadow-sm p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Starts at ₹{experience.price}
            </h3>


            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 border border-gray-300 rounded-md text-lg hover:bg-gray-100"
                >
                  −
                </button>
                <span className="w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 border border-gray-300 rounded-md text-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>


            <div className="space-y-2 text-gray-700 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹{taxes}</span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between font-semibold text-gray-900">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>


            <button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedSlot}
              className={`w-full py-3 rounded-md text-white font-medium transition ${
                selectedDate && selectedSlot
                  ? "bg-yellow-400 hover:bg-yellow-500"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;
