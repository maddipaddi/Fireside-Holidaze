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
