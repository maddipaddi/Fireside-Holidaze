import VenueCard from "./VenueCard";

export default function VenueGrid({ venues, renderFooter }) {
  if (!venues || venues.length === 0) {
    return <p>No venues found</p>;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 p-4 max-w-sm md:max-w-3xl xl:max-w-7xl mx-auto">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} renderFooter={renderFooter} />
      ))}
    </div>
  );
}
