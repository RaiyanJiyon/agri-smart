import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Leaf,
  CloudRain,
  Droplets,
  BarChart3,
  MessageSquare,
  TrendingUp,
  Users,
  LayoutDashboard,
  Wifi,
  Globe,
  ShoppingCart,
  CreditCard,
  ShoppingBag,
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-[hsl(var(--green-700))] dark:text-[hsl(var(--green-500))]">
        AgriSmart Features
      </h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
        Discover how our AI-powered platform can revolutionize your farming
        practices
      </p>

      <Tabs defaultValue="crop" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="flex w-max min-w-full md:grid md:grid-cols-6 mb-8">
            <TabsTrigger value="crop">Crop Planning</TabsTrigger>
            <TabsTrigger value="disease">Disease Detection</TabsTrigger>
            <TabsTrigger value="weather">Weather & Irrigation</TabsTrigger>
            <TabsTrigger value="market">Market Insights</TabsTrigger>
            <TabsTrigger value="community">Community & Support</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="crop" className="space-y-8">
          <FeatureCard
            icon={<Leaf className="h-12 w-12 text-green-600" />}
            title="AI-Based Crop Recommendation System"
            description="Our advanced AI analyzes your soil composition, local climate patterns, historical yield data, and current market trends to recommend the most profitable and sustainable crops for your specific conditions."
          />
        </TabsContent>

        <TabsContent value="disease" className="space-y-8">
          <FeatureCard
            icon={<CloudRain className="h-12 w-12 text-red-600" />}
            title="Plant Disease Detection"
            description="Simply upload photos of your plants, and our AI will instantly identify diseases, pests, or nutrient deficiencies with detailed treatment recommendations. Early detection can save entire harvests."
          />
        </TabsContent>

        <TabsContent value="weather" className="space-y-8">
          <FeatureCard
            icon={<CloudRain className="h-12 w-12 text-blue-600" />}
            title="AI-Powered Weather Forecasting"
            description="Get hyperlocal weather predictions specifically calibrated for agricultural planning. Our AI model combines multiple data sources for accuracy beyond standard forecasts."
          />
          <FeatureCard
            icon={<Droplets className="h-12 w-12 text-blue-500" />}
            title="Smart Irrigation"
            description="Connect soil moisture sensors to receive precise irrigation recommendations. Save water, reduce costs, and improve crop health with data-driven watering schedules."
          />
        </TabsContent>

        <TabsContent value="market" className="space-y-8">
          <FeatureCard
            icon={<TrendingUp className="h-12 w-12 text-orange-500" />}
            title="Market Price Prediction"
            description="Our AI analyzes market trends, supply chains, and demand patterns to forecast crop prices, helping you time your harvests and sales for maximum profit."
          />
          <FeatureCard
            icon={<BarChart3 className="h-12 w-12 text-orange-600" />}
            title="Interactive Dashboard"
            description="Visualize all your farm data in one place with customizable charts and reports. Track performance, identify trends, and make data-backed decisions."
          />
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-8">
          <FeatureCard
            icon={<ShoppingCart className="h-12 w-12 text-green-600" />}
            title="Agricultural Marketplace"
            description="Buy and sell agricultural products directly on our platform. Connect with local and global suppliers and customers to expand your market reach."
          />
          <FeatureCard
            icon={<CreditCard className="h-12 w-12 text-green-600" />}
            title="Secure Payment Processing"
            description="Integrated Stripe payment processing ensures safe and reliable transactions. Accept credit cards, bank transfers, and other payment methods with ease."
          />
          <FeatureCard
            icon={<ShoppingBag className="h-12 w-12 text-green-600" />}
            title="Shopping Cart & Order Management"
            description="Easily add products to your cart, manage quantities, and track your orders. Sellers can manage inventory, process orders, and track shipments all in one place."
          />
        </TabsContent>

        <TabsContent value="community" className="space-y-8">
          <FeatureCard
            icon={<MessageSquare className="h-12 w-12 text-purple-600" />}
            title="AI Chatbot for Support"
            description="Get instant answers to your farming questions 24/7. Our specialized agricultural chatbot understands farming terminology and provides actionable advice."
          />
          <FeatureCard
            icon={<Users className="h-12 w-12 text-indigo-500" />}
            title="Community Forum & Expert Help"
            description="Connect with fellow farmers and agricultural experts. Share knowledge, ask questions, and learn from the experiences of others in our moderated community."
          />
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <FeatureCard
          icon={<LayoutDashboard className="h-12 w-12 text-green-600" />}
          title="Personalized Dashboard"
          description="All your farm data in one place with customizable charts and reports to track performance and identify trends."
        />
        <FeatureCard
          icon={<Wifi className="h-12 w-12 text-green-600" />}
          title="Offline Mode"
          description="Access critical information even without internet connectivity. Our Progressive Web App works in remote field locations."
        />
        <FeatureCard
          icon={<Globe className="h-12 w-12 text-green-600" />}
          title="Multi-language Support"
          description="Use AgriSmart in your preferred language with support for multiple languages to serve farmers worldwide."
        />
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-2 border-green-100 dark:border-green-900/30 shadow-md hover:shadow-lg transition-shadow h-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex-shrink-0">{icon}</div>
        <CardTitle className="text-xl text-green-700 dark:text-green-500">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
