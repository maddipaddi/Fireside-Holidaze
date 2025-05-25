import { useContext, useEffect, useState } from "react";
import VenueGrid from "../VenueGrid";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/api.mjs";
import { PROFILE } from "../../utils/constants.mjs";
import { UserContext } from "../context/UserContext";
import DeleteVenueButton from "../DeleteVenues";
import { Globe } from "lucide-react";
import { handleError } from "../../utils/errorHandler.mjs";

/**
 * ProfileVenues component displays a list of venues associated with the current user profile.
 *
 * - Fetches the user's venues from the API on mount.
 * - Shows a loading spinner while fetching data.
 * - Renders a grid of venues with options to edit or delete each venue.
 *
 * @component
 * @returns {JSX.Element} The rendered ProfileVenues component.
 */

export default function ProfileVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const profileName = user?.name;

  useEffect(() => {
    apiRequest(`${PROFILE}/${profileName}/venues`)
      .then((data) => {
        setVenues(data.data);
        setLoading(false);
      })
      .catch((error) => {
        handleError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <Globe className="mx-auto mb-2 h-6 w-6 animate-spin text-primary dark:text-background" />
        <p className="text-copy font-body dark:text-background">
          Gathering dreamy destinations for you...
        </p>
      </div>
    );
  }

  return (
    <>
      <section>
        <h2 className="text-3xl font-bold font-heading mb-4 text-center text-copy dark:text-background">
          My venues
        </h2>
        <VenueGrid
          venues={venues}
          renderFooter={(venue) => (
            <div className="text-center">
              <h3 className="text-base font-semibold mb-2">{venue.name}</h3>
              <div className="flex justify-center gap-8">
                <button
                  onClick={() => navigate(`/venue/edit/${venue.id}`)}
                  className="bg-copy text-white dark:bg-primary dark:text-background font-body font-bold px-6 py-1 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer"
                >
                  Edit
                </button>
                <DeleteVenueButton
                  venueId={venue.id}
                  onDeleted={(deletedId) =>
                    setVenues((prev) => prev.filter((v) => v.id !== deletedId))
                  }
                />
              </div>
              <button
                className="bg-copy text-white font-body font-bold px-6 py-1 mt-4 rounded shadow hover:bg-accent/50 hover:text-white transition cursor-pointer"
                onClick={() => navigate(`/venue/${venue.id}`)}
              >
                View venue
              </button>
            </div>
          )}
        />
      </section>
    </>
  );
}
