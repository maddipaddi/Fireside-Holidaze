import FormInput from "./FormInput";
import CheckboxInput from "./CheckboxInput";

export default function RegisterForm({
  formData,
  onChange,
  onSubmit,
  isLoading,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-copy dark:bg-primary p-6 rounded-lg shadow-lg max-w-xs md:max-w-2xl mx-auto mt-18"
    >
      <h1 className="sr-only">Register</h1>

      <FormInput
        label="Name"
        id="name"
        type="text"
        name="name"
        minLength={2}
        maxLength={20}
        required
        value={formData.name}
        onChange={onChange}
        placeholder="John Doe"
      />

      <FormInput
        label="Email"
        id="email"
        type="email"
        name="email"
        maxLength={40}
        required
        value={formData.email}
        onChange={onChange}
        placeholder="johndoe@noroff.no"
      />

      <FormInput
        label="Password"
        id="password"
        type="password"
        name="password"
        minLength={8}
        maxLength={20}
        required
        value={formData.password}
        onChange={onChange}
        placeholder="Create a strong password"
      />

      <CheckboxInput
        label="Register as a venue manager"
        id="venueManager"
        name="venueManager"
        checked={formData.venueManager}
        onChange={onChange}
      />

      <div className="bg-primary dark:bg-background p-4 text-center -mx-6 -mb-6 rounded-b-lg">
        <button
          disabled={isLoading}
          className="bg-background dark:bg-primary text-copy dark:text-white font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </div>
    </form>
  );
}
