import { Helmet } from "react-helmet-async";

/**
 * HelmetMeta component sets up SEO and Open Graph meta tags for the Login page.
 *
 * @component
 * @returns {JSX.Element} Meta tags for the Login page, including title, description, and Open Graph properties.
 */

export function HelmetMeta() {
  return (
    <Helmet>
      <title>Login | Holidaze</title>
      <meta
        name="description"
        content="Login to start booking your next adventure or host for others."
      />
      <meta property="og:title" content="Fireside Holidaze - Login" />
      <meta
        property="og:description"
        content="Login to start booking your next adventure or host for others."
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
  );
}
