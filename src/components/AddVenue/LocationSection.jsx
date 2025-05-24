export default function LocationSection({ location, onChange }) {
  return (
    <section className="md:col-span-2 xl:col-span-2 xl:col-start-2 mb-4 sm:mb-12 md:mb-20">
      <h3 className="text-lg font-bold font-body text-white mb-2 text-center">
        Location
      </h3>
      <div className="rounded-xl bg-offwhite dark:bg-background p-4 mb-4">
        <label
          htmlFor="address"
          className="block text-sm font-semibold font-body text-copy dark:text-copy mb-1"
        >
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          minLength={3}
          maxLength={50}
          value={location.address}
          onChange={onChange}
          placeholder="Fox Hill"
          className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
        />
      </div>
      <div className="rounded-xl bg-offwhite dark:bg-background p-4 mb-4">
        <label
          htmlFor="city"
          className="block text-sm font-semibold font-body text-copy dark:text-copy mb-1"
        >
          City
        </label>
        <input
          type="text"
          name="city"
          id="city"
          maxLength={30}
          value={location.city}
          onChange={onChange}
          placeholder="Forest city"
          className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
        />
      </div>
      <div className="rounded-xl bg-offwhite dark:bg-background p-4 mb-4">
        <label
          htmlFor="zip"
          className="block text-sm font-semibold font-body text-copy dark:text-copy mb-1"
        >
          Zip code
        </label>
        <input
          type="text"
          name="zip"
          id="zip"
          minLength={4}
          maxLength={9}
          value={location.zip}
          onChange={onChange}
          placeholder="1234"
          className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
        />
      </div>
      <div className="rounded-xl bg-offwhite dark:bg-background p-4 mb-4">
        <label
          htmlFor="country"
          className="block text-sm font-semibold font-body text-copy dark:text-copy mb-1"
        >
          Country
        </label>
        <input
          type="text"
          name="country"
          id="country"
          minLength={2}
          maxLength={30}
          value={location.country}
          onChange={onChange}
          placeholder="Norway"
          className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
        />
      </div>{" "}
      <div className="md:col-span-2 xl:col-span-2 xl:col-start-2">
        <div className="rounded-xl bg-offwhite dark:bg-background p-4 mb-4">
          <label
            htmlFor="continent"
            className="block text-sm font-semibold font-body text-copy dark:text-copy mb-1"
          >
            Continent
          </label>
          <input
            type="text"
            name="continent"
            id="continent"
            minLength={4}
            maxLength={14}
            value={location.continent}
            onChange={onChange}
            placeholder="Europe"
            className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
          />
        </div>
      </div>
    </section>
  );
}
