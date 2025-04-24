import type React from "react";
import { CheckCircle2 } from 'lucide-react';
import FeaturesHero from "./components/features-hero";
import FeaturesStats from "./components/features-stats";
import AdditionalFeatures from "./components/additional-features";
import { ServicesTabs } from "./components/services-tabs";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <FeaturesHero />

      {/* Stats Section */}
      <FeaturesStats />

      {/* Main Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800 dark:text-green-400">
            Comprehensive Features
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Our platform offers a complete suite of tools designed specifically
            for agricultural success in the digital age
          </p>
        </div>

        {/* Service Tabs */}
        <ServicesTabs />
      </div>

      {/* Additional Features Section */}
      <AdditionalFeatures />

      {/* Comparison Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800 dark:text-green-400">
            Why Choose AgriSmart?
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            See how our platform compares to traditional farming methods and other solutions
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-100 dark:bg-green-900/30">
                <th className="p-4 text-left text-green-800 dark:text-green-400 font-bold">Features</th>
                <th className="p-4 text-center text-green-800 dark:text-green-400 font-bold">AgriSmart</th>
                <th className="p-4 text-center text-gray-600 dark:text-gray-300 font-bold">Traditional Methods</th>
                <th className="p-4 text-center text-gray-600 dark:text-gray-300 font-bold">Other Platforms</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: "AI-Powered Recommendations",
                  agrismart: true,
                  traditional: false,
                  others: "Limited",
                },
                {
                  feature: "Real-time Disease Detection",
                  agrismart: true,
                  traditional: false,
                  others: "Some",
                },
                {
                  feature: "Hyperlocal Weather Forecasting",
                  agrismart: true,
                  traditional: false,
                  others: "Basic",
                },
                {
                  feature: "Market Price Predictions",
                  agrismart: true,
                  traditional: false,
                  others: "Limited",
                },
                {
                  feature: "Community Knowledge Sharing",
                  agrismart: true,
                  traditional: "Limited",
                  others: "Some",
                },
                {
                  feature: "Direct Marketplace Access",
                  agrismart: true,
                  traditional: false,
                  others: "Limited",
                },
                {
                  feature: "Offline Functionality",
                  agrismart: true,
                  traditional: true,
                  others: "Rare",
                },
              ].map((row, i) => (
                <tr key={i} className="border-b border-green-100 dark:border-green-900/30">
                  <td className="p-4 text-left font-medium">{row.feature}</td>
                  <td className="p-4 text-center">
                    {row.agrismart === true ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto" />
                    ) : (
                      row.agrismart
                    )}
                  </td>
                  <td className="p-4 text-center text-gray-600 dark:text-gray-300">
                    {row.traditional === true ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto" />
                    ) : row.traditional === false ? (
                      <span className="inline-block h-6 w-6 rounded-full border-2 border-gray-300 mx-auto" />
                    ) : (
                      row.traditional
                    )}
                  </td>
                  <td className="p-4 text-center text-gray-600 dark:text-gray-300">{row.others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

