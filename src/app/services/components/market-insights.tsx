"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { useState } from "react";

// Mock data for market prices
const marketData = {
  wheat: [
    { month: "Jan", price: 7.2, forecast: false },
    { month: "Feb", price: 7.4, forecast: false },
    { month: "Mar", price: 7.3, forecast: false },
    { month: "Apr", price: 7.5, forecast: false },
    { month: "May", price: 7.6, forecast: false },
    { month: "Jun", price: 7.8, forecast: true },
    { month: "Jul", price: 8.0, forecast: true },
    { month: "Aug", price: 8.2, forecast: true },
  ],
  rice: [
    { month: "Jan", price: 18.6, forecast: false },
    { month: "Feb", price: 18.5, forecast: false },
    { month: "Mar", price: 18.3, forecast: false },
    { month: "Apr", price: 18.2, forecast: false },
    { month: "May", price: 18.0, forecast: false },
    { month: "Jun", price: 17.8, forecast: true },
    { month: "Jul", price: 17.5, forecast: true },
    { month: "Aug", price: 17.3, forecast: true },
  ],
  corn: [
    { month: "Jan", price: 5.7, forecast: false },
    { month: "Feb", price: 5.8, forecast: false },
    { month: "Mar", price: 5.9, forecast: false },
    { month: "Apr", price: 5.8, forecast: false },
    { month: "May", price: 5.9, forecast: false },
    { month: "Jun", price: 6.0, forecast: true },
    { month: "Jul", price: 6.1, forecast: true },
    { month: "Aug", price: 6.2, forecast: true },
  ],
  soybeans: [
    { month: "Jan", price: 14.0, forecast: false },
    { month: "Feb", price: 14.2, forecast: false },
    { month: "Mar", price: 14.3, forecast: false },
    { month: "Apr", price: 14.5, forecast: false },
    { month: "May", price: 14.7, forecast: false },
    { month: "Jun", price: 14.9, forecast: true },
    { month: "Jul", price: 15.1, forecast: true },
    { month: "Aug", price: 15.3, forecast: true },
  ],
};

// Market insights data
const marketInsights = [
  {
    crop: "Wheat",
    currentPrice: 7.6,
    trend: "up",
    change: "+2.7%",
    forecast: "Rising prices expected due to lower global production forecasts",
  },
  {
    crop: "Rice",
    currentPrice: 18.0,
    trend: "down",
    change: "-3.2%",
    forecast:
      "Prices trending downward due to increased production in major exporting countries",
  },
  {
    crop: "Corn",
    currentPrice: 5.9,
    trend: "stable",
    change: "+1.7%",
    forecast:
      "Markets stabilizing after recent volatility with slight upward trend",
  },
  {
    crop: "Soybeans",
    currentPrice: 14.7,
    trend: "up",
    change: "+5.0%",
    forecast: "Strong demand from Asian markets driving prices up",
  },
];

const MarketInsights = () => {
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [chartType, setChartType] = useState("line");

  // Get data for the selected crop
  const cropData = marketData[selectedCrop as keyof typeof marketData];

  // Get insight for the selected crop
  const cropInsight = marketInsights.find(
    (insight) => insight.crop.toLowerCase() === selectedCrop.toLowerCase()
  );

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isForecast = payload[0].payload.forecast;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border rounded shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-green-600 dark:text-green-400">
            ₹{payload[0].value.toFixed(2)}/kg
          </p>
          {isForecast && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Forecasted price
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-green-700 dark:text-green-500">
              Market Price Forecast
            </CardTitle>
            <CardDescription>
              Predicted prices for the next 3 months based on historical data
              and market trends
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Tabs defaultValue="wheat" onValueChange={setSelectedCrop}>
              <TabsList>
                <TabsTrigger value="wheat">Wheat</TabsTrigger>
                <TabsTrigger value="rice">Rice</TabsTrigger>
                <TabsTrigger value="corn">Corn</TabsTrigger>
                <TabsTrigger value="soybeans">Soybeans</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold">
              ₹{cropInsight?.currentPrice.toFixed(2)}
            </div>
            <Badge
              variant={
                cropInsight?.trend === "down"
                  ? "destructive"
                  : cropInsight?.trend === "up"
                  ? "default"
                  : "outline"
              }
              className={cropInsight?.trend === "up" ? "bg-green-600" : ""}
            >
              {cropInsight?.trend === "up" ? (
                <TrendingUp className="h-3.5 w-3.5 mr-1" />
              ) : cropInsight?.trend === "down" ? (
                <TrendingDown className="h-3.5 w-3.5 mr-1" />
              ) : null}
              {cropInsight?.change}
            </Badge>
            <span className="text-sm text-muted-foreground">per kg</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setChartType("line")}
              className={`px-2 py-1 text-xs rounded ${
                chartType === "line"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`px-2 py-1 text-xs rounded ${
                chartType === "bar"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
              }`}
            >
              Bar
            </button>
          </div>
        </div>

        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart
                data={cropData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="month" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#16a34a"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
              </LineChart>
            ) : (
              <RechartsBarChart
                data={cropData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="month" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="price"
                  fill="#16a34a"
                  fillOpacity={0.8}
                  radius={[4, 4, 0, 0]}
                />
              </RechartsBarChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex items-start gap-2 p-3 bg-muted rounded-lg">
          <Info className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Market Insight:</p>
            <p className="text-sm text-muted-foreground">
              {cropInsight?.forecast}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketInsights;
