import React, { useEffect, useState } from "react";
import VenueCards from "../components/VenueCards";
import { fetchAllVenues } from "../utils/fetchAllVenues.mjs";
import { handleError } from "../utils/errorHandler.mjs";

function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <h1>Venues</h1>
      <VenueCards venues={venues} />
    </div>
  );
}

export default Venues;
