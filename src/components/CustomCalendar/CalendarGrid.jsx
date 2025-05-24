import {
  formatDateToLocalISO,
  isOverlapping,
} from "../../utils/formatDateToLocal";

/**
 * CalendarGrid renders the calendar grid with clickable day cells.
 *
 * @component
 * @param {Object} props
 * @param {Date} props.currentDate - The current month and year.
 * @param {Date} props.today - The date representing 'today'.
 * @param {Array} props.bookings - Array of existing bookings.
 * @param {string} props.dateFrom - Selected start date.
 * @param {string} props.dateTo - Selected end date.
 * @param {function} props.setDateFrom - Setter for start date.
 * @param {function} props.setDateTo - Setter for end date.
 * @param {string|number} [props.bookingIdToIgnore] - Booking ID to ignore (for edit).
 * @returns {JSX.Element[]}
 */
export default function CalendarGrid({
  currentDate,
  today,
  bookings,
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  bookingIdToIgnore,
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleDayClick = (dateStr) => {
    if (!dateFrom || (dateFrom && dateTo)) {
      setDateFrom(dateStr);
      setDateTo("");
    } else if (new Date(dateStr) > new Date(dateFrom)) {
      const newFrom = new Date(dateFrom);
      const newTo = new Date(dateStr);

      const hasOverlap = bookings.some(
        ({ dateFrom: bFrom, dateTo: bTo, id }) => {
          if (id === bookingIdToIgnore) return false;
          const bookingFrom = new Date(bFrom);
          const bookingTo = new Date(bTo);
          bookingFrom.setHours(0, 0, 0, 0);
          bookingTo.setHours(0, 0, 0, 0);
          return isOverlapping(newFrom, newTo, bookingFrom, bookingTo);
        },
      );

      if (hasOverlap) {
        alert("Selected date range overlaps with an existing booking.");
        setDateFrom("");
        return;
      }

      setDateTo(dateStr);
    } else {
      setDateFrom(dateStr);
      setDateTo("");
    }
  };

  const days = [];
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(
      <div key={`empty-${i}`} className="p-2 border border-gray-300" />,
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDay = new Date(year, month, day);
    currentDay.setHours(0, 0, 0, 0);
    const currentDayStr = formatDateToLocalISO(currentDay);
    const isPast = currentDay < today;

    const isSelected =
      dateFrom &&
      dateTo &&
      new Date(currentDayStr) >= new Date(dateFrom) &&
      new Date(currentDayStr) <= new Date(dateTo);

    const isOnlyStartSelected =
      dateFrom && !dateTo && currentDayStr === dateFrom;

    const isBooked = bookings.some(({ id, dateFrom: bFrom, dateTo: bTo }) => {
      if (id === bookingIdToIgnore) return false;
      const from = new Date(bFrom);
      const to = new Date(bTo);
      from.setHours(0, 0, 0, 0);
      to.setHours(0, 0, 0, 0);
      return currentDay >= from && currentDay <= to;
    });

    days.push(
      <div
        key={day}
        onClick={() => !isBooked && !isPast && handleDayClick(currentDayStr)}
        className={`p-2 text-center border cursor-pointer transition-all duration-200 ease-in-out select-none
          ${isPast ? "text-gray-400 cursor-not-allowed" : ""}
          ${isBooked ? "bg-red-500 text-white" : ""}
          ${isSelected || isOnlyStartSelected ? "bg-primary text-white" : "border-black text-black"}`}
      >
        {day}
      </div>,
    );
  }

  return <div className="grid grid-cols-7 gap-1">{days}</div>;
}
