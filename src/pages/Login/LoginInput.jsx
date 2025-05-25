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
  );
}
