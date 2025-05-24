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
