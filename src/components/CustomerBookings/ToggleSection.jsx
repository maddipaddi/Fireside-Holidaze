import { ChevronDown } from "lucide-react";

/**
 * ToggleSection component renders a button with a title and a chevron icon,
 * allowing users to expand or collapse a section.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.title - The title displayed in the toggle section.
 * @param {boolean} props.expanded - Determines if the section is expanded.
 * @param {Function} props.toggle - Callback function to toggle the expanded state.
 * @param {string} [props.className] - Additional CSS classes for the button.
 * @returns {JSX.Element} The rendered ToggleSection component.
 */

export default function ToggleSection({
  title,
  expanded,
  toggle,
  className = "",
}) {
  return (
    <button
      aria-expanded={expanded}
      className={`cursor-pointer flex justify-center items-center gap-2 mb-6 ${className}`}
      onClick={toggle}
    >
      <h2 className="text-3xl font-bold font-heading text-copy dark:text-background">
        {title}
      </h2>
      <ChevronDown
        className={`transition-transform duration-300 dark:text-background ${
          expanded ? "rotate-180" : "rotate-0"
        }`}
      />
    </button>
  );
}
