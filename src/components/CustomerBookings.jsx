import { useEffect, useState, useContext } from "react";
import { apiRequest } from "../utils/api.mjs";
import { PROFILE } from "../utils/constants.mjs";
import { UserContext } from "./context/UserContext";
import { ChevronDown, Tent, Map } from "lucide-react";
import { handleError } from "../utils/errorHandler.mjs";
import CancelBookingButton from "./DeleteBookings";
import EditBookingModal from "./EditBooking";

/**
 * CustomerBookings component displays a user's upcoming and past venue bookings,
 * grouped by month. Allows toggling visibility of upcoming and past bookings,
 * and supports expanding/collapsing to show all or a limited number of bookings.
 *
 * Fetches bookings data for the logged-in user, sorts them into upcoming and past,
 * and renders them with venue details and images. Handles loading and error states.
 *
 * @component
 * @returns {JSX.Element} The rendered CustomerBookings section.
 */

export default function CustomerBookings() {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showPast, setShowPast] = useState(true);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllPast, setShowAllPast] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bookingToEdit, setBookingToEdit] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const venues = await apiRequest(
          `${PROFILE}/${user.name}/bookings?_venue=true`,
        );
        const allBookings = venues.data;

        const today = new Date();

        const upcoming = allBookings
          .filter((b) => new Date(b.dateTo) >= today)
          .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

        const past = allBookings
          .filter((b) => new Date(b.dateTo) < today)
          .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

        setBookings({ upcoming, past });
      } catch (error) {
        handleError(error);
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

  const renderGroupedBookings = (bookingsArray, showAll, isUpcoming) => {
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
              `${booking.venue.media?.[0]?.url}?auto=format&fit=crop&w=600&q=80` ||
              "https://placehold.co/150x150?text=No+Image";
            const alt = booking.venue.media?.[0]?.alt || booking.venueName;

            return (
              <li
                key={booking.id}
                className="bg-secondary dark:bg-background text-white dark:text-copy p-4 rounded-lg shadow flex flex-col items-center"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-darkbackground dark:border-copy mb-4">
                  <img
                    src={image}
                    alt={alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg dark:text-copy">
                    {booking.venue.name}
                  </p>
                  <p>Guests: {booking.guests}</p>
                  <p className="text-sm dark:text-copy">
                    {new Date(booking.dateFrom).toLocaleDateString()} –{" "}
                    {new Date(booking.dateTo).toLocaleDateString()}
                  </p>
                </div>
                {isUpcoming && (
                  <div className="flex justify-center gap-4 m-4">
                    <button
                      onClick={() => {
                        setBookingToEdit(booking);
                        setIsEditModalOpen(true);
                      }}
                      className="bg-copy text-white dark:bg-primary dark:text-background font-body font-bold px-4 py-1 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer"
                    >
                      Change
                    </button>
                    <CancelBookingButton
                      bookingId={booking.id}
                      onDeleted={(deletedId) =>
                        setBookings((prev) => ({
                          upcoming: prev.upcoming.filter(
                            (b) => b.id !== deletedId,
                          ),
                          past: prev.past,
                        }))
                      }
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        {isEditModalOpen && bookingToEdit && (
          <EditBookingModal
            booking={bookingToEdit}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={(updatedBooking) => {
              setBookings((prev) => ({
                ...prev,
                upcoming: prev.upcoming.map((b) =>
                  b.id === updatedBooking.id ? { ...b, ...updatedBooking } : b,
                ),
              }));
            }}
          />
        )}
      </div>
    ));
  };

  return (
    <section className="px-4 md:px-8 max-w-screen-xl mx-auto">
      <button
        aria-expanded={showUpcoming}
        aria-controls="upcoming-bookings"
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
      </button>

      {showUpcoming && (
        <div id="upcoming-bookings">
          {bookings.upcoming.length === 0 ? (
            <>
              <Tent className="mx-auto mb-2 h-6 w-6 text-primary dark:text-background" />
              <p className="text-center text-copy dark:text-background mb-26">
                Your calendar looks a little lonely. Time to plan your next
                adventure?
              </p>
            </>
          ) : (
            <>
              {renderGroupedBookings(bookings.upcoming, showAllUpcoming, true)}
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
        </div>
      )}

      <button
        aria-expanded={showPast}
        aria-controls="past-bookings"
        className="cursor-pointer flex justify-center items-center gap-2 mt-16"
        onClick={() => setShowPast((prev) => !prev)}
      >
        <h2 className="text-3xl font-bold font-heading text-copy dark:text-background">
          Past bookings
        </h2>
        <ChevronDown
          aria-hidden="false"
          className={`transition-transform duration-300 dark:text-background ${
            showPast ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {showPast && (
        <div id="past-bookings">
          {bookings.past.length === 0 ? (
            <>
              <Map className="mx-auto mb-2 h-6 w-6 text-primary dark:text-background mt-4" />
              <p className="text-center text-copy dark:text-background mb-16">
                No memories yet - your adventures will show up here!
              </p>
            </>
          ) : (
            <>
              {renderGroupedBookings(bookings.past, showAllPast, false)}
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
        </div>
      )}
    </section>
  );
}
