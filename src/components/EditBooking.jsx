import { useState } from "react";
import { SINGLE_BOOKING } from "../utils/constants.mjs";
import CustomCalendar from "./Calender";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { apiRequest } from "../utils/api.mjs";
import { showSuccessMessage } from "../utils/successMessage.mjs";
import { handleError } from "../utils/errorHandler.mjs";

export default function EditBookingModal({ booking, onClose, onUpdate }) {
  const [dateFrom, setDateFrom] = useState(booking.dateFrom);
  const [dateTo, setDateTo] = useState(booking.dateTo);
  const [guests, setGuests] = useState(booking.guests);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const payload = {
        dateFrom,
        dateTo,
        guests,
      };

      const result = await apiRequest(`${SINGLE_BOOKING}/${booking.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      onUpdate(result.data);
      showSuccessMessage("Your booking was updated!");
      onClose();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50">
      <div className="bg-copy dark:bg-darkbackground rounded-lg shadow-lg p-6 w-full max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer text-background"
          aria-label="Close modal"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold font-heading mt-4 text-background dark:text-background text-center">
          Edit booking for {booking.venue.name}
        </h2>

        <div className="flex gap-6 py-6 text-background dark:text-background justify-center font-medium">
          <p className="font-bold">Current booking:</p>
          <p>Guests: {booking.guests}</p>
          <p>
            {new Date(booking.dateFrom).toLocaleDateString()}
            {new Date(booking.dateTo).toLocaleDateString()}
          </p>
        </div>

        <CustomCalendar
          venueId={booking.venue.id}
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          bookingIdToIgnore={booking.id}
        />
        <div className="bg-background rounded p-4 mx-4 mt-4 mb-20">
          <label htmlFor="guests" className="block text-black font-medium">
            Guests:
            <input
              id="guests"
              name="guests"
              type="number"
              min="1"
              max={booking.venue.maxGuests}
              value={guests}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value > booking.venue.maxGuests) {
                  setGuests(booking.venue.maxGuests);
                } else if (value < 1) {
                  setGuests(1);
                } else {
                  setGuests(value);
                }
              }}
              className="w-full mt-1 p-2 border rounded text-black"
            />
          </label>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-primary dark:bg-background p-6 text-center rounded-b-lg">
          <button
            onClick={handleUpdate}
            disabled={loading || !dateFrom || !dateTo}
            className="bg-background dark:bg-primary text-copy dark:text-white font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer"
          >
            {loading ? "Updating..." : "Update Booking"}
          </button>
        </div>

        {error && <p className="mt-2 text-red-600">{error}</p>}
      </div>
    </div>,
    document.body,
  );
}
