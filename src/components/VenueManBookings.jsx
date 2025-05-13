import { useEffect, useState, useContext } from "react";
import { apiRequest } from "../utils/api.mjs";
import { PROFILE } from "../utils/constants.mjs";
import { UserContext } from "./context/UserContext";

export default function VenueManagerBookings() {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const venues = await apiRequest(
          `${PROFILE}/${user.name}/venues?_bookings=true`,
        );

        const allBookings = venues.data.flatMap((venue) =>
          (venue.bookings || []).map((booking) => ({
            ...booking,
            venueName: venue.name,
            venueId: venue.id,
          })),
        );

        const today = new Date();

        const upcoming = allBookings
          .filter((b) => new Date(b.dateTo) >= today)
          .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

        const past = allBookings
          .filter((b) => new Date(b.dateTo) < today)
          .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

        setBookings({ upcoming, past });
      } catch (error) {
        console.error("Error fetching venue bookings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [user.name]);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <section>
      <h2 className="text-3xl font-bold font-heading mb-10 text-center text-copy dark:text-background">
        Upcoming bookings
      </h2>
      {bookings.length === 0 ? (
        <p className="text-center text-copy">No upcoming bookings yet.</p>
      ) : (
        <ul className="space-y-4 mb-20">
          {bookings.upcoming.map((booking) => (
            <li
              key={booking.id}
              className="bg-secondary dark:bg-background text-white dark:text-copy p-4 rounded-lg shadow"
            >
              <p className="font-semibold">Venue: {booking.venueName}</p>
              <p>Guests: {booking.guests}</p>
              <p>
                From: {new Date(booking.dateFrom).toLocaleDateString()} to{" "}
                {new Date(booking.dateTo).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-3xl font-bold font-heading mb-10 text-center text-copy dark:text-background">
        Past bookings
      </h2>
      {bookings.past.length === 0 ? (
        <p>No past bookings.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.past.map((booking) => (
            <li key={booking.id}>{/* render info */}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
