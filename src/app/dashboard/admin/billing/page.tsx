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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Search,
  Download,
  CreditCard,
  TrendingUp,
  Calendar,
  Filter,
  MoreHorizontal,
  ArrowUpDown,
  Check,
  X,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { DashboardWrapper } from "../../component/dashboard-wrapper";
import { Chart } from "../../component/chart";

export default function BillingPage() {
  // Sample data for the chart
  const revenueData = {
    data: [
      {
        name: "Revenue",
        values: [
          { label: "Jan", value: 12500 },
          { label: "Feb", value: 14200 },
          { label: "Mar", value: 16800 },
          { label: "Apr", value: 18500 },
          { label: "May", value: 21000 },
          { label: "Jun", value: 24500 },
        ],
      },
      {
        name: "Expenses",
        values: [
          { label: "Jan", value: 8200 },
          { label: "Feb", value: 8500 },
          { label: "Mar", value: 9100 },
          { label: "Apr", value: 9800 },
          { label: "May", value: 10200 },
          { label: "Jun", value: 11500 },
        ],
      },
    ],
  };

  // Sample invoices data
  const invoices = [
    {
      id: "INV-001",
      customer: "John Smith",
      email: "john@example.com",
      amount: 199.99,
      status: "Paid",
      date: "2023-04-15",
    },
    {
      id: "INV-002",
      customer: "Sarah Johnson",
      email: "sarah@example.com",
      amount: 299.99,
      status: "Pending",
      date: "2023-04-16",
    },
    {
      id: "INV-003",
      customer: "Michael Brown",
      email: "michael@example.com",
      amount: 99.99,
      status: "Paid",
      date: "2023-04-17",
    },
    {
      id: "INV-004",
      customer: "Emily Davis",
      email: "emily@example.com",
      amount: 149.99,
      status: "Overdue",
      date: "2023-04-10",
    },
    {
      id: "INV-005",
      customer: "David Wilson",
      email: "david@example.com",
      amount: 199.99,
      status: "Paid",
      date: "2023-04-18",
    },
  ];

  // Sample subscriptions data
  const subscriptions = [
    {
      id: "SUB-001",
      customer: "John Smith",
      plan: "Premium",
      price: 19.99,
      status: "Active",
      nextBilling: "2023-05-15",
    },
    {
      id: "SUB-002",
      customer: "Sarah Johnson",
      plan: "Enterprise",
      price: 49.99,
      status: "Active",
      nextBilling: "2023-05-16",
    },
    {
      id: "SUB-003",
      customer: "Michael Brown",
      plan: "Basic",
      price: 9.99,
      status: "Canceled",
      nextBilling: "N/A",
    },
    {
      id: "SUB-004",
      customer: "Emily Davis",
      plan: "Premium",
      price: 19.99,
      status: "Active",
      nextBilling: "2023-05-10",
    },
    {
      id: "SUB-005",
      customer: "David Wilson",
      plan: "Enterprise",
      price: 49.99,
      status: "Active",
      nextBilling: "2023-05-18",
    },
  ];

  return (
    <DashboardWrapper userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Billing & Subscriptions
            </h1>
            <p className="text-muted-foreground">
              Manage billing, subscriptions, and financial reports
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Reports
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 gap-2">
              <CreditCard className="h-4 w-4" />
              Manage Plans
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,500</div>
              <div className="flex items-center text-green-600 text-sm font-medium mt-1">
                <TrendingUp className="mr-1 h-4 w-4" />
                16.7% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Active Subscriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,257</div>
              <div className="flex items-center text-green-600 text-sm font-medium mt-1">
                <TrendingUp className="mr-1 h-4 w-4" />
                12% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Average Revenue Per User
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$19.50</div>
              <div className="flex items-center text-green-600 text-sm font-medium mt-1">
                <TrendingUp className="mr-1 h-4 w-4" />
                4.2% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3%</div>
              <div className="flex items-center text-green-600 text-sm font-medium mt-1">
                <TrendingUp className="mr-1 h-4 w-4" />
                0.5% improvement
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-green-700 dark:text-green-500">
              Revenue Overview
            </CardTitle>
            <CardDescription>Monthly revenue and expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              data={revenueData.data}
              valueFormatter={(value) => `$${value.toLocaleString()}`}
              colors={["bg-green-500", "bg-red-500"]}
            />
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer, invoice, or plan..."
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

        {/* Tabs for different billing sections */}
        <Tabs defaultValue="invoices">
          <TabsList>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Invoices Tab Content */}
          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
                <CardDescription>
                  Manage and view all customer invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Invoice ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">
                          {invoice.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{invoice.customer}</div>
                            <div className="text-sm text-muted-foreground">
                              {invoice.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              invoice.status === "Paid"
                                ? "success"
                                : invoice.status === "Pending"
                                ? "outline"
                                : "destructive"
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Download PDF</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Send reminder</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Void invoice
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

          {/* Subscriptions Tab Content */}
          <TabsContent value="subscriptions">
            <Card>
              <CardHeader>
                <CardTitle>Active Subscriptions</CardTitle>
                <CardDescription>
                  Manage customer subscriptions and plans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">
                        Subscription ID
                      </TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Next Billing</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell className="font-medium">
                          {subscription.id}
                        </TableCell>
                        <TableCell>{subscription.customer}</TableCell>
                        <TableCell>{subscription.plan}</TableCell>
                        <TableCell>
                          ${subscription.price.toFixed(2)}/mo
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              subscription.status === "Active"
                                ? "success"
                                : "destructive"
                            }
                          >
                            {subscription.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{subscription.nextBilling}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Change plan</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                Pause subscription
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Cancel subscription
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

          {/* Plans Tab Content */}
          <TabsContent value="plans">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plans</CardTitle>
                <CardDescription>
                  Manage and configure available subscription plans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Basic Plan */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Plan</CardTitle>
                      <CardDescription>
                        For small farms and individual users
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-4">
                        $9.99
                        <span className="text-sm font-normal text-muted-foreground">
                          /month
                        </span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>Basic crop recommendations</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>Weather forecasts</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>Community access</span>
                        </li>
                        <li className="flex items-center">
                          <X className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Advanced AI features
                          </span>
                        </li>
                      </ul>
                      <Button className="w-full">Edit Plan</Button>
                    </CardContent>
                  </Card>

                  {/* Premium Plan */}
                  <Card className="border-green-200 dark:border-green-900">
                    <CardHeader className="bg-green-50 dark:bg-green-900/20 rounded-t-lg">
                      <div className="flex justify-between items-center">
                        <CardTitle>Premium Plan</CardTitle>
                        <Badge className="bg-green-600">Popular</Badge>
                      </div>
                      <CardDescription>For medium-sized farms</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-4">
                        $19.99
                        <span className="text-sm font-normal text-muted-foreground">
                          /month
                        </span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>Advanced crop recommendations</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>Detailed weather analytics</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>Disease detection</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>Basic AI assistant</span>
                        </li>
                      </ul>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Edit Plan
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Enterprise Plan */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Enterprise Plan</CardTitle>
                      <CardDescription>
                        For large agricultural businesses
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-4">
                        $49.99
                        <span className="text-sm font-normal text-muted-foreground">
                          /month
                        </span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>All Premium features</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>Advanced AI analytics</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>Custom integrations</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>Priority support</span>
                        </li>
                      </ul>
                      <Button className="w-full">Edit Plan</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab Content */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription>
                  Access and download detailed financial reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Monthly Revenue Report
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Detailed breakdown of revenue sources, subscription
                        growth, and churn metrics for the current month.
                      </p>
                      <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Quarterly Financial Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Comprehensive quarterly report with financial
                        projections, customer acquisition costs, and lifetime
                        value analysis.
                      </p>
                      <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Annual Tax Report
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Complete annual financial statements and tax
                        documentation for the previous fiscal year.
                      </p>
                      <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Custom Report Generator
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Create custom financial reports with specific date
                        ranges, metrics, and visualization options.
                      </p>
                      <Button className="gap-2 bg-green-600 hover:bg-green-700">
                        <ArrowUpDown className="h-4 w-4" />
                        Generate Custom Report
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardWrapper>
  );
}
