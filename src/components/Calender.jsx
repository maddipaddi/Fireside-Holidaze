import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VENUES } from "../utils/constants.mjs";
import { apiRequest } from "../utils/api.mjs";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CustomCalendar() {
  const today = new Date();
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    async function fetchVenueWithBookings() {
      try {
        const venue = await apiRequest(`${VENUES}/${id}?_bookings=true`);
        setBookings(venue.data.bookings || []);
      } catch (error) {
        console.error("Error fetching venue bookings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenueWithBookings();
  }, [id]);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const generateDays = () => {
    const days = [];

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(
        <div key={`empty-${i}`} className="p-2 border border-gray-300" />,
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(year, month, day);
      currentDay.setHours(0, 0, 0, 0); // Normalize time

      const isBooked = bookings.some((booking) => {
        const from = new Date(booking.dateFrom);
        const to = new Date(booking.dateTo);
        from.setHours(0, 0, 0, 0);
        to.setHours(0, 0, 0, 0);
        return currentDay >= from && currentDay <= to;
      });

      days.push(
        <div
          key={day}
          className={`p-2 text-center border ${
            isBooked ? "bg-red-500 text-white" : "border-black text-black"
          }`}
        >
          {day}
        </div>,
      );
    }

    return days;
  };

  if (loading) return <p>Loading calendar...</p>;

  return (
    <div className="max-w-md mx-auto p-4 rounded-lg shadow dark:bg-background">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-accent text-white px-4 py-3 rounded hover:dark:bg-secondary"
          onClick={prevMonth}
        >
          &lt;
        </button>
        <h2 className="text-xl font-bold text-black">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button
          className="bg-accent text-white px-4 py-3 rounded hover:dark:bg-secondary"
          onClick={nextMonth}
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 text-black text-center font-bold mb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{generateDays()}</div>
    </div>
  );
}

export default CustomCalendar;
