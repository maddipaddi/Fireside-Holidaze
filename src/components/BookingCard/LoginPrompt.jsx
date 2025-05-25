/**
 * Displays a prompt informing the user that they must be logged in to book a venue.
 * Provides a link to the login page.
 *
 * @component
 * @returns {JSX.Element} A message with a login link for unauthenticated users.
 */

function LoginPrompt() {
  return (
    <p className="text-black">
      You must be logged in to book this venue. Please{" "}
      <a href="/login" className="text-blue-500 underline">
        log in
      </a>{" "}
      to continue.
    </p>
  );
}
export default LoginPrompt;
