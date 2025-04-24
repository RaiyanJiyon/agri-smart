import React from "react";

const FeaturesStats = () => {
  return (
    <div className="bg-white dark:bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { value: "35%", label: "Yield Increase" },
            { value: "40%", label: "Water Savings" },
            { value: "28%", label: "Cost Reduction" },
            { value: "10,000+", label: "Farmers Worldwide" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg border border-green-100 dark:border-green-900/30 bg-white dark:bg-background shadow-sm"
            >
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesStats;
