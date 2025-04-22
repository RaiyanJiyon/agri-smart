"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  FileText,
  ImageIcon,
  Database,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Upload,
  Eye,
  BarChart,
} from "lucide-react";
import { DashboardWrapper } from "../../component/dashboard-wrapper";
import { Chart } from "../../component/chart";

export default function DataReviewPage() {
  // Sample data for the chart
  const qualityData = {
    data: [
      {
        name: "Accepted",
        values: [
          { label: "Soil Data", value: 92 },
          { label: "Crop Images", value: 85 },
          { label: "Weather Data", value: 97 },
          { label: "User Reports", value: 78 },
        ],
      },
      {
        name: "Rejected",
        values: [
          { label: "Soil Data", value: 8 },
          { label: "Crop Images", value: 15 },
          { label: "Weather Data", value: 3 },
          { label: "User Reports", value: 22 },
        ],
      },
    ],
  };

  return (
    <DashboardWrapper userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Data Review</h1>
            <p className="text-muted-foreground">
              Review and validate data submissions from users
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 gap-2">
              Export
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 gap-2">
              <Upload className="h-4 w-4" />
              Batch Process
            </Button>
          </div>
        </div>

        {/* Data Quality Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-green-700 dark:text-green-500">
              Data Quality Overview
            </CardTitle>
            <CardDescription>Acceptance rates by data category</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              data={qualityData.data}
              valueFormatter={(value) => `${value}%`}
              colors={["bg-green-500", "bg-red-500"]}
            />
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by data type, user, or date..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </div>

        {/* Tabs for different data types */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Data</TabsTrigger>
            <TabsTrigger value="soil">Soil Data</TabsTrigger>
            <TabsTrigger value="images">Crop Images</TabsTrigger>
            <TabsTrigger value="weather">Weather Data</TabsTrigger>
            <TabsTrigger value="reports">User Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: "DATA-2023-1542",
                  type: "Soil Analysis",
                  user: "john.smith@example.com",
                  submitted: "2 hours ago",
                  status: "pending",
                  icon: <Database className="h-8 w-8 text-blue-500" />,
                  description:
                    "pH, nitrogen, phosphorus, and potassium levels for North Field",
                  completeness: 95,
                },
                {
                  id: "DATA-2023-1541",
                  type: "Crop Image",
                  user: "maria.r@example.com",
                  submitted: "4 hours ago",
                  status: "approved",
                  icon: <ImageIcon className="h-8 w-8 text-green-500" />,
                  description: "Wheat field images for disease detection",
                  completeness: 100,
                },
                {
                  id: "DATA-2023-1540",
                  type: "Weather Data",
                  user: "ahmed.k@example.com",
                  submitted: "Yesterday",
                  status: "pending",
                  icon: <BarChart className="h-8 w-8 text-purple-500" />,
                  description:
                    "Local precipitation and temperature readings for June 2023",
                  completeness: 87,
                },
                {
                  id: "DATA-2023-1539",
                  type: "User Report",
                  user: "sarah.j@example.com",
                  submitted: "Yesterday",
                  status: "rejected",
                  icon: <FileText className="h-8 w-8 text-red-500" />,
                  description: "Crop yield report for 2023 harvest season",
                  completeness: 65,
                },
                {
                  id: "DATA-2023-1538",
                  type: "Soil Analysis",
                  user: "michael.c@example.com",
                  submitted: "2 days ago",
                  status: "approved",
                  icon: <Database className="h-8 w-8 text-blue-500" />,
                  description: "Complete soil nutrient profile for South Field",
                  completeness: 98,
                },
                {
                  id: "DATA-2023-1537",
                  type: "Crop Image",
                  user: "priya.s@example.com",
                  submitted: "2 days ago",
                  status: "pending",
                  icon: <ImageIcon className="h-8 w-8 text-green-500" />,
                  description:
                    "Close-up images of tomato plants showing possible disease symptoms",
                  completeness: 90,
                },
              ].map((data, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Badge variant="outline" className="mb-2">
                        {data.type}
                      </Badge>
                      {data.status === "pending" && (
                        <Badge
                          variant="outline"
                          className="bg-amber-100 text-amber-700 border-amber-200"
                        >
                          Pending Review
                        </Badge>
                      )}
                      {data.status === "approved" && (
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-700 border-green-200"
                        >
                          Approved
                        </Badge>
                      )}
                      {data.status === "rejected" && (
                        <Badge
                          variant="outline"
                          className="bg-red-100 text-red-700 border-red-200"
                        >
                          Rejected
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-muted p-2 rounded-lg">{data.icon}</div>
                      <div>
                        <CardTitle className="text-base">{data.id}</CardTitle>
                        <CardDescription className="text-xs">
                          {data.user}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {data.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Data Completeness</span>
                        <span className="font-medium">
                          {data.completeness}%
                        </span>
                      </div>
                      <Progress value={data.completeness} className="h-1" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Submitted {data.submitted}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="flex justify-between w-full">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        <span>View</span>
                      </Button>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-green-600"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-amber-600"
                        >
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="soil" className="mt-4">
            <Card className="p-8 text-center text-gray-500">
              <Database className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <p className="text-lg font-medium mb-2">
                Soil data submissions will appear here
              </p>
              <p>Filter to view only soil analysis data for review</p>
            </Card>
          </TabsContent>
          <TabsContent value="images" className="mt-4">
            <Card className="p-8 text-center text-gray-500">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p className="text-lg font-medium mb-2">
                Crop image submissions will appear here
              </p>
              <p>Filter to view only crop images for review</p>
            </Card>
          </TabsContent>
          <TabsContent value="weather" className="mt-4">
            <Card className="p-8 text-center text-gray-500">
              <BarChart className="h-12 w-12 mx-auto mb-4 text-purple-500" />
              <p className="text-lg font-medium mb-2">
                Weather data submissions will appear here
              </p>
              <p>Filter to view only weather data for review</p>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="mt-4">
            <Card className="p-8 text-center text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <p className="text-lg font-medium mb-2">
                User report submissions will appear here
              </p>
              <p>Filter to view only user reports for review</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardWrapper>
  );
}
