import { useState } from "react";
import { apiRequest } from "../utils/api.mjs";
import { VENUES } from "../utils/constants.mjs";

export default function DeleteVenueButton({ venueId, onDeleted }) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this venue?");
    if (!confirmed) return;

    try {
      setDeleting(true);
      await apiRequest(`${VENUES}/${venueId}`, {
        method: "DELETE",
      });
      onDeleted(venueId);
    } catch (error) {
      console.error("Error deleting venue:", error);
      alert("Something went wrong while deleting the venue.");
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
