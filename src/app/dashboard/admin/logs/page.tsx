"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Download,
  Calendar,
  Filter,
  Bot,
  AlertCircle,
} from "lucide-react";
import { LineChart } from "@/components/ui/line-chart";
import { DashboardWrapper } from "../../component/dashboard-wrapper";

export default function AIUsageLogsPage() {
  // Sample data for the line chart
  const usageData = {
    data: [
      {
        name: "AI Requests",
        values: [
          { x: "Mon", y: 1245 },
          { x: "Tue", y: 1530 },
          { x: "Wed", y: 1350 },
          { x: "Thu", y: 1420 },
          { x: "Fri", y: 1650 },
          { x: "Sat", y: 1100 },
          { x: "Sun", y: 950 },
        ],
      },
    ],
  };

  return (
    <DashboardWrapper userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Usage Logs</h1>
            <p className="text-muted-foreground">
              Monitor and analyze AI model usage across the platform
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Logs
          </Button>
        </div>

        {/* Usage Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-green-700 dark:text-green-500">
              Usage Overview
            </CardTitle>
            <CardDescription>AI requests over the past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={usageData.data}
              valueFormatter={(value) => value.toString()}
              colors={["stroke-green-500"]}
            />
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs by user, model, or query..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </div>

        {/* Tabs for different log types */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Logs</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
            <TabsTrigger value="warnings">Warnings</TabsTrigger>
            <TabsTrigger value="flagged">Flagged Content</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableCaption>AI usage logs for the past 7 days</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Request Type</TableHead>
                      <TableHead>Tokens</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Latency</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        timestamp: "2023-11-15 14:32:45",
                        user: "john.smith@example.com",
                        model: "gpt-4o",
                        requestType: "Text Generation",
                        tokens: 1245,
                        status: "success",
                        latency: "1.2s",
                      },
                      {
                        timestamp: "2023-11-15 14:28:12",
                        user: "maria.r@example.com",
                        model: "gpt-4o",
                        requestType: "Image Analysis",
                        tokens: 876,
                        status: "success",
                        latency: "2.5s",
                      },
                      {
                        timestamp: "2023-11-15 14:15:33",
                        user: "ahmed.k@example.com",
                        model: "gpt-4o",
                        requestType: "Text Generation",
                        tokens: 2134,
                        status: "warning",
                        latency: "3.8s",
                      },
                      {
                        timestamp: "2023-11-15 13:52:19",
                        user: "sarah.j@example.com",
                        model: "gpt-4o",
                        requestType: "Data Analysis",
                        tokens: 3421,
                        status: "error",
                        latency: "5.2s",
                      },
                      {
                        timestamp: "2023-11-15 13:45:07",
                        user: "michael.c@example.com",
                        model: "gpt-4o",
                        requestType: "Text Generation",
                        tokens: 987,
                        status: "flagged",
                        latency: "1.8s",
                      },
                      {
                        timestamp: "2023-11-15 13:30:22",
                        user: "priya.s@example.com",
                        model: "gpt-4o",
                        requestType: "Image Analysis",
                        tokens: 1532,
                        status: "success",
                        latency: "2.1s",
                      },
                      {
                        timestamp: "2023-11-15 13:22:51",
                        user: "carlos.m@example.com",
                        model: "gpt-4o",
                        requestType: "Text Generation",
                        tokens: 654,
                        status: "success",
                        latency: "0.9s",
                      },
                    ].map((log, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-mono text-xs">
                          {log.timestamp}
                        </TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.model}</TableCell>
                        <TableCell>{log.requestType}</TableCell>
                        <TableCell>{log.tokens}</TableCell>
                        <TableCell>
                          {log.status === "success" && (
                            <Badge className="bg-green-500">Success</Badge>
                          )}
                          {log.status === "warning" && (
                            <Badge className="bg-amber-500">Warning</Badge>
                          )}
                          {log.status === "error" && (
                            <Badge className="bg-red-500">Error</Badge>
                          )}
                          {log.status === "flagged" && (
                            <Badge className="bg-purple-500">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Flagged
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{log.latency}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="errors" className="mt-4">
            <Card className="p-8 text-center text-gray-500">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <p className="text-lg font-medium mb-2">
                Error logs will appear here
              </p>
              <p>Filter to view only error logs from AI model requests</p>
            </Card>
          </TabsContent>
          <TabsContent value="warnings" className="mt-4">
            <Card className="p-8 text-center text-gray-500">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-amber-500" />
              <p className="text-lg font-medium mb-2">
                Warning logs will appear here
              </p>
              <p>Filter to view only warning logs from AI model requests</p>
            </Card>
          </TabsContent>
          <TabsContent value="flagged" className="mt-4">
            <Card className="p-8 text-center text-gray-500">
              <Bot className="h-12 w-12 mx-auto mb-4 text-purple-500" />
              <p className="text-lg font-medium mb-2">
                Flagged content logs will appear here
              </p>
              <p>
                View AI responses that were flagged for content policy
                violations
              </p>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Usage Statistics */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Model Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>GPT-4o</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "78%" }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Claude 3</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "15%" }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Llama 3</span>
                  <span className="font-medium">7%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: "7%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Request Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Text Generation</span>
                  <span className="font-medium">62%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "62%" }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Image Analysis</span>
                  <span className="font-medium">24%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "24%" }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Data Analysis</span>
                  <span className="font-medium">14%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: "14%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Response Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Success</span>
                  <span className="font-medium">94.2%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "94.2%" }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Warnings</span>
                  <span className="font-medium">3.5%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: "3.5%" }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Errors</span>
                  <span className="font-medium">2.3%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: "2.3%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardWrapper>
  );
}
