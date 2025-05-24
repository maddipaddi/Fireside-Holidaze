import BookingDisplayCard from "./BookingDisplayCard";

function groupByMonth(bookings) {
  const grouped = {};
  bookings.forEach((booking) => {
    const month = new Date(booking.dateFrom).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    if (!grouped[month]) grouped[month] = [];
    grouped[month].push(booking);
  });
  return grouped;
}

export default function BookingList({
  bookings,
  showAll,
  isUpcoming,
  onEdit,
  onOpenModal,
  onDelete,
  navigate,
}) {
  const shown = showAll ? bookings : bookings.slice(0, 3);
  const grouped = groupByMonth(shown);

  return Object.entries(grouped).map(([month, bookings]) => (
    <div key={month} className="mb-12">
      <h3 className="text-xl font-bold mb-4 border-b text-copy dark:text-background">
        {month}
      </h3>
      <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {bookings.map((booking) => (
          <BookingDisplayCard
            key={booking.id}
            booking={booking}
            isUpcoming={isUpcoming}
            onEdit={onEdit}
            onOpenModal={onOpenModal}
            onDelete={onDelete}
            navigate={navigate}
          />
        ))}
      </ul>
    </div>
  ));
}
