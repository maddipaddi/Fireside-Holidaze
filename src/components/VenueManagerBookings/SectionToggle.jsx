import { ChevronDown } from "lucide-react";

/**
 * SectionToggle component renders a toggleable section header with a title and a chevron icon.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.title - The title to display in the section header.
 * @param {boolean} props.isOpen - Determines if the section is open (expanded).
 * @param {Function} props.toggle - Callback function to toggle the section open/closed.
 * @returns {JSX.Element} The rendered SectionToggle component.
 */

export default function SectionToggle({ title, isOpen, toggle }) {
  return (
    <>
      <button
        aria-expanded={isOpen}
        className="cursor-pointer flex justify-center items-center gap-2 mb-6 mt-16"
        onClick={toggle}
      >
        <h2 className="text-3xl font-bold font-heading text-copy dark:text-background">
          {title}
        </h2>
        <ChevronDown
          className={`transition-transform duration-300 dark:text-background ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
    </>
  );
}
