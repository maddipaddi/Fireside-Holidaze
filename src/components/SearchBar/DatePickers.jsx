const DatePickers = ({ checkIn, setCheckIn, checkOut, setCheckOut }) => (
  <fieldset className="bg-offwhite p-3 rounded w-full md:col-span-3">
    <legend className="text-sm font-semibold font-body text-copy pt-10">
      Date
    </legend>
    <div className="flex flex-col md:flex-row gap-2">
      <div className="w-full md:w-1/2">
        <label
          htmlFor="check-in"
          className="block text-xs font-body text-gray-500 mb-1"
        >
          Check in
        </label>
        <input
          id="check-in"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div className="w-full md:w-1/2">
        <label
          htmlFor="check-out"
          className="block text-xs font-body text-gray-500 mb-1"
        >
          Check out
        </label>
        <input
          id="check-out"
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
    </div>
  </fieldset>
);

export default DatePickers;
