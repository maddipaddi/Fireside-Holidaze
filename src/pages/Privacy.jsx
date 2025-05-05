export default function Privacy() {
  const policies = [
    {
      id: "data-collection",
      title: "1. What Data We Collect",
      content:
        "We collect basic information you provide during registration, such as your name, email address, and optional profile details. We also collect booking and listing information you create on the Holidaze platform.",
    },
    {
      id: "how-we-use",
      title: "2. How We Use Your Data",
      content:
        "Your data is used to provide and improve our services — including managing bookings, communicating with you, personalizing your experience, and preventing fraud.",
    },
    {
      id: "sharing",
      title: "3. Sharing with Third Parties",
      content:
        "We do not sell your personal data. We may share data with third-party providers that help us operate the platform (such as payment processors or email services), always in compliance with data protection laws.",
    },
    {
      id: "cookies",
      title: "4. Cookies and Tracking",
      content:
        "We use cookies to enhance your experience and analyze site usage. You can manage cookie preferences in your browser settings. Disabling cookies may affect how certain features function.",
    },
    {
      id: "data-rights",
      title: "5. Your Rights",
      content:
        "You have the right to access, update, or delete your personal data. You can do this by logging into your Holidaze account or contacting us directly.",
    },
    {
      id: "security",
      title: "6. Data Security",
      content:
        "We implement security measures to protect your data, including encryption and secure storage. However, no system is completely secure, and we encourage you to take precautions as well.",
    },
    {
      id: "changes",
      title: "7. Changes to This Policy",
      content:
        "We may update this privacy policy to reflect changes to our practices. Any significant changes will be communicated via the platform or email.",
    },
  ];

  return (
    <section className="max-w-3xl mx-auto px-4 pt-28 pb-16 text-copy dark:text-white font-body">
      <h1 className="text-3xl font-bold font-heading mb-6">Privacy Policy</h1>
      <p className="mb-6">
        At Holidaze, we are committed to protecting your privacy. This policy
        explains what information we collect, how we use it, and your rights
        regarding your personal data.
      </p>
      ,,,
      <div className="space-y-4">
        {policies.map((item) => (
          <details
            key={item.id}
            className="bg-white dark:bg-background p-4 rounded shadow"
            aria-labelledby={`${item.id}-heading`}
          >
            <summary
              className="cursor-pointer font-semibold dark:text-copy focus:outline-none focus:ring"
              aria-controls={`${item.id}-content`}
              aria-expanded="false"
              role="button"
            >
              <h2 id={`${item.id}-heading`} className="text-lg font-semibold">
                {item.title}
              </h2>
            </summary>
            <div
              id={`${item.id}-content`}
              className="mt-2 text-sm dark:text-copy"
            >
              <p>{item.content}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
