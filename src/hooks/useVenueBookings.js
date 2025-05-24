import { useState, useEffect } from "react";
import { apiRequest } from "../utils/api.mjs";
import { VENUES } from "../utils/constants.mjs";
import { handleError } from "../utils/errorHandler.mjs";

/**
 * Custom hook to fetch bookings for a specific venue.
 *
 * @param {string|number} venueId - ID of the venue to fetch bookings for.
 * @returns {{ bookings: Array, loading: boolean }} - An object containing bookings and loading state.
 */
export function useVenueBookings(venueId) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await apiRequest(`${VENUES}/${venueId}?_bookings=true`);
        setBookings(res.data.bookings || []);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [venueId]);

  return { bookings, loading };
}
