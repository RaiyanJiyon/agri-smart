export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-400">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            These terms govern your use of AgriSmart. Please read them carefully.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-500">Acceptance of Terms</h2>
          <p className="text-gray-700 dark:text-gray-300">
            By accessing or using our platform, you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-500">Use of Service</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Do not misuse the platform or attempt to disrupt our services.</li>
            <li>Respect intellectual property and only upload content you have rights to.</li>
            <li>Comply with all applicable laws and regulations.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-500">Accounts</h2>
          <p className="text-gray-700 dark:text-gray-300">
            You are responsible for maintaining the security of your account and for all activities under it.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-500">Disclaimer</h2>
          <p className="text-gray-700 dark:text-gray-300">
            The platform provides information and recommendations for educational purposes. Results may vary depending on conditions and implementation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-500">Contact</h2>
          <p className="text-gray-700 dark:text-gray-300">
            For any questions about these terms, contact us at legal@agrismart.example.
          </p>
        </section>
      </div>
    </div>
  );
}
