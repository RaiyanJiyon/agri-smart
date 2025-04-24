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

// Type definitions
type TabColor = "green" | "red" | "blue" | "orange" | "indigo";

interface TabContentBase {
  title: string;
  description: string;
  features: string[];
  icon?: React.ComponentType<{ className?: string }>;
}

interface TabData {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: TabColor;
  reverse?: boolean;
  content: TabContentBase;
}

// Tab data with only banner portions
const tabData: TabData[] = [
  {
    value: "crop",
    label: "Crop Planning",
    icon: Leaf,
    color: "green",
    content: {
      title: "AI-Based Crop Recommendation System",
      description:
        "Our advanced AI analyzes your soil composition, local climate patterns, historical yield data, and current market trends to recommend the most profitable and sustainable crops for your specific conditions.",
      features: [
        "Soil-specific crop recommendations",
        "Climate-adapted variety selection",
        "Profit potential forecasting",
        "Seasonal planning optimization",
        "Crop rotation suggestions",
      ],
    },
  },
  {
    value: "disease",
    label: "Disease Detection",
    icon: CloudRain,
    color: "red",
    reverse: true,
    content: {
      title: "Plant Disease Detection",
      description:
        "Simply upload photos of your plants, and our AI will instantly identify diseases, pests, or nutrient deficiencies with detailed treatment recommendations. Early detection can save entire harvests and reduce chemical usage.",
      features: [
        "98% accuracy in disease identification",
        "Treatment recommendations based on severity",
        "Works with 120+ crop varieties",
        "Offline mode for field use",
        "Historical tracking of field health",
      ],
    },
  },
  {
    value: "weather",
    label: "Weather & Irrigation",
    icon: Droplets,
    color: "blue",
    content: {
      title: "AI-Powered Weather Forecasting",
      description:
        "Get hyperlocal weather predictions specifically calibrated for agricultural planning. Our AI model combines multiple data sources for accuracy beyond standard forecasts, helping you make critical farming decisions.",
      features: [
        "Field-specific microclimate predictions",
        "10-day detailed agricultural forecasts",
        "Frost and extreme weather alerts",
        "Historical weather pattern analysis",
        "Weather-based task recommendations",
      ],
    },
  },
  {
    value: "market",
    label: "Market Insights",
    icon: TrendingUp,
    color: "orange",
    content: {
      title: "Market Price Prediction",
      description:
        "Our AI analyzes market trends, supply chains, and demand patterns to forecast crop prices, helping you time your harvests and sales for maximum profit. Make informed decisions about what to grow and when to sell.",
      features: [
        "Price forecasts for 50+ agricultural commodities",
        "Regional market analysis",
        "Supply and demand trend visualization",
        "Export market opportunities",
        "Price alert notifications",
      ],
    },
  },
  {
    value: "community",
    label: "Community",
    icon: Users,
    color: "indigo",
    content: {
      title: "AI Chatbot for Support",
      description:
        "Get instant answers to your farming questions 24/7. Our specialized agricultural chatbot understands farming terminology and provides actionable advice based on the latest research and best practices.",
      features: [
        "24/7 instant agricultural support",
        "Trained on 1000+ agricultural publications",
        "Pest and disease identification assistance",
        "Step-by-step troubleshooting guides",
        "Multilingual support in 12 languages",
      ],
    },
  },
  {
    value: "marketplace",
    label: "Marketplace",
    icon: ShoppingCart,
    color: "green",
    content: {
      title: "Agricultural Marketplace",
      description:
        "Buy and sell agricultural products directly on our platform. Connect with local and global suppliers and customers to expand your market reach and eliminate middlemen to increase your profits.",
      features: [
        "Direct farmer-to-consumer sales",
        "Verified supplier network",
        "Local and international market access",
        "Quality assurance standards",
        "Transparent pricing and reviews",
      ],
    },
  },
];

const FeatureList = ({
  features,
  color,
}: {
  features: string[];
  color: TabColor;
}) => (
  <ul className="space-y-3 mb-6">
    {features.map((item, i) => (
      <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
        <CheckCircle2
          className={`h-5 w-5 text-${color}-500 mr-2 flex-shrink-0 mt-0.5`}
        />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const TabContent = ({ tab }: { tab: TabData }) => (
  <TabsContent value={tab.value} className="space-y-12">
    <div
      className={`grid md:grid-cols-2 gap-12 items-center ${
        tab.reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className={tab.reverse ? "order-2 md:order-1" : ""}>
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${tab.color}-100 dark:bg-${tab.color}-900/30 text-${tab.color}-800 dark:text-${tab.color}-300 mb-4`}
        >
          <tab.icon className="h-4 w-4 mr-2" />
          {tab.label}
        </div>
        <h3 className="text-3xl font-bold mb-4 text-green-800 dark:text-green-400">
          {tab.content.title}
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {tab.content.description}
        </p>
        <FeatureList features={tab.content.features} color={tab.color} />
        <Button className={`bg-${tab.color}-600 hover:bg-${tab.color}-700`}>
          Learn More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div
        className={`relative rounded-xl overflow-hidden shadow-xl ${
          tab.reverse ? "order-1 md:order-2" : ""
        }`}
      >
        <div className="aspect-[4/3] bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center" />
      </div>
    </div>
  </TabsContent>
);

export function ServicesTabs() {
  return (
    <Tabs defaultValue="crop" className="w-full">
      <div className="overflow-x-auto pb-4">
        <TabsList className="flex w-max min-w-full md:w-fit mx-auto p-1 bg-green-50 dark:bg-green-900/20 rounded-full mb-12">
          {tabData.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-6 py-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabData.map((tab) => (
        <TabContent key={tab.value} tab={tab} />
      ))}
    </Tabs>
  );
}
