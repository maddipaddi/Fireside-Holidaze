import { useParams } from "react-router-dom";
import { useVenues } from "../components/context/VenueContext";
import VenueGrid from "../components/VenueGrid";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const { type } = useParams();
  const { venues, loading } = useVenues();
  const navigate = useNavigate();

  const filteredVenues = venues.filter((venue) => {
    const content = `${venue.name}${venue.description}`.toLowerCase();
    return (
      content.includes(type.toLowerCase()) &&
      content.includes("only available through fireside holidaze")
    );
  });

  return (
    <section className="mt-8">
      <h1 className="text-3xl font-bold font-heading mb-4 text-center text-copy dark:text-background">
        {type.charAt(0).toUpperCase() + type.slice(1)} escapes
      </h1>
      {loading ? (
        <p>Loading venues...</p>
      ) : filteredVenues.length === 0 ? (
        <p>No venues found for this category.</p>
      ) : (
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
                  className="bg-copy text-white dark:bg-primary dark:text-background font-body font-bold px-2 py-1 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer"
                  onClick={() => navigate(`/venue/${venue.id}`)}
                >
                  Read more
                </button>
              </div>
            </>
          )}
        />
      )}
    </section>
  );
}
