import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";
import Promo from "../models/Promo.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import successResponse from "../utils/successResponse.js";
import generateBookingId from "../utils/generateBookingId.js";
import { normalizeDate } from "../utils/dateHelper.js";




export const createBooking = asyncHandler(async (req, res, next) => {
  const {
    experienceId,
    userName,
    email,
    selectedDate,
    selectedTime,
    numSeats,
    promoCode,
  } = req.body;

 
  if (
    !experienceId ||
    !userName ||
    !email ||
    !selectedDate ||
    !selectedTime ||
    !numSeats
  ) {
    return next(new ErrorResponse("All fields are required", 400));
  }

  
  const experience = await Experience.findById(experienceId);
  if (!experience) {
    return next(new ErrorResponse("Experience not found", 404));
  }


  const normalizedDate = normalizeDate(selectedDate);
  const dateEntry = experience.dates.find(
    (d) => normalizeDate(d.date) === normalizedDate
  );
  if (!dateEntry) {
    return next(new ErrorResponse("Selected date not available", 404));
  }

  const slot = dateEntry.slots.find((s) => s.time === selectedTime);
  if (!slot) {
    return next(new ErrorResponse("Selected time slot not available", 404));
  }

  
  const remainingSeats = slot.maxCapacity - (slot.bookedCount || 0);
  if (remainingSeats < numSeats) {
    return next(
      new ErrorResponse(
        `Only ${remainingSeats} seat(s) left for this slot`,
        409
      )
    );
  }

  
  let totalPrice = experience.basePrice * numSeats;
  if (promoCode) {
    const promo = await Promo.findOne({ code: promoCode, active: true });

    if(!promo) {
      return next(new ErrorResponse("Invalid or expired promo code", 400));
    }


   
    if (promo.type === "percentage") {
      totalPrice -= (totalPrice * promo.value) / 100;
    } else if (promo.type === "flat") {
      totalPrice -= promo.value;
    }

    totalPrice = Math.max(totalPrice, 0);
  }

  
  const updateResult = await Experience.updateOne(
    {
      _id: experienceId,
      "dates.date": normalizedDate,
      "dates.slots.time": selectedTime,
      "dates.slots.bookedCount": { $lte: slot.maxCapacity - numSeats },
    },
    {
      $inc: { "dates.$[date].slots.$[slot].bookedCount": numSeats },
    },
    {
      arrayFilters: [
        { "date.date": normalizedDate },
        { "slot.time": selectedTime },
      ],
    }
  );

  if (updateResult.modifiedCount === 0) {
    return next(
      new ErrorResponse(
        "Slot just got fully booked, please try another one",
        409
      )
    );
  }


  const updatedExperience = await Experience.findById(experienceId);
  const updatedDate = updatedExperience.dates.find(
    (d) => normalizeDate(d.date) === normalizedDate
  );
  const updatedSlot = updatedDate.slots.find((s) => s.time === selectedTime);

  const isFull =
    updatedSlot.bookedCount >= (updatedSlot.maxCapacity || 0) ? false : true;

  await Experience.updateOne(
    {
      _id: experienceId,
      "dates.date": normalizedDate,
      "dates.slots.time": selectedTime,
    },
    {
      $set: {
        "dates.$[date].slots.$[slot].available": isFull,
      },
    },
    {
      arrayFilters: [
        { "date.date": normalizedDate },
        { "slot.time": selectedTime },
      ],
    }
  );

 
  const booking = await Booking.create({
    bookingId: generateBookingId(),
    experienceId,
    userName,
    email,
    selectedDate: normalizedDate,
    selectedTime,
    numSeats,
    totalPrice,
    promoCode: promoCode || null,
    status: "confirmed",
  });

  return successResponse(res, booking, "Booking confirmed successfully", 201);
});



export const getBookingById = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findOne({ bookingId: req.params.bookingId });
  if (!booking) {
    return next(new ErrorResponse("Booking not found", 404));
  }

  res.status(200).json({ success: true, data: booking });
});


export const cancelBooking = asyncHandler(async (req, res, next) => {
  const { bookingId } = req.params;

 
  const booking = await Booking.findOne({ bookingId });
  if (!booking) {
    return next(new ErrorResponse("Booking not found", 404));
  }

  if (booking.status === "cancelled") {
    return next(new ErrorResponse("Booking already cancelled", 400));
  }

  
  booking.status = "cancelled";
  booking.cancelledAt = new Date();

  
  if (booking.paymentStatus === "paid") {
    booking.paymentStatus = "refunded";
    booking.refundedAt = new Date();
  }

  await booking.save();

  
  const updateResult = await Experience.updateOne(
    {
      _id: booking.experienceId,
      "dates.date": booking.selectedDate,
      "dates.slots.time": booking.selectedTime,
    },
    {
      $inc: { "dates.$[date].slots.$[slot].bookedCount": -booking.numSeats },
      $set: { "dates.$[date].slots.$[slot].available": true },
    },
    {
      arrayFilters: [
        { "date.date": booking.selectedDate },
        { "slot.time": booking.selectedTime },
      ],
    }
  );

  if (updateResult.modifiedCount === 0) {
    return next(
      new ErrorResponse("Failed to restore seats for this slot", 400)
    );
  }

 
  if (global.io) {
    global.io.emit("seatUpdate", {
      experienceId: booking.experienceId,
      selectedDate: booking.selectedDate,
      selectedTime: booking.selectedTime,
      change: +booking.numSeats, 
    });
  }

  
  return successResponse(
    res,
    booking,
    `Booking ${booking.bookingId} cancelled and seats restored successfully`
  );
});

