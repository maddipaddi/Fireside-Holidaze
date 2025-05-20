/**
 * Renders a card component displaying venue information with an image and a customizable footer.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.venue - The venue object containing details to display.
 * @param {Array} [props.venue.media] - Optional array of media objects for the venue.
 * @param {string} [props.venue.media[].url] - URL of the venue's image.
 * @param {string} [props.venue.media[].alt] - Alternative text for the venue's image.
 * @param {string} props.venue.name - Name of the venue, used as fallback alt text.
 * @param {function} [props.renderFooter] - Optional render function for the card's footer, receives the venue object as an argument.
 * @returns {JSX.Element} The rendered VenueCard component.
 */

export default function VenueCard({ venue, renderFooter }) {
  return (
    <div className="mt-10">
      <div className="w-44 h-44 rounded-full overflow-hidden border-3 border-darkbackground dark:border-background mx-auto -mb-6 z-0">
        <img
          src={
            venue.media?.[0]?.url ||
            "https://placehold.co/150x150?text=No+Image"
          }
          alt={venue.media?.[0]?.alt || venue.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-secondary dark:bg-secondary text-white dark:text-white border-3 border-darkbackground dark:border-background rounded-lg p-4 z-10 relative max-w-xs mx-auto">
        {renderFooter && renderFooter(venue)}
      </div>
    </div>
  );
}
