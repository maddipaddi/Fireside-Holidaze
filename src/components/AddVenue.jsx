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
    <article className="mx-auto p-4">
      <h2 className="text-4xl font-bold font-heading mb-6 text-center dark:text-white">
        Add a venue
      </h2>
      <form
        onSubmit={handleSubmit}
        className="relative w-full xl:w-300 bg-copy dark:bg-primary p-4 md:p-10 md:pb-40 xl:p-40 pb-36 rounded-lg shadow-lg mt-12 grid gap-20 md:grid-cols-2 xl:grid-cols-4"
      >
        <section className="col-span-1 xl:col-span-2 flex flex-col md:w-full w-full h-auto">
          <h3 className="text-lg sm:text-xl font-bold font-body text-white mb-4 text-center">
            Basic info
          </h3>
          <div className="flex flex-col rounded-2xl overflow-hidden bg-background dark:bg-background">
            <div className="p-3 sm:p-4 flex flex-col">
              <label
                htmlFor="name"
                className="block text-sm sm:text-base font-semibold font-body text-copy dark:text-copy mb-2"
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
                placeholder="Enter venue name here"
                className="font-body text-sm sm:text-base w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy bg-white dark:bg-white dark:text-copy"
              />
            </div>

            <div className="p-3 sm:p-4 flex flex-col">
              <label
                htmlFor="description"
                className="block text-sm sm:text-base font-semibold font-body text-copy dark:text-copy mb-2"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                maxLength={200}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a description of your venue"
                className="font-body text-sm sm:text-base w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy bg-white dark:bg-white dark:text-copy"
              />
            </div>
          </div>
        </section>
        <section className="md:col-span-1 xl:col-span-2 flex flex-col md:w-full h-full">
          <h3 className="text-xl font-bold font-body text-white mb-4 text-center">
            Images
          </h3>
          <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-background dark:bg-background p-4">
            {formData.media.map((mediaItem, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 mb-4 last:mb-0"
              >
                {mediaItem.url ? (
                  <div className="relative w-28 h-28 rounded overflow-hidden border mb-2">
                    <img
                      src={mediaItem.url}
                      alt={mediaItem.alt || "Image preview"}
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-600 text-white text-base rounded-bl px-2 cursor-pointer"
                    >
                      x
                    </button>
                  </div>
                ) : (
                  <div className="w-full max-w-xs mb-2">
                    <label
                      htmlFor="url"
                      className="block text-base font-semibold font-body text-copy dark:text-copy mb-2"
                    >
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="url"
                      id="url"
                      value={mediaItem.url}
                      onChange={(e) => handleMediaChange(e, index, "url")}
                      placeholder="Enter the image url here"
                      className="font-body text-base w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy bg-white dark:bg-white dark:text-copy"
                    />
                  </div>
                )}
                <div className="w-full max-w-xs">
                  <label
                    htmlFor="alt"
                    className="block text-base font-semibold font-body text-copy dark:text-copy mb-2"
                  >
                    Image description
                  </label>
                  <input
                    type="text"
                    name="alt"
                    id="alt"
                    value={mediaItem.alt}
                    onChange={(e) => handleMediaChange(e, index, "alt")}
                    placeholder="Enter the image description here"
                    className="font-body text-base w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy bg-white dark:bg-white dark:text-copy"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addImageField}
            disabled={formData.media.length >= 4}
            className="bg-background text-copy font-body font-bold text-lg px-8 py-2 mt-4 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer flex place-self-center"
          >
            Add image
          </button>
        </section>
        <section className="md:col-span-1 xl:col-span-2 flex flex-col md:w-full h-full">
          <h3 className="text-xl font-bold font-body text-white mb-4 text-center">
            Details
          </h3>
          <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-background dark:bg-background">
            <div className="p-4 flex-1 flex flex-col justify-center">
              <label
                htmlFor="price"
                className="block text-base font-semibold font-body text-copy dark:text-copy mb-2"
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
                className="font-body text-base w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy bg-white dark:bg-white dark:text-copy"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center">
              <label
                htmlFor="maxGuests"
                className="block text-base font-semibold font-body text-copy dark:text-copy mb-2"
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
                className="font-body text-base w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy bg-white dark:bg-white dark:text-copy"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center">
              <label
                htmlFor="rating"
                className="block text-base font-semibold font-body text-copy dark:text-copy mb-2"
              >
                Venue rating
              </label>
              <input
                type="number"
                name="rating"
                id="rating"
                value={formData.rating}
                onChange={handleChange}
                className="font-body text-base w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy bg-white dark:bg-white dark:text-copy"
              />
            </div>
          </div>
        </section>
        <section className="md:col-span-1 xl:col-span-2 flex flex-col md:w-full h-full">
          <h3 className="text-xl font-bold font-body text-white mb-4 text-center">
            Facilities
          </h3>
          <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-background dark:bg-background justify-center items-center ">
            <div className="p-4 flex items-center gap-3 w-40">
              <input
                type="checkbox"
                name="wifi"
                id="wifi"
                checked={formData.meta.wifi}
                onChange={(e) => handleNestedChange(e, "meta")}
                className="accent-copy h-10 w-5"
              />
              <label
                htmlFor="wifi"
                className="text-lg font-body text-copy dark:text-copy"
              >
                Wifi
              </label>
            </div>
            <div className="p-4 flex items-center gap-3 w-40">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                checked={formData.meta.parking}
                onChange={(e) => handleNestedChange(e, "meta")}
                className="accent-copy h-10 w-5"
              />
              <label
                htmlFor="parking"
                className="text-lg font-body text-copy dark:text-copy"
              >
                Parking
              </label>
            </div>
            <div className="p-4 flex items-center gap-3 w-40">
              <input
                type="checkbox"
                name="breakfast"
                id="breakfast"
                checked={formData.meta.breakfast}
                onChange={(e) => handleNestedChange(e, "meta")}
                className="accent-copy h-10 w-5"
              />
              <label
                htmlFor="breakfast"
                className="text-lg font-body text-copy dark:text-copy"
              >
                Breakfast
              </label>
            </div>
            <div className="p-4 flex items-center gap-3 w-40">
              <input
                type="checkbox"
                name="pets"
                id="pets"
                checked={formData.meta.pets}
                onChange={(e) => handleNestedChange(e, "meta")}
                className="accent-copy h-10 w-5"
              />
              <label
                htmlFor="pets"
                className="text-lg font-body text-copy dark:text-copy"
              >
                Pets
              </label>
            </div>
          </div>
        </section>
        <section className="md:col-span-2 xl:col-span-2 xl:col-start-2 flex flex-col md:w-full h-full">
          <h3 className="text-xl font-bold font-body text-white mb-4 text-center">
            Location
          </h3>
          <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-background dark:bg-background">
            <div className="p-4 flex-1 flex flex-col justify-center">
              <label
                htmlFor="address"
                className="block text-base font-semibold font-body text-copy dark:text-copy mb-2"
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
                placeholder="Enter the venue address here"
                className="font-body text-base w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy bg-white dark:bg-white dark:text-copy"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center">
              <label
                htmlFor="city"
                className="block text-base font-semibold font-body text-copy dark:text-copy mb-2"
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
                placeholder="Enter the venue city here"
                className="font-body text-base w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy bg-white dark:bg-white dark:text-copy"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center">
              <label
                htmlFor="zip"
                className="block text-base font-semibold font-body text-copy dark:text-copy mb-2"
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
                placeholder="Enter the venue zip code here"
                className="font-body text-base w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy bg-white dark:bg-white dark:text-copy"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center">
              <label
                htmlFor="country"
                className="block text-base font-semibold font-body text-copy dark:text-copy mb-2"
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
                placeholder="Enter the venue country here"
                className="font-body text-base w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy bg-white dark:bg-white dark:text-copy"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center">
              <label
                htmlFor="continent"
                className="block text-base font-semibold font-body text-copy dark:text-copy mb-2"
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
                placeholder="Enter the venue continent here"
                className="font-body text-base w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy bg-white dark:bg-white dark:text-copy"
              />
            </div>
          </div>
        </section>

        <div className="absolute bottom-0 left-0 w-full bg-primary dark:bg-background p-6 text-center rounded-b-lg">
          <button
            disabled={isLoading}
            className="bg-background dark:bg-primary text-copy dark:text-white font-body font-bold text-xl px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer"
          >
            {isLoading ? "Adding the venue..." : "Add venue"}
          </button>
        </div>
      </form>
    </article>
  );
}
