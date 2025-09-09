"use client"

import React from "react";
import CountUp from "react-countup";

const Stats = () => {
  // Array of stat data
  const stats = [
    {
      value: 10000,
      label: "Farmers Using AgriSmart",
      suffix: "+",
    },
    {
      value: 25,
      label: "Average Yield Increase",
      suffix: "%",
    },
    {
      value: 30,
      label: "Water Usage Reduction",
      suffix: "%",
    },
    {
      value: 15,
      label: "Countries Served",
      suffix: "+",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Grid of Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map(({ value, label, suffix }, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[hsl(var(--green-600))]">
                <CountUp
                  start={0}
                  end={value}
                  duration={5}
                  separator=","
                  suffix={suffix}
                />
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