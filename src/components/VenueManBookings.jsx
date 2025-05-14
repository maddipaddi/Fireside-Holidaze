import { useEffect, useState, useContext } from "react";
import { apiRequest } from "../utils/api.mjs";
import { PROFILE } from "../utils/constants.mjs";
import { UserContext } from "./context/UserContext";
import { ChevronDown } from "lucide-react";

export default function VenueManagerBookings() {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showPast, setShowPast] = useState(true);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllPast, setShowAllPast] = useState(false);

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
            media: Array.isArray(venue.media) ? venue.media : [],
            customer: booking.customer,
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

  if (loading) return <p className="text-center mt-10">Loading bookings...</p>;

  const groupByMonth = (bookingsArray) => {
    const groups = {};
    bookingsArray.forEach((booking) => {
      const month = new Date(booking.dateFrom).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!groups[month]) groups[month] = [];
      groups[month].push(booking);
    });
    return groups;
  };

  const renderGroupedBookings = (bookingsArray, showAll) => {
    const data = showAll ? bookingsArray : bookingsArray.slice(0, 3);
    const grouped = groupByMonth(data);

    return Object.entries(grouped).map(([month, bookings]) => (
      <div key={month} className="mb-12">
        <h3 className="text-xl font-bold mb-4 border-b border-copy/20 dark:border-background/30 text-copy dark:text-background">
          {month}
        </h3>
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {bookings.map((booking) => {
            const image =
              booking.media?.[0]?.url ||
              "https://placehold.co/150x150?text=No+Image";
            const alt = booking.media?.[0]?.alt || booking.venueName;
            const customerName = booking.customer?.name || "Unknown";

            return (
              <li
                key={booking.id}
                className="bg-secondary dark:bg-background text-white dark:text-copy p-4 rounded-lg shadow flex flex-col items-center"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-darkbackground dark:border-accent mb-4">
                  <img
                    src={image}
                    alt={alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg">{booking.venueName}</p>
                  <p>
                    Booked by: <span className="italic">{customerName}</span>
                  </p>
                  <p>Guests: {booking.guests}</p>
                  <p className="text-sm">
                    {new Date(booking.dateFrom).toLocaleDateString()} –{" "}
                    {new Date(booking.dateTo).toLocaleDateString()}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    ));
  };

  return (
    <section className="px-4 md:px-8 max-w-screen-xl mx-auto">
      <div
        className="cursor-pointer flex justify-center items-center gap-2 mb-6"
        onClick={() => setShowUpcoming((prev) => !prev)}
      >
        <h2 className="text-3xl font-bold font-heading text-copy dark:text-background">
          Upcoming bookings
        </h2>
        <ChevronDown
          className={`transition-transform duration-300 dark:text-background ${
            showUpcoming ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {showUpcoming && (
        <>
          {bookings.upcoming.length === 0 ? (
            <p className="text-center text-copy">No upcoming bookings yet.</p>
          ) : (
            <>
              {renderGroupedBookings(bookings.upcoming, showAllUpcoming)}
              {bookings.upcoming.length > 3 && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => setShowAllUpcoming(!showAllUpcoming)}
                    className="underline text-copy dark:text-background hover:text-accent"
                  >
                    {showAllUpcoming
                      ? "Show less"
                      : "Show all upcoming bookings"}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      <div
        className="cursor-pointer flex justify-center items-center gap-2 mt-16 mb-6"
        onClick={() => setShowPast((prev) => !prev)}
      >
        <h2 className="text-3xl font-bold font-heading text-copy dark:text-background">
          Past bookings
        </h2>
        <ChevronDown
          className={`transition-transform duration-300 dark:text-background ${
            showPast ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {showPast && (
        <>
          {bookings.past.length === 0 ? (
            <p className="text-center text-copy">No past bookings.</p>
          ) : (
            <>
              {renderGroupedBookings(bookings.past, showAllPast)}
              {bookings.past.length > 3 && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => setShowAllPast(!showAllPast)}
                    className="underline text-copy dark:text-background hover:text-accent"
                  >
                    {showAllPast ? "Show less" : "Show all past bookings"}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
