/**
 * CalendarLegend displays a key for the calendar date colors.
 *
 * @component
 * @returns {JSX.Element}
 */

export default function CalendarLegend() {
  return (
    <>
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
    </>
  );
}
