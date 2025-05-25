import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVenues } from "../../components/context/VenueContext.jsx";
import { Helmet } from "react-helmet-async";
import SearchHeading from "./SearchHeading.jsx";
import SearchError from "./SearchError.jsx";
import SearchRecommendations from "./SearchRecommendations.jsx";
import SearchResultList from "./SearchResultList.jsx";

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

export default function SearchResults() {
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
    return !venue.bookings.some(({ dateFrom, dateTo }) => {
      const bStart = new Date(dateFrom);
      const bEnd = new Date(dateTo);
      return start <= bEnd && end >= bStart;
    });
  };

  useEffect(() => {
    if (!venues || venues.length === 0) return;

    const firesideOnly = venues.filter((v) =>
      v.description
        ?.toLowerCase()
        .includes("only available through fireside holidaze"),
    );

    const filtered = firesideOnly
      .filter((v) => {
        const name = v.name?.toLowerCase() || "";
        const country = v.location?.country?.toLowerCase() || "";
        return name.includes(query) || country.includes(query);
      })
      .filter((v) => v.maxGuests >= guests)
      .map((v) => ({
        ...v,
        isAvailable: isAvailable(v, checkIn, checkOut),
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
  if (error) return <SearchError error={error} />;

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
        <SearchHeading query={query} navigate={navigate} />
        {results.length === 0 ? (
          <SearchRecommendations
            recommendations={recommendations}
            navigate={navigate}
          />
        ) : (
          <SearchResultList results={results} navigate={navigate} />
        )}
      </div>
    </>
  );
}
