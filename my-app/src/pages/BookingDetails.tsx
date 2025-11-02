import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookingById, cancelBooking } from "../api/experiencesApi";
import type { BookingInfo } from "../api/experiencesApi";

const BookingDetails: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<BookingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        if (!bookingId) return;
        const response = await getBookingById(bookingId);
        if (response.success && response.data) setBooking(response.data);
      } catch (error) {
        console.error("Failed to load booking details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  // ✅ Cancel booking handler
  const handleCancelBooking = async () => {
    if (!bookingId) return;
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      setCancelling(true);
      const response = await cancelBooking(bookingId);
      if (response.success) {
        alert(response.message || "Booking cancelled successfully!");
        setBooking((prev) => (prev ? { ...prev, status: "cancelled" } : prev));
      } else {
        alert(response.message || "Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Cancel booking error:", error);
      alert("Something went wrong while cancelling.");
    } finally {
      setCancelling(false);
    }
  };

  // ✅ Add to Google Calendar (with booking ID)
  const handleAddToGoogleCalendar = () => {
    if (!booking) return;

    const start = new Date(`${booking.selectedDate} ${booking.selectedTime}`);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // +1 hour

    const startStr = formatGoogleCalendarDate(start);
    const endStr = formatGoogleCalendarDate(end);

    const title = encodeURIComponent(
      `Booking #${booking.bookingId} — ${booking.experienceId}`
    );

    const details = encodeURIComponent(
      `🎟️ Booking Details:\n` +
        `• Experience: ${booking.experienceId}\n` +
        `• Seats: ${booking.numSeats}\n` +
        `• Total: ₹${booking.totalPrice}\n` +
        `• Status: ${booking.status}\n` +
        `• Payment: ${booking.paymentStatus || "N/A"}`
    );

    const location = encodeURIComponent("BookIt Experiences");

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}&sf=true&output=xml`;

    window.open(googleCalendarUrl, "_blank");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-yellow-500"></div>
      </div>
    );

  if (!booking)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Booking Not Found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="mt-3 px-5 py-2 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-300 hover:bg-gray-200 transition"
        >
          Back to Home
        </button>
      </div>
    );

  const formattedCreatedAt = booking.createdAt
    ? new Date(booking.createdAt).toLocaleString()
    : "N/A";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center pt-24 px-4">
      <div className="relative max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">

        {/* 🎟️ Ticket Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-wide flex items-center gap-2">
              🎫 Booking Ticket
            </h2>
            <p className="text-lg font-semibold mt-1">
              ID: {booking.bookingId}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-md text-sm font-semibold ${
              booking.status === "confirmed"
                ? "bg-green-700"
                : booking.status === "cancelled"
                ? "bg-red-600"
                : "bg-gray-700"
            }`}
          >
            {booking.status.toUpperCase()}
          </span>
        </div>

        {/* 🧾 Ticket Body */}
        <div className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <Info label="👤 Name" value={booking.userName} />
            <Info label="📧 Email" value={booking.email} />
            <Info label="📅 Date" value={booking.selectedDate} />
            <Info label="⏰ Time" value={booking.selectedTime} />
            <Info label="💺 Seats" value={String(booking.numSeats)} />
            <Info label="💰 Total" value={`₹${booking.totalPrice.toLocaleString()}`} />
            <Info label="💳 Payment" value={booking.paymentStatus || "N/A"} />
            <Info label="🕓 Booked On" value={formattedCreatedAt} />
          </div>

          {/* 📆 Add to Google Calendar */}
          {booking.status === "confirmed" && (
            <div className="mt-8 flex justify-start">
              <button
                onClick={handleAddToGoogleCalendar}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 flex items-center gap-2"
              >
                📆 Add to Google Calendar
              </button>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex justify-between items-center mt-10">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-200 transition"
            >
              ⬅ Back
            </button>

            <div className="flex items-center gap-4">
              <div className="border p-2 rounded-lg">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Booking%20ID%3A%20${booking.bookingId}`}
                  alt="QR Code"
                  className="w-16 h-16"
                />
              </div>

              {booking.status === "confirmed" && (
                <button
                  onClick={handleCancelBooking}
                  disabled={cancelling}
                  className={`px-6 py-2 rounded-md font-medium transition ${
                    cancelling
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  {cancelling ? "Cancelling..." : "Cancel"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Utility for Google Calendar
const formatGoogleCalendarDate = (date: Date): string =>
  date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

const Info: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

export default BookingDetails;
