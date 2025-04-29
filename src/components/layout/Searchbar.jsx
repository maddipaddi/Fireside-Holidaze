import React, { useState, useEffect, useRef } from "react";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);

  const fetchSuggestions = async (searchQuery) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://api.example.com/search?query=${encodeURIComponent(searchQuery)}`,
      );
      const data = await res.json();

      const matchedVenues = [];
      data.data.forEach((user) => {
        user.venues.forEach((venue) => {
          if (
            venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            venue.description.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            matchedVenues.push(venue);
          }
        });
      });

      setSuggestions(matchedVenues);
      setIsOpen(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

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
    console.log({
      location: query,
      checkIn,
      checkOut,
      guests,
      rooms,
    });
    // redirect etc
  };

  return (
    <div
      className="bg-copy dark:bg-primary p-6 rounded-t-lg rounded-b-lg shadow-lg max-w-2xl mx-auto mt-12"
      ref={wrapperRef}
    >
      {/* Location */}
      <div className="bg-white text:copy p-4 rounded mb-4 relative">
        <label className="block text-sm font-semibold font-body text-copy mb-1">
          Location
        </label>
        <input
          type="text"
          placeholder="Write your destination..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy"
        />
        {isOpen && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow max-h-60 overflow-auto mt-1">
            {suggestions.map((venue, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setQuery(venue.name);
                  setIsOpen(false);
                }}
              >
                <p className="font-semibold text-gray-800 font-body">
                  {venue.name}
                </p>
                <p className="text-sm text-gray-600 font-body">
                  {venue.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Check-in / Check-out / Guests / Rooms */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Date */}
        <div className="bg-white p-3 rounded w-full md:col-span-2">
          <label className="block text-sm font-semibold font-body text-copy mb-2">
            Date
          </label>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-1/2">
              <label className="block text-xs font-body text-gray-500 mb-1">
                Check in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-xs font-body text-gray-500 mb-1">
                Check out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Guests */}
        <div className="bg-white p-3 rounded text-center w-full md:col-span-1">
          <label className="block text-sm font-semibold font-body text-copy mb-2">
            Travelers
          </label>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => decrement(setGuests, guests)}
              disabled={guests <= 1}
              className={`px-2 py-1 rounded ${guests <= 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200"}`}
            >
              -
            </button>
            <span>{guests}</span>
            <button
              onClick={() => increment(setGuests, guests, 12)}
              disabled={guests >= 12}
              className={`px-2 py-1 rounded ${guests >= 12 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200"}`}
            >
              +
            </button>
          </div>
        </div>

        {/* Rooms */}
        <div className="bg-white p-3 rounded text-center w-full md:col-span-1">
          <label className="block text-sm font-semibold font-body text-copy mb-2">
            Rooms
          </label>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => decrement(setRooms, rooms)}
              disabled={rooms <= 1}
              className={`px-2 py-1 rounded ${rooms <= 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200"}`}
            >
              -
            </button>
            <span>{rooms}</span>
            <button
              onClick={() => increment(setRooms, rooms, 6)}
              disabled={rooms >= 6}
              className={`px-2 py-1 rounded ${rooms >= 6 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200"}`}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Search button */}
      <div className="bg-primary dark:bg-background p-4 text-center -mx-6 -mb-6 rounded-b-lg">
        <button
          onClick={handleSearch}
          className="bg-background dark:bg-primary text-copy dark:text-background font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
