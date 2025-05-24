import { useState } from "react";
import { apiRequest } from "../utils/api.mjs";
import { VENUES } from "../utils/constants.mjs";
import { handleError } from "../utils/errorHandler.mjs";
import { showConfirmDialog } from "../utils/showConfirmDialog.mjs";
import { showSuccessMessage } from "../utils/successMessage.mjs";

/**
 * DeleteVenueButton component renders a button to delete a venue.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.venueId - The unique identifier of the venue to delete.
 * @param {function} props.onDeleted - Callback function called after successful deletion, receives the deleted venueId.
 *
 * @example
 * <DeleteVenueButton venueId="123" onDeleted={handleVenueDeleted} />
 */

export default function DeleteVenueButton({ venueId, onDeleted }) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = await showConfirmDialog(
      "Do you really want to delete this venue?",
    );
    if (!confirmed) return;

    try {
      setDeleting(true);

      await apiRequest(`${VENUES}/${venueId}`, {
        method: "DELETE",
      });

      showSuccessMessage("Venue deleted successfully.");
      onDeleted(venueId);
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
      className="bg-copy text-white dark:bg-primary dark:text-background font-body font-bold px-6 py-1 rounded shadow hover:bg-red-600 dark:hover:bg-red-500 hover:text-white transition cursor-pointer disabled:opacity-50"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}
