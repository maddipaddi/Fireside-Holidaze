import { useState, useEffect } from "react";
import { SINGLE_BOOKING } from "../../utils/constants.mjs";
import { apiRequest } from "../../utils/api.mjs";
import { showSuccessMessage } from "../../utils/successMessage.mjs";
import { handleError } from "../../utils/errorHandler.mjs";
import { useNavigate } from "react-router-dom";

import GuestInput from "./GuestInput";
import TotalPrice from "./TotalPrice";
import BookingButton from "./BookingButton";
import LoginPrompt from "./LoginPrompt";

/**
 * BookingVenue component allows users to book a venue by selecting dates and the number of guests.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.venue - The venue object containing details such as name, price, maxGuests, and id.
 * @param {string} props.dateFrom - The start date of the booking (ISO string).
 * @param {string} props.dateTo - The end date of the booking (ISO string).
 * @param {Function} props.setDateFrom - Function to update the start date.
 * @param {Function} props.setDateTo - Function to update the end date.
 *
 * @returns {JSX.Element} The rendered booking card UI for the venue.
 */

function BookingVenue({ venue, dateFrom, dateTo, setDateFrom, setDateTo }) {
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (dateFrom && dateTo) {
      const start = new Date(dateFrom);
      const end = new Date(dateTo);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setTotalPrice(nights > 0 ? nights * venue.price : 0);
    } else {
      setTotalPrice(0);
    }
  }, [dateFrom, dateTo, venue.price]);

  const handleBooking = async () => {
    const payload = { dateFrom, dateTo, guests, venueId: venue.id };

    try {
      await apiRequest(SINGLE_BOOKING, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      showSuccessMessage("You have booked this venue!");
      setGuests(1);
      setDateFrom("");
      setDateTo("");
      navigate("/profile");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-background shadow rounded-lg max-w-md mx-auto mt-2">
      <h2 className="text-xl font-semibold mb-4 text-black">
        Book: {venue.name}
      </h2>

      {isLoggedIn ? (
        <>
          <GuestInput
            guests={guests}
            setGuests={setGuests}
            maxGuests={venue.maxGuests}
          />
          <TotalPrice totalPrice={totalPrice} />
          <BookingButton
            loading={loading}
            handleBooking={handleBooking}
            disabled={
              loading ||
              !dateFrom ||
              !dateTo ||
              guests < 1 ||
              new Date(dateFrom) > new Date(dateTo) ||
              !!error
            }
          />
        </>
      ) : (
        <LoginPrompt />
      )}
    </div>
  );
}

export default BookingVenue;
