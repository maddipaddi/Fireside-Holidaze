import { useNavigate } from "react-router-dom";
import VenueGrid from "../components/VenueGrid";
import { Star } from "lucide-react";
import Searchbar from "../components/SearchBar";
import { useVenues } from "../components/context/VenueContext";
import { Compass, PlugZap } from "lucide-react";
import { Helmet } from "react-helmet-async";

/**
 * Venues page component.
 *
 * Fetches and displays a filtered list of venues whose descriptions include a specific app phrase.
 * Handles loading and error states, and renders a search bar and a grid of venues.
 * Each venue card displays its name, rating, price, and a button to navigate to the venue's detail page.
 *
 * @component
 * @returns {JSX.Element} The rendered Venues page.
 */

function Venues() {
  const { venues, loading, error } = useVenues();
  const navigate = useNavigate();

  const appSpecificPhrase = "only available through fireside holidaze";
  const filteredVenues = (venues || []).filter((venue) =>
    venue.description?.toLowerCase().includes(appSpecificPhrase),
  );

  if (loading) return;
  <>
    <Compass className="mx-auto mb-2 h-6 w-6 animate-spin text-primary" />
    <p className="text-center mt-4 text-copy">
      Scouting dreamy escapes for you...
    </p>
  </>;
  if (error)
    return (
      <>
        <PlugZap className="mx-auto mb-2 h-6 w-6 text-red-600" />
        <p className="text-center text-red-600 font-body mt-2">
          Couldn't connect to our cabins. Try refreshing the page!
        </p>
        <p className="text-center text-sm text-red-500 italic">
          {error.message}
        </p>
      </>
    );

  return (
    <>
      <Helmet>
        <title>All venues | Holidaze</title>
        <meta
          name="description"
          content="See all venues at Fireside Holidaze"
        />
        <meta property="og:title" content="Fireside Holidaze - All venues" />
        <meta
          property="og:description"
          content="See all venues at Fireside Holidaze"
        />
        <meta
          property="og:image"
          content="https://fireside-holidaze.netlify.app/assets/zachary-kyra-derksen-unsplash.jpg"
        />
        <meta
          property="og:url"
          content="https://fireside-holidaze.netlify.app/"
        />
        <meta property="og:type" content="website" />
      </Helmet>
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
                  className="bg-copy text-white font-body font-bold px-2 py-1 rounded shadow hover:bg-accent/50 hover:text-white transition cursor-pointer border border-background"
                  onClick={() => navigate(`/venue/${venue.id}`)}
                >
                  Read more
                </button>
              </div>
            </>
          )}
        />
      </section>
    </>
  );
}

export default Venues;
