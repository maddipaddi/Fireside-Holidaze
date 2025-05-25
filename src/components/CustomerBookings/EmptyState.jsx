/**
 * Renders an empty state component with an icon and descriptive text.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.icon - The icon to display.
 * @param {string} props.text - The text to display below the icon.
 * @returns {JSX.Element} The rendered empty state component.
 */

export default function EmptyState({ icon, text }) {
  return (
    <div className="text-center mb-16">
      <div className="mx-auto mb-2 h-6 w-6 text-primary dark:text-background">
        {icon}
      </div>
      <p className="text-copy dark:text-background">{text}</p>
    </div>
  );
}
