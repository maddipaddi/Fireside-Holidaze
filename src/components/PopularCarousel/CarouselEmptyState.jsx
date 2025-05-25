import { Globe } from "lucide-react";

/**
 * Renders an empty state for the carousel component.
 * Displays a globe icon and a message indicating that there are no hotspots available.
 *
 * @component
 * @returns {JSX.Element} The rendered empty state for the carousel.
 */

export default function CarouselEmptyState() {
  return (
    <div className="w-full text-center py-12">
      <Globe className="mx-auto mb-2 h-6 w-6 text-primary" />
      <p className="text-lg text-copy font-body dark:text-background">
        No hotspots right now — but adventure is always just around the corner!
      </p>
    </div>
  );
}
