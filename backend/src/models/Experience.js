import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  maxCapacity: {
    type: Number,
    required: true,
    min: 1,
  },
  bookedCount: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const dateSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  slots: [timeSlotSchema],
});

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Experience title is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    basePrice: {
      type: Number,
      required: [true, "Base price is required"],
    },
    dates: [dateSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);
