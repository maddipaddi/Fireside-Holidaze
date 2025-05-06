import React, { useEffect, useState } from "react";
import VenueCards from "../components/VenueCards";
import Searchbar from "../components/Searchbar";
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
      <Searchbar />
      <section className="mt-32">
        <h1 className="text-3xl font-bold font-heading mb-4 text-center text-copy dark:text-background mb-20">
          Venues
        </h1>
        <VenueCards venues={venues} />
      </section>
    </div>
  );
}

export default Venues;
