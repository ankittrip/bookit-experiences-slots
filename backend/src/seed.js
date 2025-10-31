import mongoose from "mongoose";
import dotenv from "dotenv";
import Experience from "./models/Experience.js";
import Promo from "./models/Promo.js";

dotenv.config();

const experiences = [
  {
    title: "Beach Sunset Experience",
    location: "Goa, India",
    description:
      "Enjoy a relaxing evening with live music, bonfire, and a mesmerizing sunset on the Goan beaches.",
    imageUrl:
      "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000",
    basePrice: 4999,
    dates: [
      {
        date: "2025-11-10",
        slots: [
          { time: "08:00 AM", maxCapacity: 10, bookedCount: 4, available: true },
          { time: "02:00 PM", maxCapacity: 10, bookedCount: 9, available: true },
          { time: "06:00 PM", maxCapacity: 10, bookedCount: 10, available: false },
        ],
      },
      {
        date: "2025-11-12",
        slots: [
          { time: "09:00 AM", maxCapacity: 8, bookedCount: 2, available: true },
          { time: "01:00 PM", maxCapacity: 8, bookedCount: 6, available: true },
          { time: "05:30 PM", maxCapacity: 8, bookedCount: 8, available: false },
        ],
      },
      {
        date: "2025-11-15",
        slots: [
          { time: "07:30 AM", maxCapacity: 12, bookedCount: 5, available: true },
          { time: "03:00 PM", maxCapacity: 12, bookedCount: 12, available: false },
        ],
      },
    ],
  },

  {
    title: "Mountain Adventure Trek",
    location: "Manali, Himachal Pradesh",
    description:
      "A thrilling 3-day trek through scenic Himalayan trails with expert guides and campfire nights.",
    imageUrl:
      "https://images.unsplash.com/photo-1706696435436-200ba23cda35?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000",
    basePrice: 8999,
    dates: [
      {
        date: "2025-11-15",
        slots: [
          { time: "06:00 AM", maxCapacity: 15, bookedCount: 5, available: true },
          { time: "10:00 AM", maxCapacity: 15, bookedCount: 10, available: true },
          { time: "04:00 PM", maxCapacity: 15, bookedCount: 15, available: false },
        ],
      },
      {
        date: "2025-11-20",
        slots: [
          { time: "07:00 AM", maxCapacity: 15, bookedCount: 8, available: true },
          { time: "02:00 PM", maxCapacity: 15, bookedCount: 14, available: true },
        ],
      },
      {
        date: "2025-11-25",
        slots: [
          { time: "09:00 AM", maxCapacity: 12, bookedCount: 6, available: true },
          { time: "05:00 PM", maxCapacity: 12, bookedCount: 12, available: false },
        ],
      },
    ],
  },

  {
    title: "Leh–Ladakh Road Expedition",
    location: "Leh–Ladakh, Jammu & Kashmir",
    description:
      "Ride through the majestic Himalayas with breathtaking views, monasteries, and adventure-filled routes.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1673240367277-e1d394465b56?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000",
    basePrice: 14999,
    dates: [
      {
        date: "2025-11-22",
        slots: [
          { time: "05:00 AM", maxCapacity: 10, bookedCount: 3, available: true },
          { time: "12:00 PM", maxCapacity: 10, bookedCount: 8, available: true },
          { time: "06:00 PM", maxCapacity: 10, bookedCount: 10, available: false },
        ],
      },
      {
        date: "2025-11-26",
        slots: [
          { time: "07:00 AM", maxCapacity: 8, bookedCount: 6, available: true },
          { time: "02:00 PM", maxCapacity: 8, bookedCount: 8, available: false },
        ],
      },
      {
        date: "2025-11-30",
        slots: [
          { time: "06:00 AM", maxCapacity: 12, bookedCount: 4, available: true },
          { time: "01:00 PM", maxCapacity: 12, bookedCount: 10, available: true },
        ],
      },
    ],
  },

  {
    title: "City Heritage Walk",
    location: "Jaipur, Rajasthan",
    description:
      "Explore the Pink City’s ancient forts, palaces, and local bazaars with an expert guide.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1697730296129-eb26df35b40b?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000",
    basePrice: 2999,
    dates: [
      {
        date: "2025-11-08",
        slots: [
          { time: "07:00 AM", maxCapacity: 25, bookedCount: 15, available: true },
          { time: "10:00 AM", maxCapacity: 25, bookedCount: 20, available: true },
          { time: "04:00 PM", maxCapacity: 25, bookedCount: 25, available: false },
        ],
      },
      {
        date: "2025-11-14",
        slots: [
          { time: "08:00 AM", maxCapacity: 20, bookedCount: 18, available: true },
          { time: "03:00 PM", maxCapacity: 20, bookedCount: 20, available: false },
        ],
      },
    ],
  },

  {
    title: "Himalayan Spa & Yoga Retreat",
    location: "Rishikesh, Uttarakhand",
    description:
      "Rejuvenate your soul with holistic spa sessions, yoga, and Ayurvedic therapies amidst the Himalayas.",
    imageUrl:
      "https://images.unsplash.com/photo-1542481865-c02fb4f66a22?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=870",
    basePrice: 12999,
    dates: [
      {
        date: "2025-11-18",
        slots: [
          { time: "06:00 AM", maxCapacity: 8, bookedCount: 2, available: true },
          { time: "10:00 AM", maxCapacity: 8, bookedCount: 4, available: true },
          { time: "04:00 PM", maxCapacity: 8, bookedCount: 8, available: false },
        ],
      },
      {
        date: "2025-11-20",
        slots: [
          { time: "07:00 AM", maxCapacity: 10, bookedCount: 5, available: true },
          { time: "05:00 PM", maxCapacity: 10, bookedCount: 10, available: false },
        ],
      },
      {
        date: "2025-11-25",
        slots: [
          { time: "08:00 AM", maxCapacity: 6, bookedCount: 2, available: true },
          { time: "06:00 PM", maxCapacity: 6, bookedCount: 5, available: true },
        ],
      },
    ],
  },

  {
    title: "Meghalaya Caves & Waterfalls Tour",
    location: "Shillong, Meghalaya",
    description:
      "Discover the hidden caves, misty waterfalls, and lush green valleys of Meghalaya with local guides.",
    imageUrl:
      "https://images.unsplash.com/photo-1568535459885-b4fc72e035a4?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000",
    basePrice: 9999,
    dates: [
      {
        date: "2025-11-19",
        slots: [
          { time: "09:00 AM", maxCapacity: 12, bookedCount: 6, available: true },
          { time: "01:00 PM", maxCapacity: 12, bookedCount: 10, available: true },
          { time: "04:30 PM", maxCapacity: 12, bookedCount: 12, available: false },
        ],
      },
      {
        date: "2025-11-22",
        slots: [
          { time: "10:00 AM", maxCapacity: 10, bookedCount: 4, available: true },
          { time: "03:00 PM", maxCapacity: 10, bookedCount: 9, available: true },
        ],
      },
    ],
  },
];

const promos = [
  {
    code: "SAVE10",
    type: "percentage",
    value: 10,
    active: true,
    expiresAt: new Date("2025-12-31"),
  },
  {
    code: "WELCOME500",
    type: "flat",
    value: 500,
    active: true,
    expiresAt: new Date("2026-01-15"),
  },
  {
    code: "FESTIVE20",
    type: "percentage",
    value: 20,
    active: true,
    expiresAt: new Date("2025-11-30"),
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Experience.deleteMany();
    await Experience.insertMany(experiences);
    console.log("Experiences seeded successfully!");

    await Promo.deleteMany();
    await Promo.insertMany(promos);
    console.log("Promo codes seeded successfully!");

    process.exit();
  } catch (err) {
    console.error("Error seeding data:", err.message);
    process.exit(1);
  }
};

seedData();
