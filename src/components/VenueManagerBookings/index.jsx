import { useEffect, useState, useContext } from "react";
import { apiRequest } from "../../utils/api.mjs";
import { PROFILE } from "../../utils/constants.mjs";
import { UserContext } from "../context/UserContext";
import { Tent, Map } from "lucide-react";
import { handleError } from "../../utils/errorHandler.mjs";
import BookingGroup from "./BookingGroup";

import EmptyState from "./EmptyState";
import SectionToggle from "./SectionToggle";

/**
 * VenueManagerBookings component displays upcoming and past bookings for venues managed by the current user.
 *
 * - Fetches all venues owned by the user and their associated bookings.
 * - Separates bookings into upcoming and past based on the current date.
 * - Allows toggling visibility of upcoming and past bookings sections.
 * - Supports "show all" and "show less" functionality for both booking groups.
 * - Displays empty state messages when there are no bookings in a group.
 *
 * @component
 * @returns {JSX.Element} The rendered VenueManagerBookings component.
 */

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
        const upcoming = allBookings.filter((b) => new Date(b.dateTo) >= today);
        const past = allBookings.filter((b) => new Date(b.dateTo) < today);

        setBookings({
          upcoming: upcoming.sort(
            (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom),
          ),
          past: past.sort(
            (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom),
          ),
        });
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [user.name]);

  if (loading) return <p className="text-center mt-10">Loading bookings...</p>;

  return (
    <>
      <section className="px-4 md:px-8 max-w-screen-xl mx-auto">
        <SectionToggle
          title="Upcoming bookings on my venues"
          isOpen={showUpcoming}
          toggle={() => setShowUpcoming((prev) => !prev)}
        />
        {showUpcoming && (
          <div id="upcoming-bookings">
            {bookings.upcoming.length === 0 ? (
              <EmptyState
                icon={Tent}
                message="It's quiet for now. Your venue is ready — just waiting to be discovered!"
              />
            ) : (
              <>
                <BookingGroup
                  bookings={bookings.upcoming}
                  showAll={showAllUpcoming}
                />
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

        <SectionToggle
          title="Past bookings on my venues"
          isOpen={showPast}
          toggle={() => setShowPast((prev) => !prev)}
        />
        {showPast && (
          <div id="past-bookings">
            {bookings.past.length === 0 ? (
              <EmptyState
                icon={Map}
                message="No completed bookings yet. Your venue is waiting to make its first memories."
              />
            ) : (
              <>
                <BookingGroup bookings={bookings.past} showAll={showAllPast} />
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
    </>
  );
}
