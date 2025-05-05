import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest.mjs";
import { showSuccessMessage } from "../utils/successMessage.mjs";
import { handleError } from "../utils/errorHandler.mjs";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const { request, isLoading } = useApiRequest();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const result = await request("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("user", JSON.stringify(result.data));

      showSuccessMessage("Success! You have logged in.");
      console.log("Success:", result); // remove after development
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-copy dark:bg-primary p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-12"
    >
      <div className="bg-white dark:bg-background p-4 rounded mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-semibold font-body text-copy dark:text-copy mb-1"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          maxLength={40}
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="johndoe@noroff.no"
          className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
        />
      </div>
      <div className="bg-white dark:bg-background p-4 rounded mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-semibold font-body text-copy dark:text-copy mb-1"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          minLength={8}
          maxLength={20}
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Type in your password here"
          className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
        />
      </div>
      <div className="bg-primary dark:bg-background p-4 text-center -mx-6 -mb-6 rounded-b-lg">
        <button
          disabled={isLoading}
          className="bg-background dark:bg-primary text-copy dark:text-white font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </div>
    </form>
  );
}
