🧭 BookIt: Experiences & Slots

Full-Stack Travel Experience Booking Application

BookIt is a fullstack web application that allows users to explore curated travel experiences, view available slots, and complete bookings with confirmation. It demonstrates a complete end-to-end booking flow — from browsing experiences to final booking confirmation — using the MERN stack.

🚀 Tech Stack
Frontend

React + TypeScript (Vite)

Tailwind CSS for styling

Axios for API calls

React Router DOM for routing

Backend

Node.js + Express.js

MongoDB + Mongoose

dotenv, cors, and morgan

🌐 Live & Repository Links
Type	Link
Live App	https://bookit-experiences-slots-ten.vercel.app/

Frontend Repo	https://github.com/ankittrip/bookit-experiences-slots/frontend

Backend Repo	https://github.com/ankittrip/bookit-experiences-slots/new/main?filename=README.mdbackend

✨ Key Features

Browse curated travel experiences with images and details

View available dates and slot timings

Book an experience instantly

Manage and view your bookings

Responsive and mobile-friendly design

Fully deployed for live testing

⚙️ Project Structure
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

🛠️ Setup & Run Instructions
1️⃣ Clone Repository
git clone https://github.com/ankit-tripathi/bookit.git
cd bookit

2️⃣ Backend Setup
cd backend
npm install


Create a .env file inside backend/:

PORT=8000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173

Run backend server:

npm run dev

3️⃣ Frontend Setup
cd ../my-app
npm install


Create a .env file inside my-app/:

VITE_API_BASE_URL=http://localhost:8000/api


Run frontend:

npm run dev


Frontend runs at: http://localhost:5173

Backend runs at: http://localhost:8000

📧 Booking Flow Overview

User browses available experiences

Selects a date and slot

Submits a booking request

Backend validates and stores booking in MongoDB


Booking displayed in “My Bookings” section

🗂️ Deployment

Frontend: Vercel / Netlify

Backend: Render / Railway

Database: MongoDB Atlas

Both frontend and backend are connected through environment variables for easy configuration.

🧑‍💻 Author

Ankit Tripathi
Full Stack Developer (MERN)
📧 ankittripathi559@gmailcom

💼 LinkedIn Profile

📝 License

This project uses freely available public data and royalty-free images from sources like Unsplash and Pexels. It is developed solely for educational and demonstration purposes.
