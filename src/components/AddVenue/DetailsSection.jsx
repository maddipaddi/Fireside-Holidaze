/**
 * Renders a section for entering venue details such as price, maximum number of guests, and rating.
 *
 * @component
 * @param {Object} props
 * @param {{ price: number, maxGuests: number, rating: number }} props.data - The current values for the venue details.
 * @param {function} props.onChange - Callback function to handle input changes.
 * @returns {JSX.Element} The rendered details section.
 */

export default function DetailsSection({ data, onChange }) {
  return (
    <section className="md:col-span-1 xl:col-span-2">
      <h3 className="text-lg font-bold font-body text-white mb-2 text-center">
        Details
      </h3>
      <div className="rounded-xl bg-offwhite dark:bg-background p-4 mb-4">
        <label
          htmlFor="price"
          className="block text-sm font-semibold font-body text-copy dark:text-copy mb-1"
        >
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          required
          value={data.price}
          onChange={onChange}
          className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
        />
      </div>
      <div className="rounded-xl bg-offwhite dark:bg-background p-4 mb-4">
        <label
          htmlFor="maxGuests"
          className="block text-sm font-semibold font-body text-copy dark:text-copy mb-1"
        >
          Maximum number of guests
        </label>
        <input
          type="number"
          name="maxGuests"
          id="maxGuests"
          required
          value={data.maxGuests}
          onChange={onChange}
          className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
        />
      </div>
      <div className="rounded-xl bg-offwhite dark:bg-background p-4 mb-4">
        <label
          htmlFor="rating"
          className="block text-sm font-semibold font-body text-copy dark:text-copy mb-1"
        >
          Rating
        </label>
        <input
          type="number"
          name="rating"
          id="rating"
          value={data.rating}
          onChange={onChange}
          className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
        />
      </div>
    </section>
  );
}
