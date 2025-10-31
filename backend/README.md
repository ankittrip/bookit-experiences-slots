🧳 BookIt Backend (Experiences & Slots)

Backend API for the BookIt web application — enabling users to browse curated experiences, apply promo codes, and manage bookings seamlessly.

⚙️ Setup & Installation
1️⃣ Clone the Repository
git clone https://github.com/your-username/bookit-backend.git
cd bookit-backend

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env file in the project root and add:

PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bookit
NODE_ENV=development

4️⃣ Run the Server
Development mode (auto-reload):
npm run dev

Production mode:
npm start


Server will start on:

http://localhost:8000

🌐 API Endpoints
🧾 Bookings
Method	Endpoint	Description
POST	/api/bookings	Create a new booking
GET	/api/bookings/:bookingId	Get booking details by booking ID
PUT	/api/bookings/:bookingId/cancel	Cancel an existing booking and simulate automatic refund
💸 Promo Codes
Method	Endpoint	Description
POST	/api/promo/validate	Validate a promo code and fetch its details
🎢 Experiences
Method	Endpoint	Description
GET	/api/experiences	Fetch all available experiences
GET	/api/experiences/:id	Get detailed info of a specific experience
📁 Folder Structure
backend/
│
├── src/
│   ├── controllers/
│   │   ├── bookingController.js       # Logic for creating, fetching, and cancelling bookings
│   │   ├── promoController.js         # Logic for validating promo codes
│   │   └── experienceController.js    # Logic for fetching experience data
│   │
│   ├── models/
│   │   ├── Booking.js                 # Booking schema/model
│   │   ├── Experience.js              # Experience schema/model
│   │   └── Promo.js                   # Promo schema/model
│   │
│   ├── routes/
│   │   ├── bookingRoutes.js           # Routes for /api/bookings
│   │   ├── promoRoutes.js             # Routes for /api/promo
│   │   └── experienceRoutes.js        # Routes for /api/experiences
│   │
│   ├── utils/
│   │   ├── asyncHandler.js            # Wrapper for async route handlers
│   │   ├── errorResponse.js           # Standardized error response utility
│   │   ├── successResponse.js         # Standardized success response utility
│   │   └── dateHelper.js              # Helper for date normalization
│   │
│   ├── app.js                         # Initializes Express app, routes, and middleware
│   └── server.js                      # Starts the server and connects to MongoDB
│
├── .env                               # Environment variables (PORT, MONGO_URI)
├── package.json
└── README.md

🧩 File Overview
app.js

Imports and configures Express, CORS, and JSON body parsing

Mounts all API routes

/api/bookings

/api/promo

/api/experiences

Registers global error middleware

Exported for use in server.js

server.js

Imports the Express app from app.js

Connects to MongoDB via Mongoose

Starts the server on the defined PORT (default: 8000)

Logs server and environment info on successful startup

🧠 Base URL
http://localhost:8000/api

✅ Author

Ankit Tripathi

🪪 License

MIT License

🎯 Purpose

Developed for the Fullstack Intern Assignment — “BookIt: Experiences & Slots”, showcasing complete backend functionality with modular architecture, clean API design, and practical real-world use cases.