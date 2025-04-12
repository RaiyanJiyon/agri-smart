import { ForecastData, ProcessedForecast } from "../types";

export const processForecastData = (forecastList: ForecastData["list"]): ProcessedForecast[] => {
  const groupedData: Record<string, typeof forecastList> = {};

  forecastList.forEach((item) => {
    const date = item.dt_txt.split(" ")[0]; // Extract date (YYYY-MM-DD)
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(item);
  });

  // Extract one entry per day (e.g., noon or first available)
  const dailyForecast = Object.keys(groupedData).map((date) => {
    const dayData = groupedData[date];
    const middayData = dayData.find((item) => item.dt_txt.includes("12:00:00")) || dayData[0];
    return {
      date,
      temp: middayData.main.temp,
      description: middayData.weather[0].main,
    };
  });

  return dailyForecast.slice(0, 3); // Return only the next 3 days
};

export const getWeatherIcon = (description: string): string => {
  switch (description.toLowerCase()) {
    case "clear":
      return "Sun";
    case "rain":
      return "CloudRain";
    case "clouds":
      return "Cloud";
    default:
      return "Cloud";
  }
};