import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVenues } from "../components/context/VenueContext.jsx";
import VenueCard from "../components/VenueCard";

const SearchResults = () => {
  const { venues, loading, error } = useVenues();
  const [results, setResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const query = params.get("query")?.toLowerCase() || "";
  const checkIn = params.get("checkIn") || "";
  const checkOut = params.get("checkOut") || "";
  const guests = Number(params.get("guests")) || 1;
  const rooms = Number(params.get("rooms")) || 1;

  useEffect(() => {
    if (!venues || venues.length === 0) return;

    const firesideOnly = venues.filter((venue) =>
      venue.description
        ?.toLowerCase()
        .includes("only available through fireside holidaze"),
    );

    let filtered = firesideOnly.filter((venue) => {
      const name = venue.name?.toLowerCase() || "";
      const country = venue.location?.country?.toLowerCase() || "";
      return name.includes(query) || country.includes(query);
    });

    filtered = filtered.filter(
      (venue) => venue.maxGuests >= guests && (venue.meta?.rooms ?? 1) >= rooms,
    );

    setResults(filtered);

    const filteredIds = new Set(filtered.map((v) => v.id));
    const remaining = firesideOnly.filter((v) => !filteredIds.has(v.id));

    const shuffled = [...remaining];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setRecommendations(shuffled.slice(0, 3));
  }, [venues, query, guests, rooms]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-600 mt-10">
        Error loading venues: {error.message}
      </p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold m-6 text-center text-copy dark:text-white font-heading">
        Search results for “{query}”
      </h2>

      <div className="mb-6 text-center">
        <button
          onClick={() => navigate("/")}
          className="text-primary dark:text-accent underline font-body font-medium hover:text-copy dark:hover:text-white transition cursor-pointer"
        >
          ← Back to homepage
        </button>
      </div>

      {results.length === 0 ? (
        <div className="text-center mt-12 text-copy dark:text-white font-body">
          <p className="text-lg font-semibold mb-2">No venues found.</p>
          <p className="text-copy dark:text-white mb-6">
            Try a different search, or check out these suggestions:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 text-copy dark:text-copy">
            {recommendations.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                renderFooter={(v) => (
                  <>
                    <h3 className="text-lg font-bold mb-1">{v.name}</h3>
                    <p className="text-sm">{v.description}</p>
                    <button
                      onClick={() => navigate(`/venue/${v.id}`)}
                      className="text-sm underline mt-2 hover:text-accent"
                    >
                      Read more
                    </button>
                  </>
                )}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              renderFooter={(v) => (
                <>
                  <h3 className="text-lg font-bold mb-1">{v.name}</h3>
                  <p className="text-sm">{v.description}</p>
                  <button
                    onClick={() => navigate(`/venue/${v.id}`)}
                    className="text-sm underline mt-2 hover:text-accent"
                  >
                    Read more
                  </button>
                </>
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
