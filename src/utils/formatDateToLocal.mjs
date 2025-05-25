/**
 * Formats a JavaScript Date object into a local ISO date string (YYYY-MM-DD).
 *
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string in YYYY-MM-DD format.
 */
export function formatDateToLocalISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Checks if two date ranges overlap.
 *
 * @param {Date} start1 - Start of first range.
 * @param {Date} end1 - End of first range.
 * @param {Date} start2 - Start of second range.
 * @param {Date} end2 - End of second range.
 * @returns {boolean} True if ranges overlap.
 */
export function isOverlapping(start1, end1, start2, end2) {
  return start1 <= end2 && start2 <= end1;
}
