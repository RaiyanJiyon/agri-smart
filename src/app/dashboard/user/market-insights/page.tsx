"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { Info, Calendar, Download } from "lucide-react";
import { useState } from "react";
import { DashboardWrapper } from "../../component/dashboard-wrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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

export default function MarketInsights() {
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [chartType] = useState("line");

  // Get data for the selected crop
  const cropData = marketData[selectedCrop as keyof typeof marketData];

  // Get insight for the selected crop
  const cropInsight = marketInsights.find(
    (insight) => insight.crop.toLowerCase() === selectedCrop.toLowerCase()
  );

  return (
    <DashboardWrapper userRole="user">
      <div className="flex flex-col space-y-6 p-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Market Insights</h2>
          <p className="text-muted-foreground">
            Analyze and forecast agricultural market trends
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 w-full md:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Price Forecast</CardTitle>
                <CardDescription>
                  Predicted prices for the next 3 months based on historical
                  data and market trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <Tabs defaultValue="wheat" onValueChange={setSelectedCrop}>
                    <TabsList>
                      <TabsTrigger value="wheat">Wheat</TabsTrigger>
                      <TabsTrigger value="rice">Rice</TabsTrigger>
                      <TabsTrigger value="corn">Corn</TabsTrigger>
                      <TabsTrigger value="soybeans">Soybeans</TabsTrigger>
                    </TabsList>
                  </Tabs>
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
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke="#16a34a"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
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
                        <Tooltip />
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
          </TabsContent>

          {/* Forecasts Tab */}
          <TabsContent value="forecasts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Forecast Details</CardTitle>
                <CardDescription>
                  View detailed forecasts for each crop
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.keys(marketData).map((crop) => {
                    const insight = marketInsights.find(
                      (item) => item.crop.toLowerCase() === crop.toLowerCase()
                    );
                    return (
                      <div key={crop} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">
                            {crop.charAt(0).toUpperCase() + crop.slice(1)}
                          </h3>
                          <Badge
                            variant={
                              insight?.trend === "up"
                                ? "default"
                                : insight?.trend === "down"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {insight?.change}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {insight?.forecast}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
                <CardDescription>
                  Analyze trends and make informed decisions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketInsights.map((insight) => (
                    <div key={insight.crop} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{insight.crop}</h3>
                        <Badge
                          variant={
                            insight.trend === "up"
                              ? "default"
                              : insight.trend === "down"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {insight.change}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {insight.forecast}
                      </p>
                      <div className="flex justify-end mt-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <span className="sr-only">Open menu</span>
                              <Calendar className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Data
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardWrapper>
  );
}
