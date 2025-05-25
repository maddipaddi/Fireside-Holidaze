import { Map, MapPinned } from "lucide-react";

/**
 * Displays venue details or appropriate loading/error messages.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.loading - Indicates if the venue data is loading.
 * @param {Object|null} props.venue - The venue data object, or null if not found.
 * @returns {JSX.Element|null} Rendered component based on loading and venue state.
 */

function VenueDetails({ loading, venue }) {
  if (loading) {
    return (
      <div className="text-center mt-10">
        <MapPinned className="mx-auto mb-2 h-6 w-6 animate-bounce text-primary dark:text-background" />
        <p className="text-copy font-body dark:text-background">
          Finding your next escape...
        </p>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="text-center mt-10">
        <Map className="mx-auto mb-2 h-6 w-6 text-red-600" />
        <p className="text-red-600 font-body">
          Oops... we couldn't find that venue.
        </p>
        <p className="text-sm text-red-400 italic">
          It might have been removed or never existed.
        </p>
      </div>
    );
  }

  return null;
}

export default VenueDetails;
