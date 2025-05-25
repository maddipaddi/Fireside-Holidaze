import VenueCard from "../../components/VenueCard";
import { SearchX } from "lucide-react";

/**
 * Displays a message when no search results are found and shows recommended venues.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.recommendations - List of recommended venue objects to display.
 * @param {function} props.navigate - Function to navigate to a specific venue's page.
 * @returns {JSX.Element} The rendered SearchRecommendations component.
 */

export default function SearchRecommendations({ recommendations, navigate }) {
  return (
    <>
      <div className="text-center mt-12 text-copy dark:text-white font-body">
        <SearchX className="mx-auto mb-4 h-6 w-6 text-primary dark:text-background" />
        <p className="text-lg font-semibold mb-2 dark:text-background">
          Nothing found — yet.
        </p>
        <p className="text-copy dark:text-background mb-6">
          Don't worry, the right place is out there. Try adjusting your search
          or browse our suggestions below.
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
                    className="text-sm underline mt-2 hover:text-accent cursor-pointer"
                  >
                    Read more
                  </button>
                </>
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
}
