import { ChevronDown } from "lucide-react";

export default function SectionToggle({ title, isOpen, toggle }) {
  return (
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
  );
}
