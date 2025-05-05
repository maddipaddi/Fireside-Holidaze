import React, { useEffect, useState } from "react";
import VenueCards from "../components/VenueCards";
import { ALL_USERS } from "../utils/constants.mjs";

function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${ALL_USERS}`)
      .then((response) => response.json())
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
    <div>
      <h1>Venues</h1>
      <VenueCards venues={venues} />
    </div>
  );
}

export default Venues;
