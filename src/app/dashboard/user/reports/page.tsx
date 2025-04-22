"use client";

import { useState } from "react";
import {
  BarChart,
  FileText,
  Download,
  Calendar,
  Filter,
  Clock,
  ChevronDown,
  Printer,
  Share2,
  FileSpreadsheet,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardWrapper } from "../../component/dashboard-wrapper";

// Sample report data
const recentReports = [
  {
    id: "REP-001",
    name: "Crop Yield Analysis",
    date: "2023-04-15",
    type: "Yield",
    status: "completed",
  },
  {
    id: "REP-002",
    name: "Soil Health Report",
    date: "2023-04-10",
    type: "Soil",
    status: "completed",
  },
  {
    id: "REP-003",
    name: "Water Usage Metrics",
    date: "2023-04-05",
    type: "Water",
    status: "completed",
  },
  {
    id: "REP-004",
    name: "Pest Incident Report",
    date: "2023-03-28",
    type: "Pest",
    status: "completed",
  },
  {
    id: "REP-005",
    name: "Fertilizer Efficiency",
    date: "2023-03-20",
    type: "Fertilizer",
    status: "completed",
  },
];

const scheduledReports = [
  {
    id: "SCH-001",
    name: "Weekly Crop Status",
    frequency: "Weekly",
    nextDate: "2023-04-22",
    recipients: ["me@example.com"],
  },
  {
    id: "SCH-002",
    name: "Monthly Yield Forecast",
    frequency: "Monthly",
    nextDate: "2023-05-01",
    recipients: ["me@example.com", "team@farm.com"],
  },
  {
    id: "SCH-003",
    name: "Quarterly Soil Analysis",
    frequency: "Quarterly",
    nextDate: "2023-07-01",
    recipients: ["me@example.com"],
  },
];

const reportTemplates = [
  {
    id: "TEMP-001",
    name: "Crop Yield Analysis",
    description: "Analyze crop yields across different fields and seasons",
    category: "Yield",
    lastUsed: "2023-04-15",
  },
  {
    id: "TEMP-002",
    name: "Soil Health Assessment",
    description: "Comprehensive soil health metrics and recommendations",
    category: "Soil",
    lastUsed: "2023-04-10",
  },
  {
    id: "TEMP-003",
    name: "Water Usage Report",
    description: "Track water consumption and irrigation efficiency",
    category: "Water",
    lastUsed: "2023-04-05",
  },
  {
    id: "TEMP-004",
    name: "Pest & Disease Tracking",
    description: "Monitor pest incidents and treatment effectiveness",
    category: "Pest",
    lastUsed: "2023-03-28",
  },
  {
    id: "TEMP-005",
    name: "Fertilizer Application Analysis",
    description: "Analyze fertilizer usage and effectiveness",
    category: "Fertilizer",
    lastUsed: "2023-03-20",
  },
  {
    id: "TEMP-006",
    name: "Weather Impact Assessment",
    description: "Evaluate weather patterns and their impact on crops",
    category: "Weather",
    lastUsed: "2023-03-15",
  },
];

export default function ReportsPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  return (
    <DashboardWrapper userRole="user">
      <div className="flex flex-col space-y-6 p-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Generate, view, and manage your agricultural reports
          </p>
        </div>

        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid grid-cols-4 w-full md:w-[600px]">
            <TabsTrigger value="generate">Generate Report</TabsTrigger>
            <TabsTrigger value="recent">Recent Reports</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          {/* Generate Report Tab */}
          <TabsContent value="generate" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Generate New Report</CardTitle>
                <CardDescription>
                  Create a custom report by selecting parameters below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Type</label>
                    <Select defaultValue="yield">
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yield">
                          Crop Yield Analysis
                        </SelectItem>
                        <SelectItem value="soil">Soil Health Report</SelectItem>
                        <SelectItem value="water">
                          Water Usage Metrics
                        </SelectItem>
                        <SelectItem value="pest">
                          Pest Incident Report
                        </SelectItem>
                        <SelectItem value="fertilizer">
                          Fertilizer Efficiency
                        </SelectItem>
                        <SelectItem value="weather">
                          Weather Impact Assessment
                        </SelectItem>
                        <SelectItem value="custom">Custom Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Field/Area</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select field or area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Fields</SelectItem>
                        <SelectItem value="north">North Field</SelectItem>
                        <SelectItem value="south">South Field</SelectItem>
                        <SelectItem value="east">East Field</SelectItem>
                        <SelectItem value="west">West Field</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <DatePicker date={startDate} setDate={setStartDate} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <DatePicker date={endDate} setDate={setEndDate} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Data Granularity
                    </label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue placeholder="Select granularity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="seasonal">Seasonal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Comparison</label>
                    <Select defaultValue="none">
                      <SelectTrigger>
                        <SelectValue placeholder="Select comparison" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="previous-period">
                          Previous Period
                        </SelectItem>
                        <SelectItem value="previous-year">
                          Previous Year
                        </SelectItem>
                        <SelectItem value="forecast">
                          Against Forecast
                        </SelectItem>
                        <SelectItem value="industry">
                          Industry Average
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Additional Metrics
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary"
                    >
                      Weather Data
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary"
                    >
                      Cost Analysis
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary"
                    >
                      Resource Efficiency
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary"
                    >
                      Environmental Impact
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary"
                    >
                      Sustainability Metrics
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary"
                    >
                      Market Comparison
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save as Template</Button>
                <div className="flex space-x-2">
                  <Button variant="outline">Preview</Button>
                  <Button>Generate Report</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Recent Reports Tab */}
          <TabsContent value="recent" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>
                    View and download your recently generated reports
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Report Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="yield">Yield</SelectItem>
                      <SelectItem value="soil">Soil</SelectItem>
                      <SelectItem value="water">Water</SelectItem>
                      <SelectItem value="pest">Pest</SelectItem>
                      <SelectItem value="fertilizer">Fertilizer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">
                          {report.id}
                        </TableCell>
                        <TableCell>{report.name}</TableCell>
                        <TableCell>
                          {format(new Date(report.date), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{report.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <span className="sr-only">Open menu</span>
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                View Report
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileSpreadsheet className="mr-2 h-4 w-4" />
                                Export to Excel
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Printer className="mr-2 h-4 w-4" />
                                Print
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing 5 of 24 reports
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Scheduled Reports Tab */}
          <TabsContent value="scheduled" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Scheduled Reports</CardTitle>
                  <CardDescription>
                    Manage your recurring report schedules
                  </CardDescription>
                </div>
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule New Report
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Next Delivery</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">
                          {report.id}
                        </TableCell>
                        <TableCell>{report.name}</TableCell>
                        <TableCell>{report.frequency}</TableCell>
                        <TableCell>
                          {format(new Date(report.nextDate), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            {report.recipients.map((email, i) => (
                              <span key={i} className="text-xs">
                                {email}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <span className="sr-only">Open menu</span>
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Edit Schedule
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Clock className="mr-2 h-4 w-4" />
                                Run Now
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Pause Schedule
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Report Templates</CardTitle>
                  <CardDescription>
                    Use and manage your saved report templates
                  </CardDescription>
                </div>
                <Button>
                  <BarChart className="mr-2 h-4 w-4" />
                  Create New Template
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reportTemplates.map((template) => (
                    <Card key={template.id} className="overflow-hidden">
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">
                          {template.name}
                        </CardTitle>
                        <Badge variant="outline" className="w-fit">
                          {template.category}
                        </Badge>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground mb-4">
                          {template.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last used:{" "}
                          {format(new Date(template.lastUsed), "MMM d, yyyy")}
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button size="sm">Use Template</Button>
                      </CardFooter>
                    </Card>
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
