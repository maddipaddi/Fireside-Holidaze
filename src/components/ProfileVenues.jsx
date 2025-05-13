import { useContext, useEffect, useState } from "react";
import VenueGrid from "./VenueGrid";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api.mjs";
import { PROFILE } from "../utils/constants.mjs";
import { UserContext } from "./UserContext";
import DeleteVenueButton from "./DeleteVenues";

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
        console.error("Error fetching venues:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading venues...</p>;

  return (
    <section>
      <h1 className="text-3xl font-bold font-heading mb-10 text-center text-copy dark:text-background">
        My venues
      </h1>
      <VenueGrid
        venues={venues}
        renderFooter={(venue) => (
          <div className="text-center">
            <h2 className="text-base font-semibold mb-2">{venue.name}</h2>
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
          </div>
        )}
      />
    </section>
  );
}
