import { Helmet } from "react-helmet-async";
import ContactForm from "../../components/Contact";

/**
 * `About` is a page component for Holidaze that provides information about the platform
 * and displays a contact form for user inquiries.
 *
 * It includes structured content about Holidaze's mission and background,
 * and sets SEO metadata for the page using `react-helmet-async`.
 *
 * @component
 * @example
 * return <About />
 *
 * @returns {JSX.Element} A fully rendered About page with static content and a contact form.
 */

export default function About() {
  return (
    <>
      <Helmet>
        <title>About us | Holidaze</title>
        <meta
          name="description"
          content="Holidaze is your trusted cabin rental platform for unique stays
            around the world. Created by a group of passionate travelers who love exploring new places and the great outdoors."
        />
        <meta
          property="og:title"
          content="Fireside Holidaze - Cozy Cabins for Every Season"
        />
        <meta
          property="og:description"
          content="Holidaze is your trusted cabin rental platform for unique stays
            around the world."
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

      <section className="max-w-2xl mx-auto px-4 pt-28 pb-12 text-copy dark:text-white">
        <h1 className="text-3xl font-bold font-heading mb-4">About Holidaze</h1>
        <div className="space-y-4 font-body text-base">
          <p>
            Holidaze is your trusted cabin rental platform for unique stays
            around the world. Whether you're seeking a cozy forest hideaway, a
            cabin by the sea, or a mountain retreat, Holidaze makes it easy to
            find the perfect escape.
          </p>
          <p>
            Our mission is to make cabin getaways accessible, personal, and
            inspiring. We believe in meaningful travel experiences, connecting
            people with nature, and supporting local hosts around the globe.
          </p>
          <p>
            Holidaze was created by a group of passionate travelers who love
            exploring new places and the great outdoors. We wanted to build a
            modern platform that's simple, safe, and built with heart.
          </p>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
