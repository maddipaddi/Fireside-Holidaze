import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAllVenues } from "../utils/fetchAllVenues.mjs";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const query = params.get("query")?.toLowerCase() || "";
  const checkIn = params.get("checkIn") || "";
  const checkOut = params.get("checkOut") || "";
  const guests = Number(params.get("guests")) || 1;
  const rooms = Number(params.get("rooms")) || 1;

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        const allVenues = await fetchAllVenues();

        const firesideOnly = allVenues.filter((venue) =>
          venue.description
            ?.toLowerCase()
            .includes("only available through fireside holidaze"),
        );

        let filtered = firesideOnly.filter((venue) =>
          venue.name.toLowerCase().includes(query),
        );

        filtered = filtered.filter(
          (venue) =>
            venue.maxGuests >= guests && (venue.meta?.rooms ?? 1) >= rooms,
        );

        setResults(filtered);
        const remaining = firesideOnly.filter((v) => !filtered.includes(v));
        const shuffled = remaining.sort(() => 0.5 - Math.random());
        setRecommendations(shuffled.slice(0, 3));
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilter();
  }, [query, guests, rooms]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {recommendations.map((venue) => (
              <div
                key={venue.id}
                className="bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/venue/${venue.id}`)}
              >
                <h3 className="font-bold text-md mb-2">{venue.name}</h3>
                <img
                  src={
                    venue.media?.[0]?.url || "https://via.placeholder.com/300"
                  }
                  alt={venue.media?.[0]?.alt || venue.name}
                  className="rounded w-full h-40 object-cover"
                />
                <p className="text-sm mt-2">{venue.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((venue) => (
            <div
              key={venue.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/venue/${venue.id}`)}
            >
              <h3 className="font-bold text-lg">{venue.name}</h3>
              <img
                src={venue.media?.[0]?.url || "https://via.placeholder.com/300"}
                alt={venue.media?.[0]?.alt || venue.name}
                className="w-full h-40 object-cover rounded mt-2"
              />
              <p className="text-sm mt-2">{venue.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
