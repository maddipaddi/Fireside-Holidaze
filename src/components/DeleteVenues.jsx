import { useState } from "react";
import { apiRequest } from "../utils/api.mjs";
import { VENUES } from "../utils/constants.mjs";
import { handleError } from "../utils/errorHandler.mjs";
import { showConfirmDialog } from "../utils/showConfirmDialog.mjs";
import { showSuccessMessage } from "../utils/successMessage.mjs";

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
      console.error("Error deleting venue:", error);
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
