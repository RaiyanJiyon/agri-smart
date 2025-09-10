export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-400">
            Cookie Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            This policy explains how AgriSmart uses cookies and similar technologies to improve your experience.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-500">What Are Cookies?</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Cookies are small text files stored on your device to help websites function and remember preferences.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-500">How We Use Cookies</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Essential cookies for core site functionality</li>
            <li>Analytics to understand usage and improve performance</li>
            <li>Preferences to remember settings like language or theme</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-500">Managing Cookies</h2>
          <p className="text-gray-700 dark:text-gray-300">
            You can control cookies through your browser settings. Disabling cookies may affect some features of the site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-500">Contact</h2>
          <p className="text-gray-700 dark:text-gray-300">
            If you have questions about this policy, contact us at privacy@agrismart.example.
          </p>
        </section>
      </div>
    </div>
  );
}
