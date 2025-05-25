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
