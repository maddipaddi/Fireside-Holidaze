/**
 * CarouselSlide component displays a single venue slide for a carousel.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.venue - The venue data to display.
 * @param {string} props.venue.name - The name of the venue.
 * @param {Array<{url: string, alt?: string}>} [props.venue.media] - Array of media objects for the venue.
 * @param {number|string} [props.venue.rating] - The rating of the venue.
 * @param {number|string} props.venue.price - The price per night for the venue.
 * @param {function} props.onClick - Callback function to handle click events on the slide.
 *
 * @returns {JSX.Element} The rendered carousel slide component.
 */

export default function CarouselSlide({ venue, onClick }) {
  const image =
    `${venue.media?.[0]?.url}?auto=format&fit=crop&w=600&q=80` ||
    "https://via.placeholder.com/400x300?text=No+Image";
  const alt = venue.media?.[0]?.alt || "Venue image";

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md overflow-hidden h-full min-h-[320px] flex flex-col cursor-pointer hover:shadow-lg transition"
    >
      <img
        src={image}
        alt={alt}
        className="w-full h-48 object-cover rounded-t-xl"
        loading="lazy"
      />
      <div className="p-3 text-left flex-grow flex flex-col justify-between bg-primary text-white font-body border-copy">
        <div>
          <h3 className="font-semibold text-base">{venue.name}</h3>
          <div className="flex items-center gap-1 text-sm mt-1">
            <span>⭐</span>
            <span>{venue.rating || "4.0"}</span>
          </div>
        </div>
        <p className="text-sm mt-1">${venue.price} one night</p>
      </div>
    </div>
  );
}
