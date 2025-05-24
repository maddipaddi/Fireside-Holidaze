export default function ImagesSection({ media, onChange, onAdd, onRemove }) {
  return (
    <section className="md:col-span-1 xl:col-span-2">
      <h3 className="text-lg font-bold font-body text-white mb-2 text-center">
        Images
      </h3>
      {media.map((mediaItem, index) => (
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
                  onClick={() => onRemove(index)}
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
              onChange={(e) => onChange(e, index, "url")}
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
              onChange={(e) => onChange(e, index, "alt")}
              placeholder="Brown cabin in the woods with fairlylights"
              className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        disabled={media.length >= 4}
        className="bg-offwhite text-copy font-body font-bold px-8 py-2 mt-3 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer flex place-self-center"
      >
        Add image
      </button>
    </section>
  );
}
