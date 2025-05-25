export default function RoleToggleButtons({
  onUpdate,
  onToggle,
  isVenueManager,
}) {
  return (
    <div className="text-center -mx-6 -mb-6 bg-primary dark:bg-background p-4 rounded-b-lg">
      <button
        onClick={onUpdate}
        className="bg-background dark:bg-primary text-copy dark:text-background font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer w-3/4 mb-4"
      >
        Update profile picture
      </button>
      <button
        onClick={onToggle}
        className="bg-background dark:bg-primary text-copy dark:text-background font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer w-3/4"
      >
        {isVenueManager ? "Switch to customer" : "Switch to venue manager"}
      </button>
    </div>
  );
}
