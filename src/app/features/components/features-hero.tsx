import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

const FeaturesHero = () => {
  return (
    <div className="relative bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background py-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1600')] opacity-10 bg-cover bg-center" />
      </div>
      <div className="container relative mx-auto px-4 py-12 text-center">
        <div className="inline-block p-2 px-4 mb-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-medium text-sm">
          Powered by Advanced AI Technology
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-green-800 dark:text-green-400 leading-tight">
          Smart Features for <br className="hidden md:block" />
          <span className="text-green-600 dark:text-green-300">
            Modern Farming
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          Discover how our AI-powered platform can revolutionize your farming
          practices and increase your yields by up to 35%
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950"
          >
            Book a Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesHero;
