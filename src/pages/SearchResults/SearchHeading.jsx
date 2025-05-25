/**
 * Renders the heading and navigation for search results.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.query - The search query to display in the heading.
 * @param {function} props.navigate - Function to navigate to a different route.
 * @returns {JSX.Element} The rendered search heading and navigation button.
 */

export default function SearchHeading({ query, navigate }) {
  return (
    <>
      <h2 className="text-2xl font-bold m-6 text-center text-copy dark:text-white font-heading">
        Search results for “{query}”
      </h2>
      <div className="mb-6 text-center">
        <button
          onClick={() => navigate("/")}
          className="text-primary dark:text-accent underline font-body font-medium hover:text-copy dark:hover:text-white transition cursor-pointer"
        >
          ← Back to homepage
        </button>
      </div>
    </>
  );
}
