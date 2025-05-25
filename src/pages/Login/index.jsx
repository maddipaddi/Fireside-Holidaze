import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HelmetMeta } from "./loginMeta";
import LoginForm from "./LoginForm";
import { useApiRequest } from "../../hooks/useApiRequest.mjs";
import { showSuccessMessage } from "../../utils/successMessage.mjs";
import { handleError } from "../../utils/errorHandler.mjs";
import { LOGIN, PROFILE } from "../../utils/constants.mjs";
import { UserContext } from "../../components/context/UserContext";
import { apiRequest } from "../../utils/api.mjs";

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
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { request, isLoading } = useApiRequest();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const result = await request(`${LOGIN}`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const token = result.data.accessToken;
      const name = result.data.name;
      localStorage.setItem("accessToken", token);

      const profileResponse = await apiRequest(`${PROFILE}/${name}`);
      const fullUser = {
        ...profileResponse.data,
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
    <>
      <HelmetMeta />
      <LoginForm
        formData={formData}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
