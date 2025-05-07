import React, { useEffect, useState } from "react";
import VenueCards from "./VenueCards";
import { apiRequest } from "../utils/api.mjs";
import { PROFILE_VENUES } from "../utils/constants.mjs";

export default function ProfileVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const profileName = user.name;

  useEffect(() => {
    apiRequest(`${PROFILE_VENUES}/${profileName}/venues`)
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
      <VenueCards venues={venues} isOwnerView={true} />
    </section>
  );
}
