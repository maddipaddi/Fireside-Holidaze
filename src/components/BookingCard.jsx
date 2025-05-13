import { useState, useEffect } from "react";
import { SINGLE_BOOKING } from "../utils/constants.mjs";
import { apiRequest } from "../utils/api.mjs";

function BookingVenue({ venue }) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const calculatePrice = (from, to) => {
    if (!from || !to) return 0;
    const start = new Date(from);
    const end = new Date(to);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights * venue.price : 0;
  };

  useEffect(() => {
    if (dateFrom && dateTo) {
      if (new Date(dateFrom) > new Date(dateTo)) {
        setError("The end date cannot be before the start date.");
        setTotalPrice(0);
      } else {
        setError("");
        const price = calculatePrice(dateFrom, dateTo);
        setTotalPrice(price);
      }
    }
  }, [dateFrom, dateTo, venue.price]);

  const handleBooking = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("No access token found. Please log in.");
      setLoading(false);
      return;
    }

    const payload = {
      dateFrom,
      dateTo,
      guests,
      venueId: venue.id,
    };

    console.log("Token:", token);
    console.log("Booking payload:", payload);

    try {
      const response = await apiRequest(`${SINGLE_BOOKING}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      console.log(response);

      const data = response.data;

      console.log("Booking successful:", data);
      setSuccess(true);

      setDateFrom("");
      setDateTo("");
      setGuests(1);
      setTotalPrice(0);
    } catch (err) {
      console.error("Booking error:", err.message);
      setError(err.message || "Failed to make booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-background shadow rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-black">
        Book: {venue.name}
      </h2>

      <label className="block mb-2 text-black">
        From:
        <input
          type="date"
          min={today}
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="w-full mt-1 p-2 border rounded text-black"
        />
      </label>

      <label className="block mb-2 text-black">
        To:
        <input
          type="date"
          min={dateFrom || today}
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="w-full mt-1 p-2 border rounded text-black"
        />
      </label>

      <label className="block mb-2 text-black">
        Guests:
        <input
          type="number"
          min="1"
          max={venue.maxGuests}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value) || 1)}
          className="w-full mt-1 p-2 border rounded text-black"
        />
      </label>

      <p className="mt-4 text-lg font-medium text-black">
        Total Price: {totalPrice} {venue.currency || "NOK"}
      </p>

      <button
        onClick={handleBooking}
        disabled={
          loading ||
          !dateFrom ||
          !dateTo ||
          guests < 1 ||
          new Date(dateFrom) > new Date(dateTo) ||
          !!error
        }
        className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 disabled:opacity-50"
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>

      {success && <p className="mt-4 text-green-600">Booking successful!</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}

export default BookingVenue;
