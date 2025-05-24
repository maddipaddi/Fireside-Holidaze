export default function FacilitiesSection({ meta, onChange }) {
  return (
    <section className="md:col-span-1 xl:col-span-2">
      <h3 className="text-lg font-bold font-body text-white mb-2 text-center">
        Facilities
      </h3>
      <div className="rounded-xl bg-offwhite dark:bg-background">
        <div className="font-medium pt-10 pb-6 pl-24 rounded flex items-center gap-2">
          <input
            type="checkbox"
            name="wifi"
            id="wifi"
            checked={meta.wifi}
            onChange={onChange}
            className="accent-copy scale-150 mr-2"
          />
          <label htmlFor="wifi" className="font-body text-copy dark:text-copy">
            Wifi
          </label>
        </div>
        <div className="font-medium py-6 pl-24 rounded flex items-center gap-2">
          <input
            type="checkbox"
            name="parking"
            id="parking"
            checked={meta.parking}
            onChange={onChange}
            className="accent-copy scale-150 mr-2"
          />
          <label
            htmlFor="parking"
            className="font-body text-copy dark:text-copy"
          >
            Parking
          </label>
        </div>
        <div className="font-medium py-6 pl-24 rounded flex items-center gap-2">
          <input
            type="checkbox"
            name="breakfast"
            id="breakfast"
            checked={meta.breakfast}
            onChange={onChange}
            className="accent-copy scale-150 mr-2"
          />
          <label
            htmlFor="breakfast"
            className="font-body text-copy dark:text-copy"
          >
            Breakfast
          </label>
        </div>
        <div className="font-medium pt-6 pb-10 pl-24 rounded flex items-center gap-2">
          <input
            type="checkbox"
            name="pets"
            id="pets"
            checked={meta.pets}
            onChange={onChange}
            className="accent-copy scale-150 mr-2"
          />
          <label htmlFor="pets" className="font-body text-copy dark:text-copy">
            Pets
          </label>
        </div>
      </div>
    </section>
  );
}
