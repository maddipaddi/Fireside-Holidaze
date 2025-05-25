import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/api.mjs";
import { PROFILE } from "../../utils/constants.mjs";
import { handleError } from "../../utils/errorHandler.mjs";
import { UserContext } from "../context/UserContext";
import EditBookingModal from "../EditBooking";
import BookingList from "./BookingList";
import ToggleSection from "./ToggleSection";
import EmptyState from "./EmptyState";
import { Tent, Map } from "lucide-react";

/**
 * Displays the customer's bookings, separated into upcoming and past bookings.
 * Allows toggling visibility of each section, showing more/less bookings, and editing upcoming bookings.
 *
 * Fetches bookings for the current user from the API and sorts them into upcoming and past based on the current date.
 * Provides UI for editing and deleting upcoming bookings, and viewing past bookings.
 *
 * @component
 * @returns {JSX.Element} The rendered customer bookings section.
 */

export default function CustomerBookings() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
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
        const today = new Date();

        const upcoming = venues.data
          .filter((b) => new Date(b.dateTo) >= today)
          .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

        const past = venues.data
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

  return (
    <>
      <section className="px-4 md:px-8 max-w-screen-xl mx-auto">
        <ToggleSection
          title="Upcoming bookings"
          icon={<Tent className="h-6 w-6" />}
          expanded={showUpcoming}
          toggle={() => setShowUpcoming((prev) => !prev)}
        />
        {showUpcoming &&
          (bookings.upcoming.length === 0 ? (
            <EmptyState
              icon={<Tent />}
              text="Your calendar looks a little lonely. Time to plan your next adventure?"
            />
          ) : (
            <>
              <BookingList
                bookings={bookings.upcoming}
                showAll={showAllUpcoming}
                isUpcoming
                onEdit={setBookingToEdit}
                onOpenModal={() => setIsEditModalOpen(true)}
                onDelete={(id) =>
                  setBookings((prev) => ({
                    ...prev,
                    upcoming: prev.upcoming.filter((b) => b.id !== id),
                  }))
                }
                navigate={navigate}
              />
              {bookings.upcoming.length > 3 && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => setShowAllUpcoming((prev) => !prev)}
                    className="underline text-copy dark:text-background hover:text-accent cursor-pointer"
                  >
                    {showAllUpcoming
                      ? "Show less"
                      : "Show all upcoming bookings"}
                  </button>
                </div>
              )}
            </>
          ))}

        <ToggleSection
          title="Past bookings"
          icon={<Map className="h-6 w-6" />}
          expanded={showPast}
          toggle={() => setShowPast((prev) => !prev)}
          className="mt-16"
        />
        {showPast &&
          (bookings.past.length === 0 ? (
            <EmptyState
              icon={<Map />}
              text="No memories yet - your adventures will show up here!"
            />
          ) : (
            <>
              <BookingList
                bookings={bookings.past}
                showAll={showAllPast}
                isUpcoming={false}
                onDelete={() => {}} // no delete on past
                navigate={navigate}
              />
              {bookings.past.length > 3 && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => setShowAllPast((prev) => !prev)}
                    className="underline text-copy dark:text-background hover:text-accent cursor-pointer"
                  >
                    {showAllPast ? "Show less" : "Show all past bookings"}
                  </button>
                </div>
              )}
            </>
          ))}

        {isEditModalOpen && bookingToEdit && (
          <EditBookingModal
            booking={bookingToEdit}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={(updated) => {
              setBookings((prev) => ({
                ...prev,
                upcoming: prev.upcoming.map((b) =>
                  b.id === updated.id ? { ...b, ...updated } : b,
                ),
              }));
            }}
          />
        )}
      </section>
    </>
  );
}
