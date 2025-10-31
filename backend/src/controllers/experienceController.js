import mongoose from "mongoose";
import Experience from "../models/Experience.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import SuccessResponse from "../utils/successResponse.js";


export const getAllExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find();
  return SuccessResponse(res, "Experiences fetched successfully", experiences, 200);
});


export const getExperienceById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorResponse("Invalid experience ID format", 400));
  }


  const experience = await Experience.findById(id);

  if (!experience) {
    return next(new ErrorResponse("Experience not found", 404));
  }


  
  return SuccessResponse(res, "Experience details fetched", experience, 200);
});
