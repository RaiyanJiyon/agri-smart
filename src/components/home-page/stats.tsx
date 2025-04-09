import React from "react";

const Stats = () => {
  // Array of stat data
  const stats = [
    {
      value: "10,000+",
      label: "Farmers Using AgriSmart",
    },
    {
      value: "25%",
      label: "Average Yield Increase",
    },
    {
      value: "30%",
      label: "Water Usage Reduction",
    },
    {
      value: "15+",
      label: "Countries Served",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Grid of Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[hsl(var(--green-600))]">
                {value}
              </p>
              <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;