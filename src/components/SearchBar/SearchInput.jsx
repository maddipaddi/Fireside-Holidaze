/**
 * SearchInput component renders a search input field with autocomplete suggestions.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.query - The current search query value.
 * @param {function} props.setQuery - Function to update the search query.
 * @param {Array<Object>} props.suggestions - List of suggestion objects to display.
 * @param {boolean} props.isOpen - Whether the suggestions dropdown is open.
 * @param {function} props.setIsOpen - Function to set the dropdown open state.
 * @param {number} props.activeIndex - Index of the currently highlighted suggestion.
 * @param {function} props.setActiveIndex - Function to set the active suggestion index.
 * @param {function} props.handleKeyDown - Handler for keyboard navigation in the input.
 * @param {function} props.handleSuggestionClick - Handler for clicking a suggestion.
 * @param {function} props.navigate - Function to navigate to a search results page.
 * @param {string} props.checkIn - Selected check-in date for search.
 * @param {string} props.checkOut - Selected check-out date for search.
 * @param {number} props.guests - Number of guests for search.
 * @returns {JSX.Element} The rendered SearchInput component.
 */

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
