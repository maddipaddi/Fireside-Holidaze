/**
 * Groups an array of booking objects by their start month and year.
 *
 * @param {Array<Object>} bookingsArray - Array of booking objects, each containing a `dateFrom` property.
 * @returns {Object} An object where each key is a string representing the month and year (e.g., "January 2024"),
 * and the value is an array of bookings that start in that month.
 */

export function groupByMonth(bookingsArray) {
  const groups = {};
  bookingsArray.forEach((booking) => {
    const month = new Date(booking.dateFrom).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    if (!groups[month]) groups[month] = [];
    groups[month].push(booking);
  });
  return groups;
}
