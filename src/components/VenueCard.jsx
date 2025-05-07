export default function VenueCard({ venue, renderFooter }) {
  return (
    <div className="mt-10">
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
      <div className="bg-secondary dark:bg-background text-white dark:text-copy border-3 border-darkbackground dark:border-accent rounded-lg p-4 z-10 relative max-w-xs mx-auto">
        {renderFooter && renderFooter(venue)}
      </div>
    </div>
  );
}
