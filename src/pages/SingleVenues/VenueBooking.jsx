import CustomCalendar from "../../components/CustomCalendar/index";
import BookingVenue from "../../components/BookingCard/Index";

/**
 * Renders the booking section for a single venue, including a custom calendar for date selection
 * and a booking form.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.venue - The venue data object.
 * @param {string|number} props.venueId - The unique identifier for the venue.
 * @param {string} props.dateFrom - The selected start date for the booking (ISO string).
 * @param {string} props.dateTo - The selected end date for the booking (ISO string).
 * @param {Function} props.setDateFrom - Function to update the start date.
 * @param {Function} props.setDateTo - Function to update the end date.
 * @returns {JSX.Element} The rendered booking UI for the venue.
 */

function VenueBooking({
  venue,
  venueId,
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
}) {
  return (
    <>
      <div className="h-28 p-2 m-4 mb-16 md:mb-10">
        <CustomCalendar
          venueId={venueId}
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
        />
      </div>
      <div className="pt-80 m-4">
        <BookingVenue
          venue={venue}
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
        />
      </div>
    </>
  );
}

export default VenueBooking;
