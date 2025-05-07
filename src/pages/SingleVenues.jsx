import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SINGLE_VENUE } from "../utils/constants.mjs";
import VenueCard from "../components/VenueCard";
import { Star } from "lucide-react";

function SingleVenue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVenue() {
      try {
        const response = await fetch(`${SINGLE_VENUE}/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch venue");
        }
        const json = await response.json();
        setVenue(json.data);
      } catch (error) {
        console.error("Error fetching venue:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenue();
  }, [id]);

  if (loading) return <p>Loading Venue...</p>;
  if (!venue) return <p>Venue not found</p>;

  return (
    <VenueCard
      venue={venue}
      renderFooter={(venue) => (
        <div>
          <div className="flex justify-between gap-10">
            <h2 className="text-base font-semibold">{venue.name}</h2>
            <div className="flex gap-1 h-8 self-start">
              <Star />
              <p>{venue.rating}</p>
            </div>
          </div>
          <p className="font-thin">${venue.price} one night</p>
        </div>
      )}
    />
  );
}

export default SingleVenue;
