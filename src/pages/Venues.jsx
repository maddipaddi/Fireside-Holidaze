import { useNavigate } from "react-router-dom";
import VenueGrid from "../components/VenueGrid";
import { Star } from "lucide-react";
import Searchbar from "../components/Searchbar";
import { useVenues } from "../components/VenueContext";

function Venues() {
  const { venues, loading, error } = useVenues(); // ⬅️ Bruk context
  const navigate = useNavigate();

  const appSpecificPhrase = "only available through fireside holidaze";
  const filteredVenues = (venues || []).filter((venue) =>
    venue.description?.toLowerCase().includes(appSpecificPhrase),
  );

  if (loading) return <p className="text-center mt-10">Loading venues...</p>;
  if (error)
    return (
      <p className="text-center text-red-600 mt-10">
        Error loading venues: {error.message}
      </p>
    );

  return (
    <div>
      <Searchbar />
      <section className="mt-32">
        <h1 className="text-3xl font-bold font-heading mb-4 text-center text-copy dark:text-background">
          Venues
        </h1>
        <VenueGrid
          venues={filteredVenues}
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
