import { ChevronDown } from "lucide-react";

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
