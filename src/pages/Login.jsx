import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest.mjs";
import { showSuccessMessage } from "../utils/successMessage.mjs";
import { handleError } from "../utils/errorHandler.mjs";
import { LOGIN, PROFILE } from "../utils/constants.mjs";
import { UserContext } from "../components/context/UserContext";
import { apiRequest } from "../utils/api.mjs";

/**
 * Login component renders a login form for user authentication.
 * Handles form state, submission, and user context updates upon successful login.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered login form component.
 *
 * @example
 * // Usage in a route
 * <Route path="/login" element={<Login />} />
 *
 * @function
 *
 * @description
 * - Manages form state for email and password.
 * - Submits credentials to the login API endpoint.
 * - Stores access token and user profile in localStorage and context.
 * - Navigates to the profile page on successful login.
 * - Displays loading state and handles errors.
 */

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { request, isLoading } = useApiRequest();
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const { setUser } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const result = await request(`${LOGIN}`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const token = result.data.accessToken;
      localStorage.setItem("accessToken", token);
      const name = result.data.name;

      const profileResponse = await apiRequest(`${PROFILE}/${name}`);
      const fullProfile = profileResponse.data;

      const fullUser = {
        ...fullProfile,
        accessToken: token,
      };

      setUser(fullUser);
      localStorage.setItem("user", JSON.stringify(fullUser));

      showSuccessMessage("Success! You have logged in.");
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-copy dark:bg-primary p-6 rounded-lg shadow-lg max-w-xs md:max-w-2xl mx-auto mt-18"
    >
      <h1 className="sr-only">Log in</h1>
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
          placeholder="password123"
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
