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
