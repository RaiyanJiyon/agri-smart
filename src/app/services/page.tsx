"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Droplets } from "lucide-react";
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
import AgricultureInsightsTabs from "./components/agriculture-insights-tabs";
import Alert from "./components/alert";
import WeatherWidget from "./components/weather-widget";
import FarmMetricsChart from "./components/farm-metrics-chart";

export default function DashboardPage() {
  const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null);
  const [forecastData, setForecastData] = useState<ProcessedForecast[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const city = "Sylhet";

      try {
        // Fetch current weather
        const currentWeather = await fetchCurrentWeather(city);
        setWeatherData(currentWeather);

        // Fetch forecast
        const forecast = await fetchForecast(city);
        const processedForecast = processForecastData(forecast.list);
        setForecastData(processedForecast);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Fetch every 60 seconds
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

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
            Farm Services
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

      {/* Weather Widget Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {weatherData && forecastData.length ? (
          <WeatherWidget
            weatherData={weatherData}
            forecastData={forecastData}
          />
        ) : (
          <Loading />
        )}

        {/* Crop Health Index Section */}
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

      {/* Agriculture Insights Tabs Section */}
      <AgricultureInsightsTabs />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <RecentActivity />

        {/* Task Scheduler */}
        <TaskScheduler />
      </div>
    </div>
  );
}
