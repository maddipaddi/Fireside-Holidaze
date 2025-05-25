import BookingDisplayCard from "./BookingDisplayCard";

/**
 * Groups an array of booking objects by the month and year of their 'dateFrom' property.
 *
 * @param {Array<Object>} bookings - The array of booking objects to group. Each object should have a 'dateFrom' property that can be parsed by Date.
 * @returns {Object} An object where each key is a string in the format "Month Year" (e.g., "January 2024"), and each value is an array of bookings for that month.
 */

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

/**
 * Renders a list of bookings grouped by month.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.bookings - Array of booking objects to display.
 * @param {boolean} props.showAll - Whether to show all bookings or only a subset.
 * @param {boolean} props.isUpcoming - Indicates if the bookings are upcoming.
 * @param {Function} props.onEdit - Callback function to handle editing a booking.
 * @param {Function} props.onOpenModal - Callback function to open a modal for a booking.
 * @param {Function} props.onDelete - Callback function to delete a booking.
 * @param {Function} props.navigate - Function to navigate to a different route.
 * @returns {JSX.Element[]} List of grouped bookings by month.
 */

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
