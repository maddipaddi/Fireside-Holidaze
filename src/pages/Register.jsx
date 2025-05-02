import { useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest.mjs";
import { showSuccessMessage } from "../utils/successMessage.mjs";
import { handleError } from "../utils/errorHandler.mjs";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    venueManager: false,
  });

  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const { request, isLoading } = useApiRequest();

  async function handleSubmit(event) {
    event.preventDefault();

    const email = formData.email.toLowerCase();

    if (!email.endsWith("@noroff.no") && !email.endsWith("@stud.noroff.no")) {
      handleError(new Error("Email must be a Noroff student or staff email."));
      return;
    }

    try {
      const result = await request("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      showSuccessMessage("Success! You have registered an account.");
      console.log("Success:", result); // remove after development
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="pt-28">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        minLength={2}
        maxLength={20}
        required
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        maxLength={40}
        required
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        minLength={8}
        maxLength={20}
        required
        value={formData.password}
        onChange={handleChange}
      />
      <label>
        <input
          type="checkbox"
          name="venueManager"
          checked={formData.venueManager}
          onChange={handleChange}
        />
        Register as a venue manager
      </label>
      <button disabled={isLoading} className="cursor-pointer">
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
