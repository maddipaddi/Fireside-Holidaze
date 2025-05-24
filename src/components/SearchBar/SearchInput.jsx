const SearchInput = ({
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
}) => (
  <div className="bg-offwhite text:copy p-4 rounded relative">
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
      <ul className="absolute z-10 w-full bg-white border rounded shadow max-h-60 overflow-auto mt-1">
        {suggestions.length > 0 ? (
          <>
            {suggestions.map((venue, index) => (
              <li
                key={venue.id}
                className={`px-4 py-2 cursor-pointer ${activeIndex === index ? "bg-gray-200" : "hover:bg-gray-100"}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleSuggestionClick(venue)}
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
            ))}
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
          </>
        ) : (
          <li className="px-4 py-2 text-gray-500 italic">No matches found</li>
        )}
      </ul>
    )}
  </div>
);

export default SearchInput;
