import { useState } from "react";
import { CalendarClock } from "lucide-react";
import { useVenueBookings } from "../../hooks/useVenueBookings";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import CalendarLegend from "./CalendarLegend";

/**
 * CustomCalendar displays a venue-specific date selection calendar.
 *
 * @component
 * @param {Object} props
 * @param {string|number} props.venueId - Venue ID to fetch bookings for.
 * @param {string} props.dateFrom - Currently selected start date.
 * @param {string} props.dateTo - Currently selected end date.
 * @param {function} props.setDateFrom - Setter for start date.
 * @param {function} props.setDateTo - Setter for end date.
 * @param {string|number} [props.bookingIdToIgnore] - Optional booking ID to ignore (for editing).
 * @returns {JSX.Element}
 */

export default function CustomCalendar({
  venueId,
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  bookingIdToIgnore,
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { bookings, loading } = useVenueBookings(venueId);
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (loading) {
    return (
      <div className="text-center">
        <CalendarClock className="mx-auto mb-2 h-6 w-6 animate-spin text-primary" />
        <p className="text-copy">Loading available dates...</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-md mx-auto p-4 rounded-lg shadow bg-background">
        <CalendarHeader
          currentDate={currentDate}
          onPrev={prevMonth}
          onNext={nextMonth}
        />

        <div className="grid grid-cols-7 text-black text-center font-bold mb-2 gap-1 text-xs sm:text-sm">
          {daysOfWeek.map((day) => (
            <div key={day} className="truncate">
              {day}
            </div>
          ))}
        </div>

        <CalendarGrid
          currentDate={currentDate}
          today={today}
          bookings={bookings}
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          bookingIdToIgnore={bookingIdToIgnore}
        />

        <CalendarLegend />
      </div>
    </>
  );
}
