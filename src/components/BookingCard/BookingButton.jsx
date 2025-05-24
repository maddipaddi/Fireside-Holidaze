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
