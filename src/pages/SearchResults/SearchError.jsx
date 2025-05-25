export default function SearchError({ error }) {
  return (
    <p className="text-center text-red-600 mt-10">
      Error loading venues: {error.message}
    </p>
  );
}
