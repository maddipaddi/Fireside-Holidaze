import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest.mjs";
import { showSuccessMessage } from "../../utils/successMessage.mjs";
import { handleError } from "../../utils/errorHandler.mjs";
import { UserContext } from "../../components/context/UserContext";
import { PROFILE, REGISTER, LOGIN } from "../../utils/constants.mjs";
import { Helmet } from "react-helmet-async";
import RegisterForm from "./RegisterForm";

/**
 * Register component renders a registration form for new users.
 *
 * Features:
 * - Collects user name, email, password, and venue manager status.
 * - Validates that the email ends with "@noroff.no" or "@stud.noroff.no".
 * - Submits registration data to the Noroff API.
 * - Displays loading state and success/error messages.
 * - Navigates to the home page upon successful registration.
 *
 * @component
 * @returns {JSX.Element} The registration form UI.
 */

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    venueManager: false,
  });

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { request, isLoading } = useApiRequest();

  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const email = formData.email.toLowerCase();

    if (!email.endsWith("@noroff.no") && !email.endsWith("@stud.noroff.no")) {
      handleError(new Error("Email must be a Noroff student or staff email."));
      return;
    }

    try {
      await request(`${REGISTER}`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const loginResponse = await request(`${LOGIN}`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: formData.password,
        }),
      });

      const token = loginResponse.data.accessToken;
      localStorage.setItem("accessToken", token);
      const name = loginResponse.data.name;

      const profileResponse = await request(`${PROFILE}/${name}`);
      const fullProfile = profileResponse.data;

      const fullUser = {
        ...fullProfile,
        accessToken: token,
      };

      setUser(fullUser);
      localStorage.setItem("user", JSON.stringify(fullUser));

      showSuccessMessage("Success! You are now registered and logged in.");
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <>
      <Helmet>
        <title>Register | Holidaze</title>
        <meta
          name="description"
          content="Register an account with us to start hosting or booking cabins."
        />
        <meta property="og:title" content="Fireside Holidaze - Register" />
        <meta
          property="og:description"
          content="Register an account with us to start hosting or booking cabins."
        />
        <meta
          property="og:image"
          content="https://fireside-holidaze.netlify.app/assets/zachary-kyra-derksen-unsplash.jpg"
        />
        <meta
          property="og:url"
          content="https://fireside-holidaze.netlify.app/"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <RegisterForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
}
