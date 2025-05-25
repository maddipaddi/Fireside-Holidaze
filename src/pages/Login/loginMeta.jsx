import { Helmet } from "react-helmet-async";

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
