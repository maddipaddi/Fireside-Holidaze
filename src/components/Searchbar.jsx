import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useVenues } from "../components/context/VenueContext";

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

const Searchbar = () => {
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

  const filterSuggestions = (searchQuery) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const search = searchQuery.toLowerCase();

    const matchedVenues = venues.filter((venue) => {
      const name = venue.name.toLowerCase();
      const description = venue.description?.toLowerCase() || "";
      const country = venue.location?.country?.toLowerCase() || "";
      const firesideOnly =
        description.includes("fireside") &&
        description.includes("only available");

      return (
        firesideOnly && (name.includes(search) || country.includes(search))
      );
    });

    setSuggestions(matchedVenues);
    setIsOpen(true);
    setActiveIndex(-1);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      filterSuggestions(query);
    }, 200);
    return () => clearTimeout(delayDebounce);
  }, [query, venues]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => {
    if (value > 1) setter(value - 1);
  };

  const handleSearch = () => {
    const lowerQuery = query.toLowerCase();
    const selectedVenue = suggestions.find(
      (venue) => venue.name.toLowerCase() === lowerQuery,
    );

    if (selectedVenue) {
      navigate(`/venue/${selectedVenue.id}`);
    } else {
      navigate(
        `/search?query=${encodeURIComponent(query)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`,
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isOpen && activeIndex >= 0 && suggestions[activeIndex]) {
        const selected = suggestions[activeIndex];
        navigate(`/venue/${selected.id}`);
        setQuery(selected.name);
        setIsOpen(false);
      } else {
        handleSearch();
      }
    }

    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <form
      role="search"
      className="bg-copy dark:bg-primary p-8 rounded-lg shadow-lg max-w-xs md:max-w-2xl mx-auto mt-12"
      ref={wrapperRef}
    >
      <h2 className="sr-only">Search for venues</h2>
      <div className="bg-white text:copy p-4 rounded relative">
        <label
          htmlFor="location"
          className="block text-sm font-semibold font-body text-copy mb-1"
        >
          Location
        </label>
        <input
          name="location"
          id="location"
          type="text"
          placeholder="Write your destination..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy"
        />
        {isOpen && (
          <ul
            role="listbox"
            aria-live="polite"
            aria-label="Suggestions"
            className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow max-h-60 overflow-auto mt-1"
          >
            {suggestions.length > 0 ? (
              suggestions.map((venue, index) => (
                <li
                  role="option"
                  aria-selected={activeIndex === index}
                  key={venue.id}
                  className={`px-4 py-2 cursor-pointer ${
                    activeIndex === index ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    setQuery(venue.name);
                    setIsOpen(false);
                    navigate(`/venue/${venue.id}`);
                  }}
                >
                  <p className="font-semibold text-primary font-body">
                    {venue.name}
                  </p>
                  <p className="text-sm text-gray-600 font-body">
                    {venue.description}
                  </p>
                  <p className="text-xs text-gray-500 italic font-body">
                    {venue.location?.country}
                  </p>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500 italic">
                No matches found
              </li>
            )}
            {suggestions.length > 0 && (
              <li
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-primary cursor-pointer font-medium text-sm"
                onClick={() => {
                  setIsOpen(false);
                  navigate(
                    `/search?query=${encodeURIComponent(query)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`,
                  );
                }}
              >
                View all results for "{query}"
              </li>
            )}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <fieldset className="bg-white p-3 rounded w-full md:col-span-3">
          <legend className="text-sm font-semibold font-body text-copy pt-10">
            Date
          </legend>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="check-in"
                className="block text-xs font-body text-gray-500 mb-1"
              >
                Check in
              </label>
              <input
                name="check-in"
                id="check-in"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor="check-out"
                className="block text-xs font-body text-gray-500 mb-1"
              >
                Check out
              </label>
              <input
                name="check-out"
                id="check-out"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="bg-white p-3 rounded text-center w-full md:col-span-1">
          <legend className="block text-sm font-semibold font-body text-copy pt-10">
            Guests
          </legend>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => decrement(setGuests, guests)}
              disabled={guests <= 1}
              className={`px-2 py-1 rounded ${
                guests <= 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200"
              }`}
            >
              -
            </button>
            <span>{guests}</span>
            <button
              type="button"
              onClick={() => increment(setGuests, guests)}
              disabled={guests >= 12}
              className={`px-2 py-1 rounded ${
                guests >= 12
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200"
              }`}
            >
              +
            </button>
          </div>
        </fieldset>
      </div>

      <div className="bg-primary dark:bg-background p-4 text-center -mx-8 -mb-8 rounded-b-lg">
        <button
          onClick={handleSearch}
          className="bg-background dark:bg-primary text-copy dark:text-background font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Searchbar;
