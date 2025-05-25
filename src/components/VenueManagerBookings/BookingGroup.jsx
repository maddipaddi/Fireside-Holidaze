import BookingManCard from "./BookingCard";
import { groupByMonth } from "./GroupByMonth";

/**
 * Renders a group of bookings organized by month.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.bookings - The list of booking objects to display.
 * @param {boolean} props.showAll - Whether to show all bookings or only the first three.
 * @returns {JSX.Element[]} A list of grouped bookings by month.
 */

export default function BookingGroup({ bookings, showAll }) {
  const grouped = groupByMonth(showAll ? bookings : bookings.slice(0, 3));

  return Object.entries(grouped).map(([month, items]) => (
    <div key={month} className="mb-12">
      <h3 className="text-xl font-bold mb-4 border-b border-copy/20 dark:border-background/30 text-copy dark:text-background">
        {month}
      </h3>
      <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((booking) => (
          <BookingManCard key={booking.id} booking={booking} />
        ))}
      </ul>
    </div>
  ));
}
