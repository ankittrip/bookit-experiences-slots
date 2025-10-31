import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { BookingResponse } from "../api/experiencesApi";

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingResult, setBookingResult] = useState<BookingResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const result =
      (location.state as { bookingResult?: BookingResponse })?.bookingResult || null;
    setBookingResult(result);
    setLoading(false);
  }, [location.state]);

  const handleGoHome = () => navigate("/");

  const handleViewDetails = () => {
    if (bookingResult?.data?.bookingId) {
      navigate(`/booking/${bookingResult.data.bookingId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-yellow-500"></div>
      </div>
    );
  }

  const status =
    bookingResult?.data?.status ??
    (bookingResult?.success ? "confirmed" : "failed");

  const bookingId = bookingResult?.data?.bookingId ?? "N/A";
  const isSuccess = status === "confirmed";

  return (
    <div className="bg-white min-h-screen flex flex-col items-center pt-24">


      <div className="text-center px-4">

        <div
          className={`mx-auto mb-5 w-16 h-16 flex items-center justify-center rounded-full ${
            isSuccess ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {isSuccess ? (
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M12 17h0m0-10a9 9 0 110 18 9 9 0 010-18z"
              />
            </svg>
          )}
        </div>


        <h1
          className={`text-lg md:text-xl font-semibold mb-1 ${
            isSuccess ? "text-green-700" : "text-red-700"
          }`}
        >
          {isSuccess
            ? "Booking Confirmed"
            : "We regret that your booking cannot be confirmed"}
        </h1>


        {isSuccess ? (
          <p className="text-gray-700 mb-4 text-sm md:text-base">
            Ref ID: <strong>{bookingId}</strong>
          </p>
        ) : (
          <p className="text-gray-700 mb-4 text-sm md:text-base">
            The paid amount will be refunded to you in 1–2 Business Days
          </p>
        )}


        <div className="flex flex-col md:flex-row gap-3 justify-center mt-4">
          {isSuccess && (
            <button
              onClick={handleViewDetails}
              className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-300 hover:bg-gray-200 transition"
            >
              View Booking Details
            </button>
          )}

          <button
            onClick={handleGoHome}
            className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-300 hover:bg-gray-200 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
