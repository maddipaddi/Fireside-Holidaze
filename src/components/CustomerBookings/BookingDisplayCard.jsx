import CancelBookingButton from "../DeleteBookings";

/**
 * Displays a card with booking information for a customer, including venue details,
 * booking dates, guest count, and action buttons for upcoming bookings.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.booking - The booking object containing venue and booking details.
 * @param {Object} props.booking.venue - The venue associated with the booking.
 * @param {string} props.booking.venue.name - The name of the venue.
 * @param {Array<{url: string, alt?: string}>} [props.booking.venue.media] - Array of media objects for the venue.
 * @param {number} props.booking.guests - Number of guests for the booking.
 * @param {string|Date} props.booking.dateFrom - Start date of the booking.
 * @param {string|Date} props.booking.dateTo - End date of the booking.
 * @param {string|number} props.booking.id - Unique identifier for the booking.
 * @param {boolean} props.isUpcoming - Whether the booking is upcoming.
 * @param {function} props.onEdit - Callback to handle editing the booking.
 * @param {function} props.onOpenModal - Callback to open the edit modal.
 * @param {function} props.onDelete - Callback to handle booking deletion.
 * @param {function} props.navigate - Function to navigate to a different route.
 * @returns {JSX.Element} The rendered booking display card.
 */

export default function BookingDisplayCard({
  booking,
  isUpcoming,
  onEdit,
  onOpenModal,
  onDelete,
  navigate,
}) {
  const image =
    booking.venue.media?.[0]?.url ??
    "https://placehold.co/150x150?text=No+Image";
  const alt = booking.venue.media?.[0]?.alt || booking.venue.name;

  return (
    <li className="bg-secondary dark:bg-background text-white dark:text-copy p-4 rounded-lg shadow flex flex-col items-center">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-darkbackground dark:border-copy mb-4">
        <img src={image} alt={alt} className="w-full h-full object-cover" />
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
        <div className="flex flex-col items-center gap-2 m-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                onEdit(booking);
                onOpenModal();
              }}
              className="bg-copy text-white dark:bg-primary dark:text-background px-4 py-1 rounded shadow hover:bg-accent/50 cursor-pointer"
            >
              Change
            </button>
            <CancelBookingButton bookingId={booking.id} onDeleted={onDelete} />
          </div>
          <button
            className="bg-copy text-white px-6 py-1 mt-2 rounded shadow hover:bg-accent/50 cursor-pointer"
            onClick={() => navigate(`/venue/${booking.venue.id}`)}
          >
            View venue
          </button>
        </div>
      )}
    </li>
  );
}
