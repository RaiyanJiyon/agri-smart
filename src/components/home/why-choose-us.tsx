import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";

const WhyChooseUs = () => {
  // Array of benefit data
  const benefits = [
    {
      icon: <Image src="/leaf.svg" alt="Leaf" width={50} height={50} />,
      title: "AI Crop Planning",
      description:
        "Get personalized crop recommendations based on your soil, climate, and market conditions",
    },
    {
      icon: <Image src="weather.svg" alt="Cloud" width={50} height={50} />,
      title: "Weather Forecasting",
      description:
        "AI-powered weather predictions to plan your farming activities with confidence",
    },
    {
      icon: <Image src="/water.svg" alt="Droplets" width={50} height={50} />,
      title: "Smart Irrigation",
      description:
        "Save water and improve crop health with intelligent irrigation recommendations",
    },
    {
      icon: <Image src="/market.svg" alt="Bar Chart" width={50} height={50} />,
      title: "Market Insights",
      description:
        "Make informed decisions with AI-driven market price predictions and trends",
    },
    {
      icon: <Image src="/ai.svg" alt="Message Square" width={50} height={50} />,
      title: "AI Assistant",
      description:
        "Get instant answers to your farming questions with our specialized chatbot",
    },
    {
      icon: <Image src="/people.svg" alt="Users" width={50} height={50} />,
      title: "Community Support",
      description:
        "Connect with experts and fellow farmers to share knowledge and get help",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[hsl(var(--green-700))] dark:text-[hsl(var(--green-500))]">
            Why Choose AgriSmart?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our AI-powered platform provides comprehensive solutions to help
            farmers make data-driven decisions
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map(({ icon, title, description }, index) => (
            <Card
              key={index}
              className="border-2 border-[hsl(var(--green-100))] dark:border-[hsl(var(--green-900))]/30 shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="mb-4">{icon}</div>
                <CardTitle className="text-xl text-[hsl(var(--green-700))] dark:text-[hsl(var(--green-500))]">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;