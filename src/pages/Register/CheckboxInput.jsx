/**
 * CheckboxInput component renders a styled checkbox input with a label.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.label - The text label displayed next to the checkbox.
 * @param {string} props.id - The unique identifier for the checkbox input and label association.
 * @param {string} props.name - The name attribute for the checkbox input.
 * @param {boolean} props.checked - Determines whether the checkbox is checked.
 * @param {function} props.onChange - Callback function called when the checkbox state changes.
 * @returns {JSX.Element} The rendered checkbox input with label.
 */

export default function CheckboxInput({ label, id, name, checked, onChange }) {
  return (
    <>
      <div className="bg-offwhite dark:bg-background p-4 rounded mb-6 flex items-center gap-2">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="accent-copy"
        />
        <label
          htmlFor={id}
          className="text-m font-body text-copy dark:text-copy"
        >
          {label}
        </label>
      </div>
    </>
  );
}
