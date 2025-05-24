/**
 * CalendarHeader component displays the current month and year
 * with buttons to navigate to previous and next months.
 *
 * @component
 * @param {Object} props
 * @param {Date} props.currentDate - The current date object.
 * @param {function} props.onPrev - Callback for previous month button.
 * @param {function} props.onNext - Callback for next month button.
 * @returns {JSX.Element}
 */
export default function CalendarHeader({ currentDate, onPrev, onNext }) {
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div className="flex justify-between items-center mb-4">
      <button
        className="bg-copy hover:bg-primary dark:bg-primary dark:hover:bg-copy text-white hover:cursor-pointer transition px-4 py-3 rounded"
        onClick={onPrev}
      >
        &lt;
      </button>
      <h2 className="text-xl font-bold text-black">
        {month} {year}
      </h2>
      <button
        className="bg-copy hover:bg-primary dark:bg-primary dark:hover:bg-copy text-white hover:cursor-pointer transition px-4 py-3 rounded"
        onClick={onNext}
      >
        &gt;
      </button>
    </div>
  );
}
