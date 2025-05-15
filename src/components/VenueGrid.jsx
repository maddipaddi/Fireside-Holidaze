import VenueCard from "./VenueCard";
import { Home } from "lucide-react";

export default function VenueGrid({ venues, renderFooter }) {
  if (!venues || venues.length === 0) {
    return (
      <div className="text-center px-4">
        <Home className="mx-auto mb-4 h-6 w-6 text-primary" />
        <p className="text-l font-heading text-copy mb-2">
          You have't listed any cabins yet.
        </p>
        <p className="text-m text-muted mb-6">
          Share your space and become a host with Fireside Holidaze.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 p-4 max-w-sm md:max-w-3xl xl:max-w-7xl mx-auto">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} renderFooter={renderFooter} />
      ))}
    </div>
  );
}
