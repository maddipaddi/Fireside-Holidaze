import VenueCard from "../../components/VenueCard";

export default function SearchResultList({ results, navigate }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((venue) => (
        <VenueCard
          key={venue.id}
          venue={venue}
          renderFooter={(v) => (
            <div className="min-h-48">
              <h3 className="text-lg font-bold mb-1">{v.name}</h3>
              <p className="text-sm">
                {v.description.length > 150
                  ? `${v.description.slice(0, 150)}…`
                  : v.description}
              </p>
              <button
                onClick={() => navigate(`/venue/${v.id}`)}
                className="text-sm underline mt-2 hover:text-accent cursor-pointer"
              >
                Read more
              </button>
              {!v.isAvailable && (
                <p className="bg-darkbackground text-center rounded py-2 mt-2 italic font-medium">
                  Not available for selected dates
                </p>
              )}
            </div>
          )}
        />
      ))}
    </div>
  );
}
