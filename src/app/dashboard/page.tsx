"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, Upload, Droplets } from "lucide-react";
import WeatherWidget from "@/app/dashboard/components/weather-widget";
import CropRecommendationForm from "@/app/dashboard/components/crop-recommendation-form";
import FarmMetricsChart from "@/app/dashboard/components/farm-metrics-chart";
import DiseaseDetectionUpload from "@/app/dashboard/components/disease-detection-upload";
import Alert from "@/app/dashboard/components/alert";
import { useEffect, useState } from "react";
import {
  fetchCurrentWeather,
  fetchForecast,
} from "@/lib/services/weatherService";
import { CurrentWeather, ProcessedForecast } from "@/lib/types";
import { processForecastData } from "@/lib/utils/weatherUtils";
import Loading from "../loading";
import RecentActivity from "./components/recent-activity";
import TaskScheduler from "./components/task-scheduler";

export default function DashboardPage() {
  const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null);
  const [forecastData, setForecastData] = useState<ProcessedForecast[]>([]);
  const [setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const city = "Cherrapunji";

      try {
        // Fetch current weather
        const currentWeather = await fetchCurrentWeather(city);
        setWeatherData(currentWeather);

        // Fetch forecast
        const forecast = await fetchForecast(city);
        const processedForecast = processForecastData(forecast.list);
        setForecastData(processedForecast);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Fetch every 60 seconds
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [setError]);

  // Function to determine if an alert should be shown
  const getAlert = (): { title: string; description: string } | null => {
    if (!forecastData.length) return null;

    const hasHeavyRainfall = forecastData.some(
      (day) => day.description.toLowerCase().includes("rain") && day.temp < 20
    );

    if (hasHeavyRainfall) {
      return {
        title: "Weather Alert",
        description:
          "Heavy rainfall expected in your region over the next 48 hours. Consider adjusting your irrigation schedule.",
      };
    }

    return null;
  };

  const alert = getAlert();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--green-700))] dark:text-[hsl(var(--green-500))]">
            Farm Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back! Here&apos;s your farm at a glance
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button
            size="sm"
            className="bg-[hsl(var(--green-600))] hover:bg-[hsl(var(--green-700))]"
          >
            <Droplets className="h-4 w-4 mr-2" />
            Irrigation Control
          </Button>
        </div>
      </div>

      {/* Alert Section */}
      {alert && <Alert title={alert.title} description={alert.description} />}

      {/* Weather Widget */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {weatherData && forecastData.length ? (
          <WeatherWidget
            weatherData={weatherData}
            forecastData={forecastData}
          />
        ) : (
          <Loading />
        )}

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-green-700 dark:text-green-500">
              Crop Health Index
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <FarmMetricsChart />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="crops" className="w-full mb-8">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="crops">Crop Planning</TabsTrigger>
          <TabsTrigger value="disease">Disease Detection</TabsTrigger>
          <TabsTrigger value="market">Market Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="crops">
          <CropRecommendationForm />
        </TabsContent>

        <TabsContent value="disease">
          <DiseaseDetectionUpload />
        </TabsContent>

        <TabsContent value="market">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-500">
                Market Price Forecast
              </CardTitle>
              <CardDescription>
                Predicted prices for the next 3 months based on historical data
                and market trends
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="h-full flex items-center justify-center text-gray-500">
                <BarChart className="h-16 w-16 opacity-50" />
                <p className="ml-4">Market price chart will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <RecentActivity />

        {/* Task Scheduler */}
        <TaskScheduler />
      </div>
    </div>
  );
}
