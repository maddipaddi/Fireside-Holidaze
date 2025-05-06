import { Star } from "lucide-react";

function VenueCards({ venues }) {
  if (!venues || venues.length === 0) {
    return <p>No venues found</p>;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 p-4 max-w-sm md:max-w-3xl xl:max-w-7xl mx-auto">
      {venues.map((venue) => (
        <div key={venue.id} className="">
          <div className="w-44 h-44 rounded-full overflow-hidden border-3 border-darkbackground dark:border-accent mx-auto -mb-6 z-0">
            <img
              src={
                venue.media?.[0]?.url ||
                "https://placehold.co/150x150?text=No+Image"
              }
              alt={venue.media?.[0]?.alt || venue.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-secondary dark:bg-background text-white dark:text-copy border-3 border-darkbackground dark:border-accent rounded-lg p-4 z-10 relative">
            <div className="flex justify-between">
              <h2 className="text-base font-semibold">{venue.name}</h2>
              <div className="flex gap-1 h-8 self-start">
                <Star />
                <p>{venue.rating}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="font-thin">${venue.price} one night</p>
              <button className="bg-copy text-white dark:bg-primary text-copy dark:text-background font-body font-bold px-2 py-1 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer">
                Read more
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VenueCards;
