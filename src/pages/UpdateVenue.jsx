import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest.mjs";
import { showSuccessMessage } from "../utils/successMessage.mjs";
import { handleError } from "../utils/errorHandler.mjs";
import { SINGLE_VENUE } from "../utils/constants.mjs";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

/**
 * UpdateVenue component allows users to edit and update an existing venue.
 *
 * Fetches venue data by ID, populates a form, and submits updates via API.
 * Handles nested form fields, image management, and displays feedback on success or error.
 *
 * @component
 *
 * @returns {JSX.Element} The UpdateVenue form UI.
 *
 * @example
 * // Usage in a route
 * <Route path="/venues/:id/edit" element={<UpdateVenue />} />
 *
 * @dependencies
 * - React (useState, useEffect)
 * - react-router-dom (useParams, useNavigate)
 * - useApiRequest (custom hook for API requests)
 * - showSuccessMessage, handleError (notification utilities)
 *
 * @state
 * - formData: Object containing all venue fields (name, description, media, price, maxGuests, rating, meta, location)
 * - isLoading: Boolean indicating if the API request is in progress
 *
 * @functions
 * - handleChange: Handles changes for top-level form fields
 * - handleNestedChange: Handles changes for nested fields (meta, location)
 * - handleMediaChange: Handles changes for media (images) fields
 * - addImageField: Adds a new image input field (max 4)
 * - removeImage: Removes an image input field
 * - handleSubmit: Submits the updated venue data to the API
 */

export default function UpdateVenue() {
  const { id } = useParams();
  const { request, isLoading } = useApiRequest();

  useEffect(() => {
    async function fetchVenue() {
      try {
        const response = await request(`${SINGLE_VENUE}/${id}`);
        const fetchedVenue = response.data;

        setFormData({
          name: fetchedVenue.name || "",
          description: fetchedVenue.description || "",
          media:
            fetchedVenue.media.length > 0
              ? fetchedVenue.media
              : [{ url: "", alt: "" }],
          price: fetchedVenue.price || 0,
          maxGuests: fetchedVenue.maxGuests || 0,
          rating: fetchedVenue.rating || 0,
          meta: {
            wifi: fetchedVenue.meta?.wifi || false,
            parking: fetchedVenue.meta?.parking || false,
            breakfast: fetchedVenue.meta?.breakfast || false,
            pets: fetchedVenue.meta?.pets || false,
          },
          location: {
            address: fetchedVenue.location?.address || "",
            city: fetchedVenue.location?.city || "",
            zip: fetchedVenue.location?.zip || "",
            country: fetchedVenue.location?.country || "",
            continent: fetchedVenue.location?.continent || "",
          },
        });
      } catch (error) {
        handleError(error);
      }
    }
    fetchVenue();
  }, [id]);

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

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await request(`${SINGLE_VENUE}/${id}`, {
        method: "PUT",
        body: JSON.stringify(cleanedFormData),
      });

      showSuccessMessage("Success! You have updated the venue.");
      navigate("/Profile");
    } catch (error) {
      handleError(error);
    }
  }

  return (
        <>
      <Helmet>
        <title>Edit venue | Holidaze</title>
        <meta name="description" content="Edit your cabin information." />
        <meta
          property="og:title"
          content="Fireside Holidaze - Edit cabin venue"
        />
        <meta
          property="og:description"
          content="Edit your cabin information."
        />
        <meta
          property="og:image"
          content="https://fireside-holidaze.netlify.app/assets/zachary-kyra-derksen-unsplash.jpg"
        />
        <meta
          property="og:url"
          content="https://fireside-holidaze.netlify.app/"
        />
        <meta property="og:type" content="website" />
      </Helmet>{" "}
      <article>
        <h1 className="text-3xl font-bold font-heading mb-4 text-center text-copy dark:text-background mt-12">
          Edit venue
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-copy dark:bg-primary p-4 md:py-8 md:px-16 rounded-lg shadow-lg mx-auto mt-12 max-w-6xl grid gap-10 md:grid-cols-2 xl:grid-cols-4"
        >
          <section className="md:col-span-1 xl:col-span-2">
            <h3 className="text-lg font-bold font-body text-white mb-2 text-center">
              Basic info
            </h3>
            <div className="bg-offwhite dark:bg-background p-4 rounded mb-4">
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
            <div className="bg-offwhite dark:bg-background p-4 rounded mb-4">
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
                  <div className="flex-grow bg-offwhite dark:bg-background p-4 rounded mb-4">
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
                <div className="flex-grow bg-offwhite dark:bg-background p-4 rounded mb-4">
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
              className="bg-white text-copy font-body font-bold px-8 py-2 mt-3 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer flex place-self-center"
            >
              Add image
            </button>
          </section>
          <section className="md:col-span-1 xl:col-span-2">
            <h3 className="text-lg font-bold font-body text-white mb-2 text-center">
              Details
            </h3>
            <div className="bg-offwhite dark:bg-background p-4 rounded mb-4">
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
            <div className="bg-offwhite dark:bg-background p-4 rounded mb-4">
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
            <div className="bg-offwhite dark:bg-background p-4 rounded mb-4">
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
            <div className="bg-offwhite dark:bg-background p-4 rounded mb-6 flex items-center gap-2">
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
            <div className="bg-offwhite dark:bg-background p-4 rounded mb-6 flex items-center gap-2">
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

            <div className="bg-offwhite dark:bg-background p-4 rounded mb-6 flex items-center gap-2">
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

            <div className="bg-offwhite dark:bg-background p-4 rounded mb-6 flex items-center gap-2">
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
            <div className="bg-offwhite dark:bg-background p-4 rounded mb-4">
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
                placeholder="Enter the venue address here"
                className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
              />
            </div>
            <div className="bg-offwhite dark:bg-background p-4 rounded mb-4">
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
                placeholder="Enter the venue city here"
                className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
              />
            </div>
            <div className="bg-offwhite dark:bg-background p-4 rounded mb-4">
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
                placeholder="Enter the venue zip code here"
                className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
              />
            </div>
            <div className="bg-offwhite dark:bg-background p-4 rounded mb-4">
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
                placeholder="Enter the venue country here"
                className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
              />
            </div>
            <div className="bg-offwhite dark:bg-background p-4 rounded mb-4">
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
              {isLoading ? "Updating the venue..." : "Update venue"}
            </button>
          </div>
        </form>
      </article>
    </>
  );
}
