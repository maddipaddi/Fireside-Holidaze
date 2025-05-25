import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";

export default function LoginForm({
  formData,
  handleChange,
  handleSubmit,
  isLoading,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-copy dark:bg-primary p-6 rounded-lg shadow-lg max-w-xs md:max-w-2xl mx-auto mt-18"
    >
      <h1 className="sr-only">Log in</h1>

      <LoginInput
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="johndoe@noroff.no"
        value={formData.email}
        onChange={handleChange}
        maxLength={40}
        required
      />

      <LoginInput
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder="password123"
        value={formData.password}
        onChange={handleChange}
        minLength={8}
        maxLength={20}
        required
      />

      <div className="bg-primary dark:bg-background p-4 text-center -mx-6 -mb-6 rounded-b-lg">
        <LoginButton isLoading={isLoading} />
      </div>
    </form>
  );
}
