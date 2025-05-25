import { useNavigate } from "react-router-dom";
import { useVenueForm } from "../hooks/useVenueForm.mjs";
import { showSuccessMessage } from "../utils/successMessage.mjs";
import { handleError } from "../utils/errorHandler.mjs";
import { apiRequest } from "../utils/api.mjs";
import { VENUES } from "../utils/constants.mjs";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BasicInfo from "../components/AddVenue/BasicInfoSection";
import Images from "../components/AddVenue/ImageSection";
import Details from "../components/AddVenue/DetailsSection";
import Facilities from "../components/AddVenue/FacilitiesSection";
import Location from "../components/AddVenue/LocationSection";

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
  const navigate = useNavigate();
  const {
    formData,
    isLoading,
    handleChange,
    handleNestedChange,
    handleMediaChange,
    addImageField,
    removeImage,
    handleSubmit,
  } = useVenueForm({
    venueId: id,
    onSubmit: (payload) =>
      apiRequest(`${VENUES}/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      showSuccessMessage("Updated venue!");
      navigate("/profile");
    },
    onError: handleError,
  });

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
      </Helmet>
      <article className="mx-auto px-4 w-full max-w-6xl mt-8">
        <h2 className="text-3xl font-bold font-heading mb-4 text-center dark:text-background">
          Edit venue
        </h2>
        <form
          onSubmit={handleSubmit}
          className="relative w-full bg-copy dark:bg-primary p-4 md:p-8 xl:p-10 pb-36 rounded-lg shadow-lg mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4 mb-10"
        >
          <BasicInfo data={formData} onChange={handleChange} />
          <Images
            media={formData.media}
            onChange={handleMediaChange}
            onAdd={addImageField}
            onRemove={removeImage}
          />
          <Details data={formData} onChange={handleChange} />
          <Facilities
            meta={formData.meta}
            onChange={(e) => handleNestedChange(e, "meta")}
          />
          <Location
            location={formData.location}
            onChange={(e) => handleNestedChange(e, "location")}
          />
          <div className="absolute bottom-0 left-0 w-full bg-primary dark:bg-background p-6 text-center rounded-b-lg">
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
