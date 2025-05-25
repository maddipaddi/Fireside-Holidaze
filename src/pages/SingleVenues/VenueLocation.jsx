import { MapPin, Building, Flag, Earth } from "lucide-react";

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
