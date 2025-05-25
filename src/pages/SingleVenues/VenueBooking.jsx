import CustomCalendar from "../../components/CustomCalendar/index";
import BookingVenue from "../../components/BookingCard/Index";

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
