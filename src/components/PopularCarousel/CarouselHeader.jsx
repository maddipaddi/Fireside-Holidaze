/**
 * Renders a styled header for the carousel section.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.title - The title text to display in the header.
 * @returns {JSX.Element} The rendered header element.
 */

export default function CarouselHeader({ title }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-copy font-heading dark:text-background">
      {title}
    </h2>
  );
}
