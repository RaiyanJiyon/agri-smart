"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  CheckCircle2,
  ArrowRight,
  CloudRain,
  TrendingUp,
  ShoppingCart,
  Users,
  Droplets,
} from "lucide-react";
import Image from "next/image";

const services = [
  {
    id: "crop",
    title: "Crop Planning",
    icon: Leaf,
    color: "green",
    content: {
      heading: "AI-Based Crop Recommendation System",
      description: "Our advanced AI analyzes your soil composition, local climate patterns, historical yield data, and current market trends to recommend the most profitable and sustainable crops for your specific conditions.",
      features: [
        "Soil-specific crop recommendations",
        "Climate-adapted variety selection",
        "Profit potential forecasting",
        "Seasonal planning optimization",
        "Crop rotation suggestions",
      ]
    },
    images: "https://i.ibb.co.com/zVJMhZRw/crop-recommendation.png"
  },
  {
    id: "disease",
    title: "Disease Detection",
    icon: CloudRain,
    color: "red",
    reverseLayout: true,
    content: {
      heading: "Plant Disease Detection",
      description: "Simply upload photos of your plants, and our AI will instantly identify diseases, pests, or nutrient deficiencies with detailed treatment recommendations. Early detection can save entire harvests and reduce chemical usage.",
      features: [
        "98% accuracy in disease identification",
        "Treatment recommendations based on severity",
        "Works with 120+ crop varieties",
        "Offline mode for field use",
        "Historical tracking of field health",
      ]
    },
    images: "https://i.ibb.co.com/8LJQ9V2w/disease-detector.png"
  },
  {
    id: "weather",
    title: "Weather & Irrigation",
    icon: Droplets,
    color: "blue",
    content: {
      heading: "AI-Powered Weather Forecasting",
      description: "Get hyperlocal weather predictions specifically calibrated for agricultural planning. Our AI model combines multiple data sources for accuracy beyond standard forecasts, helping you make critical farming decisions.",
      features: [
        "Field-specific microclimate predictions",
        "03-day detailed agricultural forecasts",
        "Frost and extreme weather alerts",
        "Historical weather pattern analysis",
        "Weather-based task recommendations",
      ]
    },
    images: "https://i.ibb.co.com/Q7BrdTt5/weather-update.png"
  },
  {
    id: "market",
    title: "Market Insights",
    icon: TrendingUp,
    color: "orange",
    content: {
      heading: "Market Price Prediction",
      description: "Our AI analyzes market trends, supply chains, and demand patterns to forecast crop prices, helping you time your harvests and sales for maximum profit. Make informed decisions about what to grow and when to sell.",
      features: [
        "Price forecasts for 50+ agricultural commodities",
        "Regional market analysis",
        "Supply and demand trend visualization",
        "Export market opportunities",
        "Price alert notifications",
      ]
    },
    images: "https://i.ibb.co.com/GfvCbSrd/market-insights.png"
  },
  {
    id: "chatbot",
    title: "Ai Assistant",
    icon: Users,
    color: "indigo",
    content: {
      heading: "AI Chatbot for Support",
      description: "Get instant answers to your farming questions 24/7. Our specialized agricultural chatbot understands farming terminology and provides actionable advice based on the latest research and best practices.",
      features: [
        "24/7 instant agricultural support",
        "Trained on 1000+ agricultural publications",
        "Pest and disease identification assistance",
        "Step-by-step troubleshooting guides",
        "Multilingual support in 12 languages",
      ]
    },
    images: "https://i.ibb.co.com/RGvHTcjd/chatbot.png"
  },
  {
    id: "marketplace",
    title: "Marketplace",
    icon: ShoppingCart,
    color: "green",
    content: {
      heading: "Agricultural Marketplace",
      description: "Buy and sell agricultural products directly on our platform. Connect with local and global suppliers and customers to expand your market reach and eliminate middlemen to increase your profits.",
      features: [
        "Direct farmer-to-consumer sales",
        "Verified supplier network",
        "Local and international market access",
        "Quality assurance standards",
        "Transparent pricing and reviews",
      ]
    },
    images: "https://i.ibb.co.com/MxHDztqB/marketplace.png"
  }
];

export function ServicesTabs() {
  return (
    <Tabs defaultValue="crop" className="w-full">
      {/* Tabs Navigation */}
      <div className="overflow-x-auto pb-4">
        <TabsList className="flex w-max min-w-full md:w-fit mx-auto p-1 bg-green-50 dark:bg-green-900/20 rounded-full mb-12">
          {services.map((service) => (
            <TabsTrigger
              key={service.id}
              value={service.id}
              className="px-6 py-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              {service.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* Tabs Content */}
      {services.map((service) => (
        <TabsContent key={service.id} value={service.id} className="space-y-12">
          <div className={`grid md:grid-cols-2 gap-12 items-center ${service.reverseLayout ? "md:flex-row-reverse" : ""}`}>
            {/* Text Content */}
            <div className={service.reverseLayout ? "order-2 md:order-1" : ""}>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${service.color}-100 dark:bg-${service.color}-900/30 text-${service.color}-800 dark:text-${service.color}-300 mb-4`}>
                <service.icon className="h-4 w-4 mr-2" />
                {service.title}
              </div>
              
              <h3 className="text-3xl font-bold mb-4 text-green-800 dark:text-green-400">
                {service.content.heading}
              </h3>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {service.content.description}
              </p>
              
              <ul className="space-y-3 mb-6">
                {service.content.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
                    <CheckCircle2 className={`h-5 w-5 text-${service.color}-500 mr-2 flex-shrink-0 mt-0.5`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className={`bg-${service.color}-600 hover:bg-${service.color}-700`}>
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Image Placeholder */}
            <div className={`relative rounded-xl overflow-hidden shadow-xl ${service.reverseLayout ? "order-1 md:order-2" : ""}`}>
              <Image
              src={service.images}
              alt={`${service.title} image`}
              width={1000}
              height={600}
              />
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}