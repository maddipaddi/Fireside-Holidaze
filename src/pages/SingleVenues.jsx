import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SINGLE_VENUE } from "../utils/constants.mjs";
import VenueCard from "../components/VenueCard";
import {
  Star,
  Wifi,
  Car,
  CookingPot,
  Dog,
  Flag,
  Building,
  MapPin,
  Earth,
  MapPinned,
  MapOff,
} from "lucide-react";
import CostomCalendar from "../components/Calender";
import BookingVenue from "../components/BookingCard";

function VenueDetails({ loading, venue }) {
  if (loading) {
    return (
      <div className="text-center mt-10">
        <MapPinned className="mx-auto mb-2 h-6 w-6 animate-bounce text-primary" />
        <p className="text-copy font-body">Finding your next escape...</p>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="text-center mt-10">
        <MapOff className="mx-auto mb-2 h-6 w-6 text-red-600" />
        <p className="text-red-600 font-body">
          Oops... we couldn' find that venue.
        </p>
        <p className="text-sm text-red-400 italic">
          It might have been removed or never existed.
        </p>
      </div>
    );
  }

  return null;
}

function SingleVenue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (venue?.media?.length) {
      setSelectedImage(venue.media[0]);
    }
  }, [venue]);

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
        console.error("Error fetching venue:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenue();
  }, [id]);

  if (loading || !venue) {
    return <VenueDetails loading={loading} venue={venue} />;
  }

  const facilityMap = {
    wifi: { label: "Wi-Fi", icon: <Wifi /> },
    parking: { label: "Parking", icon: <Car /> },
    breakfast: { label: "Breakfast included", icon: <CookingPot /> },
    pets: { label: "Pets allowed", icon: <Dog /> },
  };

  return (
    <>
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
      <div className="bg-copy text-white dark:bg-primary max-w-md md:max-w-2xl lg:max-w-4xl mx-auto -mt-16 pt-16 pb-70">
        <div className="flex flex-col items-center gap-4 px-4 py-6">
          {selectedImage && (
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="max-h-64 w-auto rounded shadow-lg object-cover"
            />
          )}
          <div className="flex gap-2 flex-wrap justify-center mb-6">
            {venue.media.map((mediaItem, index) => (
              <img
                key={index}
                src={mediaItem.url}
                alt={mediaItem.alt}
                className={`h-16 w-16 object-cover rounded cursor-pointer border-2 transition ${
                  selectedImage?.url === mediaItem.url
                    ? "border-accent"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImage(mediaItem)}
              />
            ))}
          </div>
        </div>

        <section className="max-w-xl mx-auto">
          <h3 className="text-center font-heading">About the cabin</h3>
          <p className="pt-4 pb-8 px-10">{venue.description}</p>
          <p className="pt-4 pb-8 px-10 font-semibold">
            Maximum guests: {venue.maxGuests}
          </p>
        </section>

        <section>
          <h3 className="text-center font-heading">Facilities</h3>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-center pt-4 pb-8 px-6">
            {Object.entries(venue.meta)
              .filter(([_, value]) => value)
              .map(([key]) => (
                <div
                  key={key}
                  className="flex items-center gap-2 justify-center bg-background text-copy p-2 rounded"
                >
                  {facilityMap[key]?.icon}
                  <span>{facilityMap[key]?.label}</span>
                </div>
              ))}
          </div>
        </section>

        <section className="bg-background dark:bg-background text-copy rounded-lg shadow-md p-6 max-w-md mx-auto my-8">
          <h3 className="text-xl font-heading mb-4 text-center">Location</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <MapPin />
              <span>{venue.location.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Building />
              <span>
                {venue.location.zip}, {venue.location.city}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Flag />
              <span>{venue.location.country}</span>
            </li>
            <li className="flex items-center gap-2">
              <Earth />
              <span>{venue.location.continent}</span>
            </li>
          </ul>
        </section>

        <div className="h-28">
          <CostomCalendar />
        </div>

        <div className="pt-80">
          <BookingVenue venue={venue} />
        </div>
      </div>
    </>
  );
}

export default SingleVenue;
