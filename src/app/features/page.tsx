export const dynamic = "force-static"

import type React from "react";
import FeaturesHero from "./components/features-hero";
import FeaturesStats from "./components/features-stats";
import AdditionalFeatures from "./components/additional-features";
import { ServicesTabs } from "./components/services-tabs";
import FeaturesComparison from "./components/features-comparison";

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
      <FeaturesComparison />
    </div>
  );
}

