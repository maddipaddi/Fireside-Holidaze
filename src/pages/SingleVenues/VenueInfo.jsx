function VenueInfo({ venue }) {
  return (
    <section className="max-w-xl mx-auto">
      <h3 className="text-center font-heading">About the cabin</h3>
      <p className="pt-4 pb-8 px-10">{venue.description}</p>
      <p className="pt-4 pb-8 px-10 font-semibold">
        Maximum guests: {venue.maxGuests}
      </p>
    </section>
  );
}

export default VenueInfo;
