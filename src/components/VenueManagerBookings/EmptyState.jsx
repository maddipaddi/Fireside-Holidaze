/**
 * Displays an empty state with an icon and a message.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ElementType} props.icon - The icon component to display.
 * @param {string} props.message - The message to display below the icon.
 * @returns {JSX.Element} The rendered empty state component.
 */

export default function EmptyState({ icon, message }) {
  const Icon = icon;

  return (
    <>
      <Icon className="mx-auto mb-2 h-6 w-6 text-primary dark:text-background mt-4" />
      <p className="text-center text-copy dark:text-background mb-16">
        {message}
      </p>
    </>
  );
}
