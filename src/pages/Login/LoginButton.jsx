/**
 * LoginButton component renders a styled button for login actions.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.isLoading - Indicates if the login process is ongoing. Disables the button and shows a loading state when true.
 * @returns {JSX.Element} The rendered login button.
 */

export default function LoginButton({ isLoading }) {
  return (
    <button
      disabled={isLoading}
      className="bg-background dark:bg-primary text-copy dark:text-white font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer"
    >
      {isLoading ? "Logging in..." : "Log in"}
    </button>
  );
}
