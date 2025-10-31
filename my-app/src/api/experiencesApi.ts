import api from "./api";
import axios from "axios";


export interface Slot {
  time: string;
  available: boolean;
  maxCapacity: number;
  bookedCount: number;
  _id?: string;
}


export interface ExperienceDate {
  date: string;
  slots: Slot[];
  _id?: string;
}


export interface Experience {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  images: string[];
  dates?: ExperienceDate[];
  availableSlots?: { date: string; time: string; remainingSeats: number }[];
}




export interface BookingData {
  experienceId: string;
  userName: string;
  email: string;
  selectedDate: string;
  selectedTime: string;
  numSeats: number;
  promoCode?: string;
}


export interface BookingInfo {
  bookingId: string;
  experienceId: string;
  userName: string;
  email: string;
  selectedDate: string;
  selectedTime: string;
  numSeats: number;
  totalPrice: number;
  promoCode?: string;
  status: "confirmed" | "failed" | "cancelled";
  paymentStatus?: string;
  cancelledAt?: string | null;
  refundedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
}

export interface BookingResponse {
  success: boolean;
  message?: string;
  data?:BookingInfo;
}



export interface PromoValidationResponse {
  success?: boolean;
  valid: boolean;
  message?: string;
  discountPercentage?: number; 
  data?: {
    type: "flat" | "percentage";
    value: number;
  };
}




interface BackendExperience {
  _id: string;
  title: string;
  description: string;
  location: string;
  basePrice?: number;
  price?: number;
  imageUrl?: string;
  dates?: ExperienceDate[];
  about?: string;
}




   export const getBookingById = async (bookingId: string): Promise<BookingResponse> => {
  const response = await api.get(`/api/bookings/${bookingId}`);
  return response.data;
};



export const getAllExperiences = async (): Promise<Experience[]> => {
  try {
    const response = await api.get("/api/experiences");
    const resData = response.data;


    const data =
      Array.isArray(resData)
        ? resData
        : Array.isArray(resData.message)
        ? resData.message
        : Array.isArray(resData.data)
        ? resData.data
        : [];

    if (!Array.isArray(data)) {
      console.error("Invalid data format from backend:", resData);
      return [];
    }


    return data.map((exp: BackendExperience): Experience => ({
      _id: exp._id,
      title: exp.title,
      description: exp.description,
      location: exp.location,
      price: exp.basePrice ?? exp.price ?? 0,
      images: exp.imageUrl ? [exp.imageUrl] : [],
      dates: exp.dates ?? [],
      availableSlots:
        exp.dates?.flatMap((d) =>
          d.slots.map((s) => ({
            date: d.date,
            time: s.time,
            remainingSeats: s.maxCapacity - s.bookedCount,
          }))
        ) ?? [],
    }));
  } catch (error) {
    console.error("Error fetching experiences:", error);
    throw error;
  }
};



export const getExperienceById = async (id: string): Promise<Experience> => {
  try {
    const response = await api.get(`/api/experiences/${id}`);
    const exp = response.data.message || response.data.data || response.data;

    return {
      _id: exp._id,
      title: exp.title,
      description: exp.description,
      location: exp.location,
      price: exp.basePrice ?? exp.price ?? 0,
      images: exp.imageUrl ? [exp.imageUrl] : [],
      dates: exp.dates ?? [],
      availableSlots:
        exp.dates?.flatMap((d: ExperienceDate) =>
          d.slots.map((s: Slot) => ({
            date: d.date,
            time: s.time,
            remainingSeats: s.maxCapacity - s.bookedCount,
          }))
        ) ?? [],
    };
  } catch (error) {
    console.error(`Error fetching experience ${id}:`, error);
    throw error;
  }
};

export const cancelBooking = async (
  bookingId: string
): Promise<{ success: boolean; message?: string }> => {
  if (!bookingId) return { success: false, message: "Invalid booking ID" };

  try {
    const response = await api.put(`/api/bookings/${bookingId}/cancel`);
    console.log("Cancel Booking Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return { success: false, message: "Failed to cancel booking" };
  }
};



export const createBooking = async (
  bookingData: BookingData
): Promise<BookingResponse> => {
  try {
    const response = await api.post<BookingResponse>("/api/bookings", bookingData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Booking API error:", error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error("Booking API error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};



export const validatePromoCode = async (
  promoCode: string
): Promise<PromoValidationResponse> => {
  try {
    const response = await api.post("/api/promo/validate", { code: promoCode });
    const data = response.data;
    return {
      valid: data.success || false,
      success: data.success,
      message: data.message,
      data: data.data,
      discountPercentage:
        data.data?.type === "percent" ? data.data.value : undefined,
    };
  } catch (error) {
    console.error("Error validating promo code:", error);
    return { valid: false, message: "Invalid promo code" };
  }
};





export interface UserBooking {
  bookingId: string;
  experienceId: string;
  userName: string;
  email: string;
  selectedDate: string;
  numSeats: number;
  totalPrice: number;
  promoCode?: string;
  status: "confirmed" | "cancelled" | "failed";
  createdAt: string;
}

export const getUserBookings = async (): Promise<UserBooking[]> => {
  try {
    const response = await api.get("/api/bookings");
    const resData = response.data.data || response.data.message || response.data;
    return Array.isArray(resData) ? resData : [];
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return [];
  }
};
