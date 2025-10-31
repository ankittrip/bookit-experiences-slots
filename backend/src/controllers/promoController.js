import Promo from "../models/Promo.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import successResponse from "../utils/successResponse.js";



export const validatePromo = asyncHandler(async (req, res, next) => {
  const { code } = req.body;

  if (!code) {
    return next(new ErrorResponse("Promo code is required", 400));
  }

  const promo = await Promo.findOne({ code, active: true });
  if (!promo) {
    return next(new ErrorResponse("Invalid or expired promo code", 404));
  }


  return successResponse(res, promo, "Promo code valid", 200);
});
