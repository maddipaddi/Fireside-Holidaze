export default function BookingManCard({ booking }) {
  const image =
    `${booking.media?.[0]?.url}?auto=format&fit=crop&w=600&q=80` ||
    "https://placehold.co/150x150?text=No+Image";
  const alt = booking.media?.[0]?.alt || booking.venueName;
  const customerName = booking.customer?.name || "Unknown";

  return (
    <li className="bg-secondary dark:bg-background text-white dark:text-copy p-4 rounded-lg shadow flex flex-col items-center">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-darkbackground dark:border-copy mb-4">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="text-center">
        <p className="font-semibold text-lg dark:text-copy">
          {booking.venueName}
        </p>
        <p>
          Booked by:{" "}
          <span className="italic dark:text-copy">{customerName}</span>
        </p>
        <p>Guests: {booking.guests}</p>
        <p className="text-sm dark:text-copy">
          {new Date(booking.dateFrom).toLocaleDateString()} –{" "}
          {new Date(booking.dateTo).toLocaleDateString()}
        </p>
      </div>
    </li>
  );
}
