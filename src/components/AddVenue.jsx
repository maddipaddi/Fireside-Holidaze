import { useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest.mjs";
import { showSuccessMessage } from "../utils/successMessage.mjs";
import { handleError } from "../utils/errorHandler.mjs";
import { VENUES } from "../utils/constants.mjs";

const INITIAL_FORM_DATA = {
  name: "",
  description: "",
  media: [{ url: "", alt: "" }],
  price: 0,
  maxGuests: 0,
  rating: 0,
  meta: {
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  },
  location: {
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
    lat: 0,
    lng: 0,
  },
};

/**
 * AddVenue component renders a form for adding a new venue with details such as
 * name, description, images, price, guest capacity, rating, facilities, and location.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered AddVenue form component.
 *
 * @example
 * // Usage in a parent component
 * <AddVenue />
 *
 * @function handleChange
 * Handles changes to top-level form fields and updates the form data state.
 *
 * @function handleNestedChange
 * Handles changes to nested form fields (e.g., meta, location) and updates the form data state.
 *
 * @function handleMediaChange
 * Handles changes to media (image) fields and updates the media array in the form data state.
 *
 * @function addImageField
 * Adds a new image field to the media array, up to a maximum of 4 images.
 *
 * @function removeImage
 * Removes an image from the media array by index.
 *
 * @function handleSubmit
 * Handles form submission, cleans and formats form data, sends a POST request to add the venue,
 * shows a success message, resets the form, and reloads the page.
 */

export default function AddVenue() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const { request, isLoading } = useApiRequest();

  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    setFormData((prev) => {
      if (name in prev) {
        return {
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        };
      }
      return prev;
    });
  }

  function handleNestedChange(event, section) {
    const { name, type, value, checked } = event.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: val,
      },
    }));
  }

  function handleMediaChange(event, index, field) {
    const { value } = event.target;
    setFormData((prev) => {
      const updatedMedia = [...prev.media];
      updatedMedia[index][field] = value;
      return { ...prev, media: updatedMedia };
    });
  }

  function addImageField() {
    setFormData((prev) => {
      if (prev.media.length >= 4) return prev;
      return {
        ...prev,
        media: [...prev.media, { url: "", alt: "" }],
      };
    });
  }

  function removeImage(index) {
    setFormData((prev) => {
      const media = [...prev.media];
      media.splice(index, 1);
      return { ...prev, media };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanedFormData = {
      ...formData,
      media: formData.media.filter((item) => item.url.trim() !== ""),
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      rating: Number(formData.rating),
    };

    try {
      await request(`${VENUES}`, {
        method: "POST",
        body: JSON.stringify(cleanedFormData),
      });

      showSuccessMessage("Success! You have added a venue.");
      setFormData(INITIAL_FORM_DATA);
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <article className="mx-auto px-4 w-full max-w-6xl mt-8">
      <h2 className="text-3xl font-bold font-heading mb-4 text-center dark:text-background">
        Add a venue
      </h2>
      <form
        onSubmit={handleSubmit}
        className="relative w-full bg-copy dark:bg-primary p-4 md:p-8 xl:p-10 pb-36 rounded-lg shadow-lg mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4 mb-10"
      >
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
              value={formData.name}
              onChange={handleChange}
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
              value={formData.description}
              onChange={handleChange}
              placeholder="This amazing cabin sits on the top of a cliff, overlooking the sea..."
              className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
            />
          </div>
        </section>
        <section className="md:col-span-1 xl:col-span-2">
          <h3 className="text-lg font-bold font-body text-white mb-2 text-center">
            Images
          </h3>
          {formData.media.map((mediaItem, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-4 rounded-xl bg-white dark:bg-background p-4 mb-4"
            >
              <div className="w-full md:w-40 h-36 relative rounded overflow-hidden border flex-shrink-0 flex items-center justify-center">
                {mediaItem.url ? (
                  <>
                    <img
                      src={mediaItem.url}
                      alt={mediaItem.alt || "Image preview"}
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-600 text-white text-s rounded-bl px-1 cursor-pointer"
                    >
                      x
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-copy dark:text-copy p-1 text-center">
                    Image preview
                  </span>
                )}
              </div>

              <div className="flex-grow">
                <label
                  htmlFor="url"
                  className="block text-xs font-semibold font-body text-copy dark:text-copy mb-1"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  value={mediaItem.url}
                  onChange={(e) => handleMediaChange(e, index, "url")}
                  placeholder="https://images.unsplash.com/photo-1525113990976-399835c43838?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
                />

                <label
                  htmlFor="alt"
                  className="block text-xs font-semibold font-body text-copy dark:text-copy mb-1 mt-2"
                >
                  Image description
                </label>
                <input
                  type="text"
                  name="alt"
                  id="alt"
                  value={mediaItem.alt}
                  onChange={(e) => handleMediaChange(e, index, "alt")}
                  placeholder="Brown cabin in the woods with fairlylights"
                  className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            disabled={formData.media.length >= 4}
            className="bg-offwhite text-copy font-body font-bold px-8 py-2 mt-3 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer flex place-self-center"
          >
            Add image
          </button>
        </section>
        <section className="md:col-span-1 xl:col-span-2">
          <h3 className="text-lg font-bold font-body text-white mb-2 text-center">
            Details{" "}
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
              value={formData.price}
              onChange={handleChange}
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
              value={formData.maxGuests}
              onChange={handleChange}
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
              value={formData.rating}
              onChange={handleChange}
              className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
            />
          </div>
        </section>
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
                checked={formData.meta.wifi}
                onChange={(e) => handleNestedChange(e, "meta")}
                className="accent-copy scale-150 mr-2"
              />
              <label
                htmlFor="wifi"
                className="font-body text-copy dark:text-copy"
              >
                Wifi
              </label>
            </div>
            <div className="font-medium py-6 pl-24 rounded flex items-center gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                checked={formData.meta.parking}
                onChange={(e) => handleNestedChange(e, "meta")}
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
                checked={formData.meta.breakfast}
                onChange={(e) => handleNestedChange(e, "meta")}
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
                checked={formData.meta.pets}
                onChange={(e) => handleNestedChange(e, "meta")}
                className="accent-copy scale-150 mr-2"
              />
              <label
                htmlFor="pets"
                className="font-body text-copy dark:text-copy"
              >
                Pets
              </label>
            </div>
          </div>
        </section>
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
              minLength={10}
              maxLength={50}
              value={formData.location.address}
              onChange={(e) => handleNestedChange(e, "location")}
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
              value={formData.location.city}
              onChange={(e) => handleNestedChange(e, "location")}
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
              value={formData.location.zip}
              onChange={(e) => handleNestedChange(e, "location")}
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
              value={formData.location.country}
              onChange={(e) => handleNestedChange(e, "location")}
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
                value={formData.location.continent}
                onChange={(e) => handleNestedChange(e, "location")}
                placeholder="Europe"
                className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
              />
            </div>
          </div>
        </section>
        <div className="absolute bottom-0 left-0 w-full bg-primary dark:bg-background p-6 text-center rounded-b-lg">
          <button
            disabled={isLoading}
            className="bg-background dark:bg-primary text-copy dark:text-white font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer"
          >
            {isLoading ? "Adding the venue..." : "Add venue"}
          </button>
        </div>
      </form>
    </article>
  );
}
