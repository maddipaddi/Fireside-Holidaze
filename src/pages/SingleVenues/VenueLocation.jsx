import { MapPin, Building, Flag, Earth } from "lucide-react";

/**
 * Renders the location details of a venue, including address, zip code, city, country, and continent.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.location - The location object containing venue details.
 * @param {string} props.location.address - The street address of the venue.
 * @param {string} props.location.zip - The zip or postal code of the venue.
 * @param {string} props.location.city - The city where the venue is located.
 * @param {string} props.location.country - The country where the venue is located.
 * @param {string} props.location.continent - The continent where the venue is located.
 * @returns {JSX.Element} The rendered location section.
 */

function VenueLocation({ location }) {
  return (
    <section className="mx-4 md:mx-auto my-12 bg-background dark:bg-background text-copy rounded-lg shadow-md p-6 max-w-md">
      <h3 className="text-xl font-heading mb-4 text-center">Location</h3>
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <MapPin />
          <span>{location.address}</span>
        </li>
        <li className="flex items-center gap-2">
          <Building />
          <span>
            {location.zip}, {location.city}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <Flag />
          <span>{location.country}</span>
        </li>
        <li className="flex items-center gap-2">
          <Earth />
          <span>{location.continent}</span>
        </li>
      </ul>
    </section>
  );
}

export default VenueLocation;
