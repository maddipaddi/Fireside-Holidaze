/**
 * SearchButton component renders a styled button for triggering search actions.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} props.onClick - Callback function to handle button click events.
 * @returns {JSX.Element} The rendered SearchButton component.
 */

const SearchButton = ({ onClick }) => (
  <div className="bg-primary dark:bg-background p-4 text-center -mx-8 -mb-8 rounded-b-lg">
    <button
      onClick={onClick}
      className="bg-background dark:bg-primary text-copy dark:text-background font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer"
    >
      Search
    </button>
  </div>
);

export default SearchButton;
