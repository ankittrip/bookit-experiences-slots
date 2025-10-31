import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExperienceDetails from "./pages/ExperienceDetails";
import Checkout from "./pages/Checkout";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import BookingDetails from "./pages/BookingDetails";

function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <main className="w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experiences/:id" element={<ExperienceDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/result" element={<Result />} />
          <Route path="/booking/:bookingId" element={<BookingDetails />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
