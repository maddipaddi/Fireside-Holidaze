import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SINGLE_VENUE } from "../Constants.mjs";

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
    <section>
      <div className="pt-30 text-white">
        <div>
          {venue.media?.length > 0 && venue.media[0].url && (
            <img
              src={venue.media[0].url}
              alt={venue.media[0].alt || "Venue image"}
              style={{ width: "100%", maxWidth: "600px", borderRadius: "8px" }}
            />
          )}
        </div>
        <div>
          <h2>{venue.name}</h2>
          <p>${venue.price}</p>
        </div>
        <div>
          <p>{venue.description}</p>
        </div>
      </div>
    </section>
  );
}

export default SingleVenue;
