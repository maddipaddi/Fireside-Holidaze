/**
 * BookingButton component renders a styled button for confirming bookings.
 *
 * @param {Object} props
 * @param {boolean} props.loading - Indicates if the booking process is ongoing; shows loading state when true.
 * @param {Function} props.handleBooking - Callback function to handle the booking action when the button is clicked.
 * @param {boolean} props.disabled - If true, disables the button to prevent user interaction.
 * @returns {JSX.Element} The rendered booking button.
 */

function BookingButton({ loading, handleBooking, disabled }) {
  return (
    <button
      onClick={handleBooking}
      disabled={disabled}
      className="mt-4 w-full bg-copy hover:bg-primary dark:bg-primary dark:hover:bg-copy text-white dark:text-white p-2 rounded hover:cursor-pointer transition duration-200 ease-in-out"
    >
      {loading ? "Booking..." : "Confirm Booking"}
    </button>
  );
}
export default BookingButton;
