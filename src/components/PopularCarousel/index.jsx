import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useVenues } from "../context/VenueContext";
import CarouselSlide from "./CarouselSlide";
import CarouselSkeleton from "./CarouselSkeleton";
import CarouselEmptyState from "./CarouselEmptyState";
import CarouselHeader from "./CarouselHeader";

/**
 * PopularCarousel component displays a carousel of curated venues.
 *
 * Functionality:
 * - Fetches venue data using `useVenues()` from the VenueContext.
 * - Filters venues by a specific phrase in the description.
 * - Sorts matching venues by creation date (newest first).
 * - If fewer than 5 venues are found, duplicates them to ensure proper Swiper functionality.
 * - Renders a loading skeleton while data is being fetched.
 * - Shows a fallback state if no venues match or an error occurs.
 * - Displays venues in a responsive Swiper carousel with custom navigation buttons.
 * - Each venue slide is rendered with an image, name, rating, and price.
 * - Clicking a venue navigates to its detail page.
 *
 * Dependencies:
 * - Swiper.js for the carousel behavior.
 * - React Router `useNavigate` for navigation.
 * - Tailwind CSS for styling.
 *
 * @component
 * @returns {JSX.Element} A Swiper carousel showcasing filtered popular venues.
 */

export default function PopularCarousel() {
  const { venues, loading, error } = useVenues();
  const navigate = useNavigate();

  const phrase = "only available through fireside holidaze";
  const filtered = (venues || [])
    .filter((v) => v.description?.toLowerCase().includes(phrase))
    .sort((a, b) => new Date(b.created) - new Date(a.created));

  const slides = filtered.length < 5 ? [...filtered, ...filtered] : filtered;

  if (loading) return <CarouselSkeleton />;
  if (error || filtered.length === 0) return <CarouselEmptyState />;

  return (
    <div className="w-full max-w-screen-xl mx-auto text-center py-12 px-4 relative">
      <CarouselHeader title="Popular destinations" />

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
          <SwiperSlide key={`${venue.id}-${index}`}>
            <CarouselSlide
              venue={venue}
              onClick={() => navigate(`/venue/${venue.id}`)}
            />
          </SwiperSlide>
        ))}

        <button
          aria-label="Previous slide"
          className="custom-prev absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-white text-black shadow p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          aria-label="Next slide"
          className="custom-next absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-white text-black shadow p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
        >
          <FaChevronRight size={20} />
        </button>
      </Swiper>
    </div>
  );
}
