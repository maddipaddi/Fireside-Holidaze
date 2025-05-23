import { useState } from "react";
import { apiRequest } from "../utils/api.mjs";
import { SINGLE_BOOKING } from "../utils/constants.mjs";
import { handleError } from "../utils/errorHandler.mjs";
import { showConfirmDialog } from "../utils/showConfirmDialog.mjs";
import { showSuccessMessage } from "../utils/successMessage.mjs";

/**
 * CancelBookingButton component allows the user to cancel (delete) a booking.
 *
 * When clicked, it shows a confirmation dialog. If confirmed, it sends a DELETE request
 * to the booking API, displays a success message, and calls the `onDeleted` callback
 * to update the parent component's state.
 *
 * Shows a loading state while the cancellation is in progress.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.bookingId - The ID of the booking to cancel
 * @param {Function} props.onDeleted - Callback function to be called after successful deletion
 * @returns {JSX.Element} The rendered CancelBookingButton component
 */

export default function CancelBookingButton({ bookingId, onDeleted }) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = await showConfirmDialog(
      "Do you really want to delete this booking?",
    );
    if (!confirmed) return;

    try {
      setDeleting(true);

      await apiRequest(`${SINGLE_BOOKING}/${bookingId}`, {
        method: "DELETE",
      });

      showSuccessMessage("The booking has been cancelled successfully.");
      onDeleted(bookingId);
    } catch (error) {
      handleError(error);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="bg-copy text-white dark:bg-primary dark:text-background font-body font-bold px-4 py-1 rounded shadow hover:bg-red-600 dark:hover:bg-red-500 hover:text-white transition cursor-pointer disabled:opacity-50"
    >
      {deleting ? "Cancelling..." : "Cancel"}
    </button>
  );
}
