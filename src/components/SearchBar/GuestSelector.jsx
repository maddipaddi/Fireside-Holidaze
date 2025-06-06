/**
 * GuestSelector component allows users to increment or decrement the number of guests within a specified range.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {number} props.guests - The current number of guests selected.
 * @param {function} props.increment - Function to increment the number of guests.
 * @param {function} props.decrement - Function to decrement the number of guests.
 * @returns {JSX.Element} The rendered guest selector UI.
 */

const GuestSelector = ({ guests, increment, decrement }) => (
  <fieldset className="bg-offwhite p-3 rounded text-center w-full md:col-span-1">
    <legend className="block text-sm font-semibold font-body text-copy pt-10">
      Guests
    </legend>
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={decrement}
        disabled={guests <= 1}
        className={`px-2 py-1 rounded ${guests <= 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200"}`}
      >
        -
      </button>
      <span>{guests}</span>
      <button
        type="button"
        onClick={increment}
        disabled={guests >= 12}
        className={`px-2 py-1 rounded ${guests >= 12 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200"}`}
      >
        +
      </button>
    </div>
  </fieldset>
);

export default GuestSelector;
