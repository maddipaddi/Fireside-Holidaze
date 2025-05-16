import { useState, useEffect } from "react";
import { SINGLE_BOOKING, SINGLE_VENUE } from "../utils/constants.mjs";
import { apiRequest } from "../utils/api.mjs";
import { useParams } from "react-router-dom";

function BookingVenue({ venue, dateFrom, dateTo, setDateFrom, setDateTo }) {
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (dateFrom && dateTo) {
      const start = new Date(dateFrom);
      const end = new Date(dateTo);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (nights > 0) {
        setTotalPrice(nights * venue.price);
      } else {
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0);
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

    try {
      await apiRequest(SINGLE_BOOKING, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setSuccess(true);
      setGuests(1);
      setDateFrom("");
      setDateTo("");
    } catch (err) {
      console.error("Booking error:", err.message);
      setError(err.message || "Failed to make booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-background shadow rounded-lg max-w-md mx-auto mt-2">
      <h2 className="text-xl font-semibold mb-4 text-black">
        Book: {venue.name}
      </h2>
      <label htmlFor="guests" className="block mb-2 text-black">
        Guests:
        <input
          id="guests"
          name="guests"
          type="number"
          min="1"
          max={venue.maxGuests}
          value={guests}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value > venue.maxGuests) {
              setGuests(venue.maxGuests);
            } else if (value < 1) {
              setGuests(1);
            } else {
              setGuests(value);
            }
          }}
          className="w-full mt-1 p-2 border rounded text-black"
        />
      </label>
      <p className="mt-4 text-lg font-medium text-black">
        Total Price: ${totalPrice}
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
        className="mt-4 w-full bg-copy hover:bg-primary dark:bg-primary dark:hover:bg-copy text-white dark:text-white p-2 rounded hover:cursor-pointer transition duration-200 ease-in-out"
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
      {success && <p className="mt-4 text-green-600">Booking successful!</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}

export default BookingVenue;
