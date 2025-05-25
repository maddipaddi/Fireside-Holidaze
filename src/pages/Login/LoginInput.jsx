/**
 * LoginInput is a reusable input component for login forms.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.id - The id for the input element.
 * @param {string} props.name - The name attribute for the input element.
 * @param {string} props.type - The type of the input (e.g., "text", "password").
 * @param {string} props.label - The label text displayed above the input.
 * @param {string|number} props.value - The current value of the input.
 * @param {function} props.onChange - Callback fired when the input value changes.
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {...Object} [rest] - Additional props spread to the input element.
 * @returns {JSX.Element} The rendered input field with label.
 */

export default function LoginInput({
  id,
  name,
  type,
  label,
  value,
  onChange,
  placeholder,
  ...rest
}) {
  return (
    <>
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
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
          {...rest}
        />
      </div>
    </>
  );
}
