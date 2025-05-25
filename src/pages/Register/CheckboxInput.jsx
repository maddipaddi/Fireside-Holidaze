export default function CheckboxInput({ label, id, name, checked, onChange }) {
  return (
    <div className="bg-offwhite dark:bg-background p-4 rounded mb-6 flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="accent-copy"
      />
      <label htmlFor={id} className="text-m font-body text-copy dark:text-copy">
        {label}
      </label>
    </div>
  );
}
