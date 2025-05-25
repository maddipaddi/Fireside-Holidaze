import { Helmet } from "react-helmet-async";

export default function Terms() {
  const terms = [
    {
      id: "eligibility",
      title: "1. User Eligibility",
      content:
        "You must be at least 18 years old to create an account on Holidaze. By using our platform, you confirm that you meet this requirement and are capable of entering into a legally binding agreement.",
    },
    {
      id: "booking",
      title: "2. Booking and Cancellations",
      content:
        "Bookings are made directly between guests and hosts. Each host sets their own cancellation policy, which will be visible before you complete a booking. Please review it carefully before confirming your stay.",
    },
    {
      id: "payments",
      title: "3. Payments",
      content:
        "Holidaze uses secure third-party payment providers. We do not store your credit card information. All prices include applicable taxes unless otherwise stated.",
    },
    {
      id: "hosting",
      title: "4. Hosting Responsibilities",
      content:
        "As a host, you agree to provide accurate listing information, honor confirmed bookings, and ensure that your property is safe and clean for guests. You are responsible for complying with local laws and regulations.",
    },
    {
      id: "conduct",
      title: "5. User Conduct",
      content:
        "You agree not to use Holidaze for any unlawful or harmful purposes. This includes harassment, discrimination, or the use of fake accounts. Violations may result in account suspension or removal.",
    },
    {
      id: "liability",
      title: "6. Liability Disclaimer",
      content:
        "Holidaze is not responsible for any injuries, damages, or losses during a stay. We act only as a platform connecting guests and hosts. Users agree to use the service at their own risk.",
    },
    {
      id: "changes",
      title: "7. Changes to Terms",
      content:
        "We may update these terms from time to time. If we make significant changes, we'll notify users via email or through the platform.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Terms and Conditions | Holidaze</title>
        <meta name="description" content="Read our terms and conditions." />
        <meta
          property="og:title"
          content="Fireside Holidaze - Terms and Conditions"
        />
        <meta
          property="og:description"
          content="Read our terms and conditions."
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
      <section className="max-w-3xl mx-auto px-4 pt-28 pb-16 text-copy dark:text-white font-body">
        <h1 className="text-3xl font-bold font-heading mb-6">
          Terms and Conditions
        </h1>

        <p className="mb-6">
          Please read these terms carefully before using Holidaze. By accessing
          or using our platform, you agree to be bound by these terms.
        </p>

        <div className="space-y-4">
          {terms.map((term) => (
            <details
              key={term.id}
              className="bg-white dark:bg-background p-4 rounded shadow"
              aria-labelledby={`${term.id}-heading`}
            >
              <summary
                className="cursor-pointer font-semibold dark:text-copy focus:outline-none focus:ring"
                aria-controls={`${term.id}-content`}
                aria-expanded="false"
                role="button"
              >
                <h2 id={`${term.id}-heading`} className="text-lg font-semibold">
                  {term.title}
                </h2>
              </summary>
              <div
                id={`${term.id}-content`}
                className="mt-2 text-sm dark:text-copy"
              >
                <p>{term.content}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
