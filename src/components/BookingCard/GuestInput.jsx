function GuestInput({ guests, setGuests, maxGuests }) {
  return (
    <label htmlFor="guests" className="block mb-2 text-black">
      Guests:
      <input
        id="guests"
        name="guests"
        type="number"
        min="1"
        max={maxGuests}
        value={guests}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (value > maxGuests) {
            setGuests(maxGuests);
          } else if (value < 1) {
            setGuests(1);
          } else {
            setGuests(value);
          }
        }}
        className="w-full mt-1 p-2 border rounded text-black bg-white"
      />
    </label>
  );
}
export default GuestInput;
