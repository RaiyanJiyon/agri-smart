// Current Weather Response Type
export interface CurrentWeather {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

// Forecast Data Type
export interface ForecastData {
  list: Array<{
    dt_txt: string; // Date and time in "YYYY-MM-DD HH:mm:ss" format
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
      description: string;
    }>;
  }>;
}

// Processed Forecast Data Type
export interface ProcessedForecast {
  date: string;
  temp: number;
  description: string;
}

// Define the type for a resource
export interface Resource {
  _id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  thumbnail: string;
  author: string;
  authorRole?: string;
  datePublished: string;
  readTime?: string;
  videoLength?: string;
  featured?: boolean;
  popular?: boolean;
  tags: string[];
  url: string;
  previewContent?: string;
}
