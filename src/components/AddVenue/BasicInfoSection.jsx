/**
 * Renders the basic information section for adding or editing a venue.
 *
 * @component
 * @param {Object} props
 * @param {{ name: string, description: string }} props.data - The current values for the venue's name and description.
 * @param {function} props.onChange - Callback function to handle input changes for the form fields.
 * @returns {JSX.Element} The rendered section containing input fields for venue name and description.
 */

export default function BasicInfoSection({ data, onChange }) {
  return (
    <section className="md:col-span-1 xl:col-span-2">
      <h3 className="text-lg font-bold font-body text-white mb-2 text-center">
        Basic info
      </h3>
      <div className="rounded-xl bg-offwhite dark:bg-background p-4 mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-semibold font-body text-copy dark:text-copy mb-1"
        >
          Venue name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          minLength={2}
          maxLength={30}
          required
          value={data.name}
          onChange={onChange}
          placeholder="Cozy cabin"
          className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy bg-white"
        />
      </div>
      <div className="rounded-xl bg-offwhite dark:bg-background p-4 mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-semibold font-body text-copy dark:text-copy mb-1"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={5}
          maxLength={500}
          required
          value={data.description}
          onChange={onChange}
          placeholder="This amazing cabin sits on the top of a cliff, overlooking the sea..."
          className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
        />
      </div>
    </section>
  );
}
