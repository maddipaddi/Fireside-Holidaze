import { useState } from "react";

/**
 * About page component for Holidaze.
 *
 * Renders information about the Holidaze platform and a contact form for users to get in touch.
 * Handles form state, submission, and displays a confirmation message upon successful submission.
 *
 * @component
 * @returns {JSX.Element} The rendered About page with platform information and a contact form.
 */

export default function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <>
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
            exploring new places, and the great outdoors. We wanted to build a
            modern platform that's simple, safe, and built with heart.
          </p>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-4 pb-16 text-copy dark:text-white">
        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-copy dark:bg-primary p-6 rounded-lg shadow-lg"
        >
          <div className="bg-offwhite dark:bg-background p-4 rounded mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold font-body text-copy dark:text-copy mb-1"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
            />
          </div>
          <div className="bg-offwhite dark:bg-background p-4 rounded mb-4">
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
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@noroff.no"
              className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
            />
          </div>
          <div className="bg-offwhite dark:bg-background p-4 rounded mb-6">
            <label
              htmlFor="message"
              className="block text-sm font-semibold font-body text-copy dark:text-copy mb-1"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              className="font-body w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-copy dark:bg-white dark:text-copy"
            ></textarea>
          </div>
          <div className="bg-primary dark:bg-background p-4 text-center -mx-6 -mb-6 rounded-b-lg">
            <button
              type="submit"
              className="bg-background dark:bg-primary text-copy dark:text-white font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer"
            >
              Send Message
            </button>
          </div>
        </form>
        {submitted && (
          <div
            role="status"
            aria-live="polite"
            className="mt-4 p-4 bg-copy  text-white dark:bg-background dark:text-copy rounded shadow text-sm transition-all font-body"
          >
            Your message has been sent! We will get back to you soon.
          </div>
        )}
      </section>
    </>
  );
}
