export default function CarouselHeader({ title }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-copy font-heading dark:text-background">
      {title}
    </h2>
  );
}
