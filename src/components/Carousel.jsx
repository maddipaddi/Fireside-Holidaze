import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useVenues } from "./context/VenueContext";
import { MapPinned, Globe } from "lucide-react";

/**
 * PopularCarousel component displays a carousel of popular venues filtered by a specific phrase in their description.
 *
 * - Fetches venues using the `useVenues` hook.
 * - Filters venues whose description includes "only available through fireside holidaze".
 * - Sorts filtered venues by creation date (newest first).
 * - Duplicates slides if fewer than 5 venues are available to ensure a full carousel.
 * - Shows a loading spinner and message while data is loading.
 * - Displays an error or empty state if no venues are found or an error occurs.
 * - Uses Swiper for carousel functionality with custom navigation buttons.
 * - Each slide displays venue image, name, rating, and price.
 * - Clicking a slide navigates to the venue's detail page.
 *
 * @component
 * @returns {JSX.Element} The rendered carousel of popular venues.
 */

export default function PopularCarousel() {
  const { venues, loading, error } = useVenues();
  const navigate = useNavigate();

  const phrase = "only available through fireside holidaze";
  const filtered = (venues || [])
    .filter((venue) => venue.description?.toLowerCase().includes(phrase))
    .sort((a, b) => new Date(b.created) - new Date(a.created));

  const slides = filtered.length < 5 ? [...filtered, ...filtered] : filtered;

  if (loading) {
    return (
      <div className="w-full text-center py-12 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <MapPinned className="mx-auto mb-2 h-6 w-6 animate-bounce text-primary" />
        <p className="text-lg text-copy font-body text-center dark:text-background">
          Loading popular destinations... 🌍
        </p>
      </div>
    );
  }

  if (error || filtered.length === 0) {
    return (
      <div className="w-full text-black text-center py-12">
        <Globe className="mx-auto mb-2 h-6 w-6 text-primary" />
        <p className="text-lg text-copy font-body text-center dark:text-background">
          No hotspots right now — but adventure is always just around the
          corner!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto text-black text-center py-12 px-4 relative">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-copy font-heading dark:text-background">
        Popular destinations
      </h2>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        loop={true}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="relative"
      >
        {slides.map((venue, index) => (
          <SwiperSlide key={`${venue.id}-${index}`} className="h-auto">
            <div
              onClick={() => navigate(`/venue/${venue.id}`)}
              className="bg-white rounded-xl shadow-md overflow-hidden h-full min-h-[320px] flex flex-col cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={
                  `${venue.media?.[0]?.url}?auto=format&fit=crop&w=600&q=80` ||
                  "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt={venue.media?.[0]?.alt || "Venue image"}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-3 text-left flex-grow flex flex-col justify-between bg-primary text-white font-body border-copy">
                <div>
                  <h3 className="font-semibold text-base">{venue.name}</h3>
                  <div className="flex items-center gap-1 text-sm mt-1">
                    <span>⭐</span>
                    <span>{venue.rating || "4.0"}</span>
                  </div>
                </div>
                <p className="text-sm mt-1">${venue.price} one night</p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <button
          aria-label="Previous slide"
          className="custom-prev absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-white text-black shadow p-2 rounded-full hover:bg-gray-200 transition"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          aria-label="Next slide"
          className="custom-next absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-white text-black shadow p-2 rounded-full hover:bg-gray-200 transition"
        >
          <FaChevronRight size={20} />
        </button>
      </Swiper>
    </div>
  );
}
