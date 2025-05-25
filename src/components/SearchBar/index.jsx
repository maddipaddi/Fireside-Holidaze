import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useVenues } from "../context/VenueContext";
import SearchInput from "./SearchInput";
import DatePickers from "./DatePickers";
import GuestSelector from "./GuestSelector";
import SearchButton from "./SearchButton";

/**
 * Searchbar component for searching venues with autocomplete suggestions.
 *
 * Features:
 * - Autocomplete suggestions filtered by venue name and country, limited to venues with "fireside only available" in their description.
 * - Keyboard navigation (arrow keys, enter, escape) for suggestions.
 * - Date pickers for check-in and check-out.
 * - Guest count selector (1-12).
 * - Navigates to venue details or search results based on user input.
 *
 * @component
 * @returns {JSX.Element} The rendered search bar UI.
 */

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const { venues } = useVenues();
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      const search = query.toLowerCase();
      const matched = venues.filter(
        ({ name, description = "", location = {} }) =>
          description.toLowerCase().includes("fireside") &&
          description.toLowerCase().includes("only available") &&
          (name.toLowerCase().includes(search) ||
            location.country?.toLowerCase().includes(search)),
      );
      setSuggestions(matched);
      setIsOpen(true);
      setActiveIndex(-1);
    }, 200);
    return () => clearTimeout(delayDebounce);
  }, [query, venues]);

  useEffect(() => {
    const clickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  const increment = () => setGuests((g) => Math.min(12, g + 1));
  const decrement = () => setGuests((g) => Math.max(1, g - 1));

  const handleSearch = () => {
    const matched = suggestions.find(
      (v) => v.name.toLowerCase() === query.toLowerCase(),
    );
    if (matched) {
      navigate(`/venue/${matched.id}`);
    } else {
      navigate(
        `/search?query=${encodeURIComponent(query)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`,
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isOpen && activeIndex >= 0) {
        const selected = suggestions[activeIndex];
        setQuery(selected.name);
        setIsOpen(false);
        navigate(`/venue/${selected.id}`);
      } else {
        handleSearch();
      }
    } else if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length,
      );
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (venue) => {
    setQuery(venue.name);
    setIsOpen(false);
    navigate(`/venue/${venue.id}`);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-copy dark:bg-primary p-8 rounded-lg shadow-lg max-w-xs md:max-w-2xl mx-auto mt-12"
      ref={wrapperRef}
    >
      <SearchInput
        {...{
          query,
          setQuery,
          suggestions,
          isOpen,
          setIsOpen,
          activeIndex,
          setActiveIndex,
          handleKeyDown,
          handleSuggestionClick,
          navigate,
          checkIn,
          checkOut,
          guests,
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <DatePickers {...{ checkIn, setCheckIn, checkOut, setCheckOut }} />
        <GuestSelector {...{ guests, increment, decrement }} />
      </div>
      <SearchButton onClick={handleSearch} />
    </form>
  );
}
