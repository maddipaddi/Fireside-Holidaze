import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVenues } from "../components/context/VenueContext.jsx";
import VenueCard from "../components/VenueCard";
import { SearchX } from "lucide-react";
import { Helmet } from "react-helmet-async";

/**
 * Displays search results for venues based on user query, dates, and guest count.
 * Filters venues to only those available through Fireside Holidaze, applies search and availability logic,
 * and shows either matching results or recommended venues if none are found.
 *
 * @component
 * @returns {JSX.Element} The rendered search results page, including loading/error states, results, and recommendations.
 *
 * @example
 * // Renders search results for the current query parameters in the URL
 * <SearchResults />
 */

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

  const isAvailable = (venue, checkIn, checkOut) => {
    if (!checkIn || !checkOut || !Array.isArray(venue.bookings)) return true;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    return !venue.bookings.some((booking) => {
      const bStart = new Date(booking.dateFrom);
      const bEnd = new Date(booking.dateTo);
      return start <= bEnd && end >= bStart; // overlaps
    });
  };

  useEffect(() => {
    if (!venues || venues.length === 0) return;

    const firesideOnly = venues.filter((venue) =>
      venue.description
        ?.toLowerCase()
        .includes("only available through fireside holidaze"),
    );

    let filtered = firesideOnly
      .filter((venue) => {
        const name = venue.name?.toLowerCase() || "";
        const country = venue.location?.country?.toLowerCase() || "";
        return name.includes(query) || country.includes(query);
      })
      .filter((venue) => venue.maxGuests >= guests)
      .map((venue) => ({
        ...venue,
        isAvailable: isAvailable(venue, checkIn, checkOut),
      }));

    setResults(filtered);

    const filteredIds = new Set(filtered.map((v) => v.id));
    const remaining = firesideOnly.filter((v) => !filteredIds.has(v.id));

    const shuffled = [...remaining];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setRecommendations(shuffled.slice(0, 3));
  }, [venues, query, guests]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-600 mt-10">
        Error loading venues: {error.message}
      </p>
    );

  return (
    <>
      <Helmet>
        <title>Search results | Holidaze</title>
        <meta name="description" content={`View search results for ${query}`} />
        <meta
          property="og:title"
          content="Fireside Holidaze - Search results"
        />
        <meta
          property="og:description"
          content={`View search results for ${query}`}
        />
        <meta
          property="og:image"
          content="https://fireside-holidaze.netlify.app/assets/zachary-kyra-derksen-unsplash.jpg"
        />
        <meta
          property="og:url"
          content="https://fireside-holidaze.netlify.app/"
        />
        <meta property="og:type" content="website" />
      </Helmet>
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
            <>
              <SearchX className="mx-auto mb-4 h-6 w-6 text-primary dark:text-background" />
              <p className="text-lg font-semibold mb-2 dark:text-background">
                Nothing found — yet.
              </p>
              <p className="text-copy dark:text-background mb-6">
                Don't worry, the right place is out there. Try adjusting your
                search or browse our suggestions below.
              </p>
            </>

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
                  <div className="min-h-48">
                    <h3 className="text-lg font-bold mb-1">{v.name}</h3>
                    <p className="text-sm">
                      {v.description.length > 150
                        ? `${v.description.slice(0, 150)}…`
                        : v.description}
                    </p>

                    <button
                      onClick={() => navigate(`/venue/${v.id}`)}
                      className="text-sm underline mt-2 hover:text-accent"
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
        )}
      </div>
    </>
  );
};

export default SearchResults;
