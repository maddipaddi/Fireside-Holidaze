/**
 * Displays an error message when there is an issue loading venues.
 *
 * @component
 * @param {{ error: { message: string } }} props - The props object.
 * @param {{ message: string }} props.error - The error object containing the error message.
 * @returns {JSX.Element} A paragraph element displaying the error message.
 */

export default function SearchError({ error }) {
  return (
    <p className="text-center text-red-600 mt-10">
      Error loading venues: {error.message}
    </p>
  );
}
