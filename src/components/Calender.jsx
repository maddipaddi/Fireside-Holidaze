import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VENUES } from "../utils/constants.mjs";
import { apiRequest } from "../utils/api.mjs";
import { CalendarClock } from "lucide-react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * CustomCalendar component displays a monthly calendar UI for selecting a date range,
 * highlighting booked and available dates, and allowing navigation between months.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.dateFrom - The selected start date in ISO format (YYYY-MM-DD).
 * @param {string} props.dateTo - The selected end date in ISO format (YYYY-MM-DD).
 * @param {function} props.setDateFrom - Function to update the start date.
 * @param {function} props.setDateTo - Function to update the end date.
 *
 * @example
 * <CustomCalendar
 *   dateFrom={dateFrom}
 *   dateTo={dateTo}
 *   setDateFrom={setDateFrom}
 *   setDateTo={setDateTo}
 * />
 */

function CustomCalendar({
  venueId,
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  bookingIdToIgnore,
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const id = venueId;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    async function fetchVenueWithBookings() {
      try {
        const venue = await apiRequest(`${VENUES}/${id}?_bookings=true`);
        setBookings(venue.data.bookings || []);
      } catch (error) {
        console.error("Error fetching venue bookings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenueWithBookings();
  }, [id]);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDayClick = (dateStr) => {
    if (!dateFrom || (dateFrom && dateTo)) {
      setDateFrom(dateStr);
      setDateTo("");
    } else if (new Date(dateStr) > new Date(dateFrom)) {
      setDateTo(dateStr);
    } else {
      setDateFrom(dateStr);
      setDateTo("");
    }
  };

  const generateDays = () => {
    const days = [];

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(
        <div key={`empty-${i}`} className="p-2 border border-gray-300" />,
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(year, month, day);
      currentDay.setHours(0, 0, 0, 0);

      const currentDayISO = currentDay.toISOString().split("T")[0];
      const isSelected =
        dateFrom &&
        dateTo &&
        new Date(currentDayISO) >= new Date(dateFrom) &&
        new Date(currentDayISO) <= new Date(dateTo);
      const isOnlyStartSelected =
        dateFrom && !dateTo && currentDayISO === dateFrom;
      const isPast = currentDay < today;

      const isBooked = bookings.some((booking) => {
        if (booking.id === bookingIdToIgnore) return false;
        const from = new Date(booking.dateFrom);
        const to = new Date(booking.dateTo);
        from.setHours(0, 0, 0, 0);
        to.setHours(0, 0, 0, 0);
        return currentDay >= from && currentDay <= to;
      });

      days.push(
        <div
          key={day}
          onClick={() => !isBooked && handleDayClick(currentDayISO)}
          className={`p-2 text-center border cursor-pointer ${
            isPast
              ? "text-gray-400 cursor-not-allowed"
              : isBooked
                ? "bg-red-500 text-white"
                : isSelected || isOnlyStartSelected
                  ? "bg-primary text-white"
                  : "border-black text-black"
          }`}
        >
          {day}
        </div>,
      );
    }

    return days;
  };

  if (loading) {
    return (
      <>
        <CalendarClock className="mx-auto mb-2 h-6 w-6 animate-spin text-primary" />
        <p className="text-center text-copy">Loading available dates...</p>
      </>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 rounded-lg shadow bg-background">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-copy hover:bg-primary dark:bg-primary dark:hover:bg-copy text-white dark:text-white hover:cursor-pointer transition duration-200 ease-in-out px-4 py-3 rounded"
          onClick={prevMonth}
        >
          &lt;
        </button>
        <h2 className="text-xl font-bold text-black">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button
          className="bg-copy hover:bg-primary dark:bg-primary dark:hover:bg-copy text-white dark:text-white hover:cursor-pointer transition duration-200 ease-in-out px-4 py-3 rounded"
          onClick={nextMonth}
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 text-black text-center font-bold mb-2 gap-1 text-xs sm:text-sm">
        {daysOfWeek.map((day) => (
          <div key={day} className="truncate">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{generateDays()}</div>
      <div className="calendarAvailability mt-3 flex flex-wrap items-center gap-2 text-md sm:text-md">
        <span className="text-black px-2 py-1 rounded">Color meaning:</span>
        <span className="bg-red-500 text-white px-2 py-1 rounded">Booked</span>
        <span className="text-black border px-2 py-1 rounded font-medium">
          Available
        </span>
        <span className="bg-primary text-white border px-2 py-1 rounded font-medium">
          Selected
        </span>
      </div>
    </div>
  );
}

export default CustomCalendar;
