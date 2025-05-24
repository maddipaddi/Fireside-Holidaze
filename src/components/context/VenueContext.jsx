import { createContext, useContext, useEffect, useState } from "react";
import { fetchAllVenues } from "../../utils/fetchAllVenues.mjs";

const VenueContext = createContext();

const VenueProvider = ({ children }) => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllVenues()
      .then(setVenues)
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <VenueContext.Provider value={{ venues, loading, error }}>
      {children}
    </VenueContext.Provider>
  );
};

const useVenues = () => useContext(VenueContext);

export { VenueProvider, useVenues };
