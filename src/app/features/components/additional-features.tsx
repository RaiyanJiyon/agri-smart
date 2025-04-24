import React from "react";
import FeatureCard from "./feature-card";
import {
  Award,
  Globe,
  LayoutDashboard,
  PieChart,
  Wifi,
  Zap,
} from "lucide-react";

const AdditionalFeatures = () => {
  return (
    <div className="bg-green-50 dark:bg-green-900/20 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800 dark:text-green-400">
            Additional Features (Upcoming)
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Discover more ways AgriSmart can transform your farming operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<LayoutDashboard className="h-12 w-12 text-green-600" />}
            title="Personalized Dashboard"
            description="All your farm data in one place with customizable charts and reports to track performance and identify trends. Tailor your view to focus on what matters most to your operation."
          />
          <FeatureCard
            icon={<Wifi className="h-12 w-12 text-green-600" />}
            title="Offline Mode"
            description="Access critical information even without internet connectivity. Our Progressive Web App works in remote field locations, syncing data when connection is restored."
          />
          <FeatureCard
            icon={<Globe className="h-12 w-12 text-green-600" />}
            title="Multi-language Support"
            description="Use AgriSmart in your preferred language with support for multiple languages to serve farmers worldwide. Currently available in 12 languages with more being added."
          />
          <FeatureCard
            icon={<Award className="h-12 w-12 text-green-600" />}
            title="Certification Tracking"
            description="Manage organic, fair trade, and other certifications. Track compliance requirements and get reminders for renewal deadlines."
          />
          <FeatureCard
            icon={<Zap className="h-12 w-12 text-green-600" />}
            title="Energy Management"
            description="Monitor and optimize energy usage across your farm. Integrate with solar panels and other renewable energy sources to reduce costs."
          />
          <FeatureCard
            icon={<PieChart className="h-12 w-12 text-green-600" />}
            title="Financial Planning"
            description="Track expenses, revenue, and profitability by crop and field. Generate financial reports and projections for better business planning."
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalFeatures;
