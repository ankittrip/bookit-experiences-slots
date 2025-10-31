import crypto from "crypto";

export default function generateBookingId() {
  const prefix = "BOOKIT";
  const randomPart = crypto.randomBytes(3).toString("hex").toUpperCase(); 
  const timestampPart = Date.now().toString(36).toUpperCase();
  return `${prefix}-${timestampPart}-${randomPart}`;
}