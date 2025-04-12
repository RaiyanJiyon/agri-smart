import { CurrentWeather, ForecastData } from "../types";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export const fetchCurrentWeather = async (city: string): Promise<CurrentWeather> => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch current weather");
    return res.json();
  };
  
  export const fetchForecast = async (city: string): Promise<ForecastData> => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch forecast");
    return res.json();
  };