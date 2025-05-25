/**
 * Displays detailed information about a venue, including its description and maximum guest capacity.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.venue - The venue object containing details to display.
 * @param {string} props.venue.description - A description of the venue.
 * @param {number} props.venue.maxGuests - The maximum number of guests allowed at the venue.
 * @returns {JSX.Element} The rendered venue information section.
 */

function VenueInfo({ venue }) {
  return (
    <>
      <section className="max-w-xl mx-auto">
        <h3 className="text-center font-heading">About the cabin</h3>
        <p className="pt-4 pb-8 px-10">{venue.description}</p>
        <p className="pt-4 pb-8 px-10 font-semibold">
          Maximum guests: {venue.maxGuests}
        </p>
      </section>
    </>
  );
}

export default VenueInfo;
