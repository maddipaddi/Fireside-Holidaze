/**
 * VenueGallery component displays a selected image and a gallery of venue media thumbnails.
 *
 * @component
 * @param {Object} props
 * @param {{ url: string, alt: string } | null} props.selectedImage - The currently selected image object or null.
 * @param {{ media: Array<{ url: string, alt: string }> }} props.venue - The venue object containing a media array.
 * @param {Function} props.setSelectedImage - Function to update the selected image.
 *
 * @returns {JSX.Element} The rendered VenueGallery component.
 */

function VenueGallery({ selectedImage, venue, setSelectedImage }) {
  return (
    <div className="flex flex-col items-center gap-4 px-4 py-6">
      {selectedImage && (
        <img
          src={selectedImage.url}
          alt={selectedImage.alt}
          className="max-h-64 w-auto rounded shadow-lg object-cover"
        />
      )}
      <div className="flex gap-2 flex-wrap justify-center mb-6">
        {venue.media.map((mediaItem, index) => (
          <img
            key={index}
            src={mediaItem.url}
            alt={mediaItem.alt}
            className={`h-16 w-16 object-cover rounded cursor-pointer border-2 transition ${
              selectedImage?.url === mediaItem.url
                ? "border-accent"
                : "border-transparent"
            }`}
            onClick={() => setSelectedImage(mediaItem)}
          />
        ))}
      </div>
    </div>
  );
}

export default VenueGallery;
