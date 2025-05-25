import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SINGLE_VENUE } from "../../utils/constants.mjs";
import { handleError } from "../../utils/errorHandler.mjs";
import VenueCard from "../../components/VenueCard";
import { Star } from "lucide-react";
import VenueDetails from "./VenueDetails";
import VenueGallery from "./VenueGallery";
import VenueInfo from "./VenueInfo";
import VenueFacilities from "./VenueFacilities";
import VenueLocation from "./VenueLocation";
import VenueBooking from "./VenueBooking";

/**
 * Displays detailed information about a single venue, including images, description, facilities, location,
 * and booking options. Fetches venue data based on the `id` route parameter and manages image selection,
 * date selection, and booking state.
 *
 * @component
 * @returns {JSX.Element} The rendered SingleVenue page.
 *
 * @example
 * // Used in a route like /venues/:id
 * <SingleVenue />
 *
 * @dependencies
 * - React (useState, useEffect)
 * - useParams from react-router-dom
 * - VenueCard, VenueDetails, BookingVenue, CustomCalendar components
 * - Icon components: Wifi, Car, CookingPot, Dog, Star, MapPin, Building, Flag, Earth
 *
 * @remarks
 * - Expects a global constant SINGLE_VENUE for the API endpoint.
 * - Handles loading and error states.
 * - Renders a gallery, venue details, facilities, location, calendar, and booking form.
 */

function SingleVenue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    async function fetchVenue() {
      try {
        const response = await fetch(`${SINGLE_VENUE}/${id}?_bookings=true`);
        if (!response.ok) {
          throw new Error("Failed to fetch venue");
        }
        const json = await response.json();
        setVenue(json.data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchVenue();
  }, [id]);

  useEffect(() => {
    if (venue?.media?.length) {
      setSelectedImage(venue.media[0]);
    }
  }, [venue]);

  if (loading || !venue) {
    return <VenueDetails loading={loading} venue={venue} />;
  }

  return (
    <>
      <Helmet>
        <title>{venue.name} | Holidaze</title>
        <meta name="description" content={venue.description.slice(0, 150)} />
        <meta
          property="og:title"
          content={`Fireside Holidaze - ${venue.name}`}
        />
        <meta
          property="og:description"
          content={`Fireside Holidaze - ${venue.description.slice(0, 150)}`}
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

      <VenueCard
        venue={venue}
        renderFooter={() => (
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

      <div className="bg-copy text-white dark:bg-primary max-w-md md:max-w-2xl lg:max-w-4xl mx-auto -mt-16 pt-16 pb-20">
        <VenueGallery
          selectedImage={selectedImage}
          venue={venue}
          setSelectedImage={setSelectedImage}
        />
        <VenueInfo venue={venue} />
        <VenueFacilities meta={venue.meta} />
        <VenueLocation location={venue.location} />
        <VenueBooking
          venue={venue}
          venueId={id}
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
        />
      </div>
    </>
  );
}

export default SingleVenue;
