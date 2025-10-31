import express from "express";
import { createBooking, getBookingById, cancelBooking } from "../controllers/bookingController.js";

const router = express.Router();


router.post("/", createBooking);
router.get("/:bookingId", getBookingById);
router.put("/:bookingId/cancel", cancelBooking);

export default router;
