import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  // Array of step data
  const steps = [
    {
      number: 1,
      title: "Input Your Farm Data",
      description:
        "Enter details about your soil, climate, and current farming practices through our intuitive interface",
    },
    {
      number: 2,
      title: "AI Analysis",
      description:
        "Our advanced AI models analyze your data along with market trends and environmental factors",
    },
    {
      number: 3,
      title: "Actionable Insights",
      description:
        "Receive personalized recommendations and insights to optimize your farming operations",
    },
  ];

  return (
    <section className="py-20 bg-[hsl(var(--green-50))] dark:bg-[hsl(var(--green-950))]/10">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[hsl(var(--green-700))] dark:text-[hsl(var(--green-500))]">
            How AgriSmart Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our platform simplifies the process of implementing data-driven
            farming practices
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map(({ number, title, description }) => (
            <div
              key={number}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* Step Number */}
              <div className="w-16 h-16 rounded-full bg-[hsl(var(--green-100))] dark:bg-[hsl(var(--green-900))] flex items-center justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--green-600))] text-white flex items-center justify-center text-xl font-bold">
                  {number}
                </div>
              </div>
              {/* Step Title */}
              <h3 className="text-xl font-bold mb-3 text-[hsl(var(--green-700))] dark:text-[hsl(var(--green-500))]">
                {title}
              </h3>
              {/* Step Description */}
              <p className="text-gray-600 dark:text-gray-300">{description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-[hsl(var(--green-600))] hover:bg-[hsl(var(--green-700))]"
          >
            <Link href="/about">
              Learn More About Our Process
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
