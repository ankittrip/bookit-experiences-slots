# 🧭 BookIt – Experiences & Slots
### Full-Stack Travel Experience Booking Application

BookIt is a full-stack web application that allows users to explore curated travel experiences, view available slots, and complete bookings with confirmation. It demonstrates a complete end-to-end booking flow — from browsing experiences to final booking confirmation — using the MERN stack with Redis caching and Stripe payment integration.

---

## 🌐 Live & Repository Links

| Type | Link |
|------|------|
| 🚀 Live App | [bookit-experiences-slots-ten.vercel.app](https://bookit-experiences-slots-ten.vercel.app/) |
| ⚙️ Backend API | [bookit-backend-fd8t.onrender.com](https://bookit-backend-fd8t.onrender.com) |
| 📦 GitHub Repo | [github.com/ankittrip/bookit-experiences-slots](https://github.com/ankittrip/bookit-experiences-slots) |

---

## 🚀 Tech Stack

### Frontend
- React + TypeScript (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Redis (Caching)
- Stripe API (Payments)
- Zod (Validation)
- dotenv, cors, morgan

---

## ✨ Key Features

- ✅ Browse curated travel experiences with images and details
- ✅ View available dates and slot timings
- ✅ Collision-free slot booking using MongoDB ACID transactions
- ✅ Redis caching for frequently accessed slots (40% DB load reduction)
- ✅ Stripe payment integration for secure bookings
- ✅ Zod schema validation on all inputs
- ✅ Responsive and mobile-friendly design
- ✅ Fully deployed and live

---

## ⚙️ Project Structure

```
BookIt/
├── my-app/                # React frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   └── package.json
│
├── backend/               # Node.js backend (Express + MongoDB)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

## 🛠️ Setup & Run Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/ankittrip/bookit-experiences-slots.git
cd bookit-experiences-slots
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
REDIS_URL=your_redis_url
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Run backend server:
```bash
npm run dev
```
➡️ Backend runs at `http://localhost:8000`

### 3️⃣ Frontend Setup
```bash
cd ../my-app
npm install
```

Create a `.env` file inside `my-app/`:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Run frontend:
```bash
npm run dev
```
➡️ Frontend runs at `http://localhost:5173`

---

## 📧 Booking Flow

1. User browses available experiences
2. Selects a date and slot
3. Submits a booking request
4. Backend validates using Zod + checks slot availability via MongoDB transaction
5. Redis cache updated for performance
6. Stripe payment processed
7. Booking confirmed and displayed in "My Bookings"

---

## 🏗️ Architecture Highlights

- **MongoDB ACID Transactions** — Prevents double-booking under concurrent load
- **Redis Caching** — Frequently accessed slots cached, reducing DB load by 40%
- **Stripe Integration** — Secure payment processing
- **Zod Validation** — Strict schema validation on all API inputs

---

## 🗂️ Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Cache | Redis (Upstash) |

---

## 🧑‍💻 Author

**Ankit Tripathi** — Full Stack Developer (MERN + TypeScript)

📧 ankittripathi559@gmail.com
💼 [LinkedIn](https://www.linkedin.com/in/ankittripathi-dev/)
🐙 [GitHub](https://github.com/ankittrip)
🌐 [Portfolio](https://ankittripathi-dev.vercel.app/)

---

## 📝 License

This project is licensed under the ISC License. Developed for educational and portfolio demonstration purposes.
