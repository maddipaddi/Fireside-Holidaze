import CancelBookingButton from "../DeleteBookings";

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
              className="bg-copy text-white dark:bg-primary dark:text-background px-4 py-1 rounded shadow hover:bg-accent/50"
            >
              Change
            </button>
            <CancelBookingButton bookingId={booking.id} onDeleted={onDelete} />
          </div>
          <button
            className="bg-copy text-white px-6 py-1 mt-2 rounded shadow hover:bg-accent/50"
            onClick={() => navigate(`/venue/${booking.venue.id}`)}
          >
            View venue
          </button>
        </div>
      )}
    </li>
  );
}
