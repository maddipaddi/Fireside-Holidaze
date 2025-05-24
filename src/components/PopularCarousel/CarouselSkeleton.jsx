import { MapPinned } from "lucide-react";

export default function CarouselSkeleton() {
  return (
    <div className="w-full text-center py-12 flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <MapPinned className="mx-auto mb-2 h-6 w-6 animate-bounce text-primary" />
      <p className="text-lg text-copy font-body dark:text-background">
        Loading popular destinations... 🌍
      </p>
    </div>
  );
}
