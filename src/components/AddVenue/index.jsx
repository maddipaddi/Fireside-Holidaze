import BasicInfo from "./BasicInfoSection";
import Images from "./ImageSection";
import Details from "./DetailsSection";
import Facilities from "./FacilitiesSection";
import Location from "./LocationSection";
import { showSuccessMessage } from "../../utils/successMessage.mjs";
import { handleError } from "../../utils/errorHandler.mjs";
import { useVenueForm } from "../../hooks/useVenueForm.mjs";
import { VENUES } from "../../utils/constants.mjs";
import { apiRequest } from "../../utils/api.mjs";

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
    onSubmit: (payload) =>
      apiRequest(VENUES, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      showSuccessMessage("Success! You have added a venue.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => window.location.reload(), 1200);
    },
    onError: handleError,
  });

  return (
    <article className="mx-auto px-4 w-full max-w-6xl mt-8">
      <h2 className="text-3xl font-bold font-heading mb-4 text-center dark:text-background">
        Add a venue
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
            {isLoading ? "Adding the venue..." : "Add venue"}
          </button>
        </div>
      </form>
    </article>
  );
}
