/**
 * FormInput component renders a styled input field with a label.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.label - The label text for the input field.
 * @param {string} props.id - The id for the input element.
 * @param {string} props.type - The type of the input (e.g., "text", "password").
 * @param {string} props.name - The name attribute for the input.
 * @param {number} [props.minLength] - The minimum length for the input value.
 * @param {number} [props.maxLength] - The maximum length for the input value.
 * @param {boolean} [props.required] - Whether the input is required.
 * @param {string|number} props.value - The current value of the input.
 * @param {function} props.onChange - Callback fired when the input value changes.
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @returns {JSX.Element} The rendered input field with label.
 */

export default function FormInput({
  label,
  id,
  type,
  name,
  minLength,
  maxLength,
  required,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="bg-offwhite dark:bg-background p-4 rounded mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-semibold font-body text-copy dark:text-copy mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
      />
    </div>
  );
}
