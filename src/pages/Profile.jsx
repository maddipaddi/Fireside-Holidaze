import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest.mjs";
import { showSuccessMessage } from "../utils/successMessage.mjs";
import { handleError } from "../utils/errorHandler.mjs";

export default function Profile() {
  const [formData, setFormData] = useState({
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
  });
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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

  const cleanedFormData = {
    ...formData,
    media: formData.media.filter((item) => item.url.trim() !== ""),
    price: Number(formData.price),
    maxGuests: Number(formData.maxGuests),
    rating: Number(formData.rating),
  };

  const { request, isLoading } = useApiRequest();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const result = await request(
        "https://v2.api.noroff.dev/holidaze/venues",
        {
          method: "POST",
          body: JSON.stringify(cleanedFormData),
        },
      );

      showSuccessMessage("Success! You have added a venue.");
      console.log("Success:", result); // remove after development
      navigate("/Profile");
    } catch (error) {
      handleError(error);
    }
  }
  return (
    <div className="pt-16 dark:text-white">
      <h1>Profile</h1>
      <p>All the profile stuff will be here</p>
      <article className="mx-auto p-4">
        <h2 className="text-3xl font-bold font-heading mb-4 text-center">
          Add a venue
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-copy dark:bg-primary p-4 md:py-8 md:px-16 rounded-lg shadow-lg mx-auto mt-12 max-w-6xl mx-auto grid gap-10 md:grid-cols-2 xl:grid-cols-4"
        >
          <section className="md:col-span-1 xl:col-span-2">
            <h3 className="text-lg font-bold font-body text-white mb-2 text-center">
              Basic info
            </h3>
            <div className="bg-white dark:bg-background p-4 rounded mb-4">
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
                placeholder="Enter venue name here"
                className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
              />
            </div>
            <div className="bg-white dark:bg-background p-4 rounded mb-4">
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
                maxLength={200}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a description of your venue"
                className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
              />
            </div>
          </section>
          <section className="md:col-span-1 xl:col-span-2">
            <h3 className="text-lg font-bold font-body text-white mb-2 text-center">
              Images
            </h3>
            {formData.media.map((mediaItem, index) => (
              <div key={index} className="flex gap-2">
                {mediaItem.url ? (
                  <div className="relative w-24 h-24 rounded overflow-hidden border">
                    <img
                      src={mediaItem.url}
                      alt={mediaItem.alt || "Image preview"}
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-bl px-1 cursor-pointer"
                    >
                      x
                    </button>
                  </div>
                ) : (
                  <div className="flex-grow bg-white dark:bg-background p-4 rounded mb-4">
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
                      placeholder="Enter the image url here"
                      className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
                    />
                  </div>
                )}
                <div className="flex-grow bg-white dark:bg-background p-4 rounded mb-4">
                  <label
                    htmlFor="alt"
                    className="block text-xs font-semibold font-body text-copy dark:text-copy mb-1"
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
                    className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              disabled={formData.media.length >= 4}
              className="bg-background text-copy font-body font-bold px-8 py-2 mt-3 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer flex place-self-center"
            >
              Add image
            </button>
          </section>
          <section className="md:col-span-1 xl:col-span-2">
            <h3 className="text-lg font-bold font-body text-white mb-2 text-center">
              Details
            </h3>
            <div className="bg-white dark:bg-background p-4 rounded mb-4">
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
            <div className="bg-white dark:bg-background p-4 rounded mb-4">
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
            <div className="bg-white dark:bg-background p-4 rounded mb-4">
              <label
                htmlFor="rating"
                className="block text-sm font-semibold font-body text-copy dark:text-copy mb-1"
              >
                Venue rating
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
            <div className="bg-white dark:bg-background p-4 rounded mb-6 flex items-center gap-2">
              <input
                type="checkbox"
                name="wifi"
                id="wifi"
                checked={formData.meta.wifi}
                onChange={(e) => handleNestedChange(e, "meta")}
                className="accent-copy"
              />
              <label
                htmlFor="wifi"
                className="text-m font-body text-copy dark:text-copy"
              >
                Wifi
              </label>
            </div>
            <div className="bg-white dark:bg-background p-4 rounded mb-6 flex items-center gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                checked={formData.meta.parking}
                onChange={(e) => handleNestedChange(e, "meta")}
                className="accent-copy"
              />
              <label
                htmlFor="parking"
                className="text-m font-body text-copy dark:text-copy"
              >
                Parking
              </label>
            </div>

            <div className="bg-white dark:bg-background p-4 rounded mb-6 flex items-center gap-2">
              <input
                type="checkbox"
                name="breakfast"
                id="breakfast"
                checked={formData.meta.breakfast}
                onChange={(e) => handleNestedChange(e, "meta")}
                className="accent-copy"
              />
              <label
                htmlFor="breakfast"
                className="text-m font-body text-copy dark:text-copy"
              >
                Breakfast
              </label>
            </div>

            <div className="bg-white dark:bg-background p-4 rounded mb-6 flex items-center gap-2">
              <input
                type="checkbox"
                name="pets"
                id="pets"
                checked={formData.meta.pets}
                onChange={(e) => handleNestedChange(e, "meta")}
                className="accent-copy"
              />
              <label
                htmlFor="pets"
                className="text-m font-body text-copy dark:text-copy"
              >
                Pets
              </label>
            </div>
          </section>
          <section className="md:col-span-2 xl:col-span-2 xl:col-start-2">
            <h3 className="text-lg font-bold font-body text-white mb-2 text-center">
              Location
            </h3>
            <div className="bg-white dark:bg-background p-4 rounded mb-4">
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
                checked={formData.location.address}
                onChange={(e) => handleNestedChange(e, "location")}
                placeholder="Enter the venue address here"
                className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
              />
            </div>
            <div className="bg-white dark:bg-background p-4 rounded mb-4">
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
                checked={formData.location.city}
                onChange={(e) => handleNestedChange(e, "location")}
                placeholder="Enter the venue city here"
                className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
              />
            </div>
            <div className="bg-white dark:bg-background p-4 rounded mb-4">
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
                checked={formData.location.zip}
                onChange={(e) => handleNestedChange(e, "location")}
                placeholder="Enter the venue zip code here"
                className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
              />
            </div>
            <div className="bg-white dark:bg-background p-4 rounded mb-4">
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
                checked={formData.location.country}
                onChange={(e) => handleNestedChange(e, "location")}
                placeholder="Enter the venue country here"
                className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
              />
            </div>
            <div className="bg-white dark:bg-background p-4 rounded mb-4">
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
                checked={formData.location.continent}
                onChange={(e) => handleNestedChange(e, "location")}
                placeholder="Enter the venue continent here"
                className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
              />
            </div>
          </section>

          <div className="bg-primary dark:bg-background p-4 text-center -m-4 sm:-mx-16 sm:-mb-8 rounded-b-lg md:col-span-2 xl:col-span-4">
            <button
              disabled={isLoading}
              className="bg-background dark:bg-primary text-copy dark:text-white font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer"
            >
              {isLoading ? "Adding the venue..." : "Add venue"}
            </button>
          </div>
        </form>
      </article>
    </div>
  );
}
