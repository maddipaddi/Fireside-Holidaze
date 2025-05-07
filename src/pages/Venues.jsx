import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VenueGrid from "../components/VenueGrid";
import { Star } from "lucide-react";
import Searchbar from "../components/Searchbar";
import { fetchAllVenues } from "../utils/fetchAllVenues.mjs";
import { handleError } from "../utils/errorHandler.mjs";

function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllVenues()
      .then((allVenues) => {
        const appSpecificPhrase = "only available through fireside holidaze";
        const appSpecificVenues = allVenues.filter((venue) => {
          const description = venue.description?.toLowerCase() || "";
          return description.includes(appSpecificPhrase);
        });

        setVenues(appSpecificVenues);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching venues:", error); // remove after development
        handleError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading venues...</p>;

  return (
    <div>
      <Searchbar />
      <section className="mt-32">
        <h1 className="text-3xl font-bold font-heading mb-4 text-center text-copy dark:text-background">
          Venues
        </h1>
        <VenueGrid
          venues={venues}
          renderFooter={(venue) => (
            <>
              <div className="flex justify-between">
                <h2 className="text-base font-semibold">{venue.name}</h2>
                <div className="flex gap-1 h-8 self-start">
                  <Star />
                  <p>{venue.rating}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <p className="font-thin">${venue.price} one night</p>
                <button
                  className="bg-copy text-white dark:bg-primary text-copy dark:text-background font-body font-bold px-2 py-1 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer"
                  onClick={() => navigate(`/venue/${venue.id}`)}
                >
                  Read more
                </button>
              </div>
            </>
          )}
        />
      </section>
    </div>
  );
}

export default Venues;
