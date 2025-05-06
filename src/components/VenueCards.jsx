import { useNavigate } from "react-router-dom";

function VenueCards({ venues }) {
  const navigate = useNavigate();

  if (!venues || venues.length === 0) {
    return <p>No venues found</p>;
  }

  return (
    <section>
      <div>
        {venues.map((venue) => (
          <div key={venue.id}>
            <img
              src={
                venue.media?.[0]?.url ||
                "https://placehold.co/150x150?text=No+Image"
              }
              alt={venue.media?.[0]?.alt || venue.name}
            />
            <div>
              <h2>{venue.name}</h2>
              <p>${venue.price}</p>
            </div>
            <div>
              <p>*{venue.rating}</p>
            </div>
            <div>
              <button
                className="text-white cursor-pointer"
                onClick={() => navigate(`/venue/${venue.id}`)}
              >
                View Venue
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default VenueCards;
