import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrentWeather, ProcessedForecast } from "@/lib/types";
import { getWeatherIcon } from "@/lib/utils/weatherUtils";
import { Sun, Cloud, CloudRain, Wind, Droplets } from "lucide-react";


interface WeatherWidgetProps {
  weatherData: CurrentWeather;
  forecastData: ProcessedForecast[];
}

export default function WeatherWidget({ weatherData, forecastData }: WeatherWidgetProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-green-700 dark:text-green-500">Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {/* Current Weather */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold">{weatherData?.main?.temp}°C</p>
              <p className="text-gray-500 dark:text-gray-400">
                {weatherData?.weather?.[0]?.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{weatherData?.name}</p>
            </div>
            {getWeatherIcon(weatherData?.weather?.[0]?.main) === "Sun" ? (
              <Sun className="h-16 w-16 text-orange-400" />
            ) : getWeatherIcon(weatherData?.weather?.[0]?.main) === "CloudRain" ? (
              <CloudRain className="h-16 w-16 text-blue-400" />
            ) : (
              <Cloud className="h-16 w-16 text-blue-400" />
            )}
          </div>

          {/* Forecast */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {forecastData.map((day, index) => (
              <div key={index} className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                </p>
                {getWeatherIcon(day.description) === "Sun" ? (
                  <Sun className="h-8 w-8 text-orange-400" />
                ) : getWeatherIcon(day.description) === "CloudRain" ? (
                  <CloudRain className="h-8 w-8 text-blue-400" />
                ) : (
                  <Cloud className="h-8 w-8 text-blue-400" />
                )}
                <p className="text-sm font-medium">{Math.round(day.temp)}°C</p>
              </div>
            ))}
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Wind className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Wind</p>
                <p className="text-sm font-medium">{weatherData?.wind?.speed} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Droplets className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Humidity</p>
                <p className="text-sm font-medium">{weatherData?.main?.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}