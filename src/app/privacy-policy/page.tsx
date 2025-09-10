export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-400">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Your privacy matters to us. This policy describes how AgriSmart collects, uses, and protects your information.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-500">Information We Collect</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We may collect personal information such as your name, email address, location, and usage data to provide and improve our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-500">How We Use Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>To deliver AI-powered recommendations and insights</li>
            <li>To personalize your experience and content</li>
            <li>To improve our platform and develop new features</li>
            <li>To communicate updates, security alerts, and support messages</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-500">Data Sharing and Security</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We do not sell your personal information. We may share data with trusted providers to operate our services. We apply industry-standard security measures to protect your data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-500">Your Rights</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Depending on your region, you may have rights to access, correct, or delete your data. Contact us to exercise your rights.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-500">Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300">
            If you have questions about this policy, please reach out at support@agrismart.example.
          </p>
        </section>
      </div>
    </div>
  );
}
