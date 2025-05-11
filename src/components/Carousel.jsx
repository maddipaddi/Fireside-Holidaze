import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useVenues } from "./VenueContext";

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
        <p className="text-lg text-copy font-body dark:text-background">
          Loading popular destinations...
        </p>
      </div>
    );
  }

  if (error || filtered.length === 0) {
    return (
      <div className="w-full text-black text-center py-12">
        <p className="text-lg">No popular destinations available right now.</p>
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
                  venue.media?.[0]?.url ||
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

        {/* Piler */}
        <button className="custom-prev absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-white text-black shadow p-2 rounded-full hover:bg-gray-200 transition">
          <FaChevronLeft size={20} />
        </button>
        <button className="custom-next absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-white text-black shadow p-2 rounded-full hover:bg-gray-200 transition">
          <FaChevronRight size={20} />
        </button>
      </Swiper>
    </div>
  );
}
