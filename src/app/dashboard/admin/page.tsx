import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  MessageSquare,
  ArrowUpRight,
  Flag,
  Circle,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";

import { DashboardWrapper } from "../component/dashboard-wrapper";

export default function AdminDashboard() {
  return (
    <DashboardWrapper userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor system performance and manage users
            </p>
          </div>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/dashboard/admin/users">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,257</div>
              <div className="flex items-center text-green-600 text-sm font-medium mt-1">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                12% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                AI Requests Today
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,541</div>
              <div className="flex items-center text-green-600 text-sm font-medium mt-1">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                8% from yesterday
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Inquiries
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <div className="flex items-center text-amber-600 text-sm font-medium mt-1">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                18% from last week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Flagged Content
              </CardTitle>
              <Flag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <div className="flex items-center text-red-600 text-sm font-medium mt-1">
                <ArrowUpRight className="mr-1 h-4 w-4" />3 need immediate review
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-700 dark:text-green-500">
                System Usage
              </CardTitle>
              <CardDescription>
                Total requests across different features
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-700 dark:text-green-500">
                User Growth
              </CardTitle>
              <CardDescription>
                Active users and new signups over time
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>

        {/* Request Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-green-700 dark:text-green-500">
              Recent Requests
            </CardTitle>
            <CardDescription>
              Status of the latest user inquiries and requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="complete">Complete</TabsTrigger>
                <TabsTrigger value="flagged">Flagged</TabsTrigger>
              </TabsList>
              <div className="mt-4">
                <div className="space-y-4">
                  {[
                    {
                      user: "John Smith",
                      request: "Soil Analysis Report",
                      time: "2 hours ago",
                      status: "pending",
                      userEmail: "john.smith@example.com",
                    },
                    {
                      user: "Maria Rodriguez",
                      request: "Disease Identification",
                      time: "4 hours ago",
                      status: "complete",
                      userEmail: "maria.r@example.com",
                    },
                    {
                      user: "Ahmed Khan",
                      request: "Crop Yield Prediction",
                      time: "Yesterday",
                      status: "pending",
                      userEmail: "ahmed.k@example.com",
                    },
                    {
                      user: "Sarah Johnson",
                      request: "Community Post Review",
                      time: "Yesterday",
                      status: "flagged",
                      userEmail: "sarah.j@example.com",
                    },
                    {
                      user: "Michael Chen",
                      request: "Weather Data Analysis",
                      time: "2 days ago",
                      status: "rejected",
                      userEmail: "michael.c@example.com",
                    },
                  ].map((request, i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4">
                        {request.status === "pending" && (
                          <Circle className="h-5 w-5 text-amber-500" />
                        )}
                        {request.status === "complete" && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        {request.status === "flagged" && (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                        {request.status === "rejected" && (
                          <XCircle className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1 flex items-center justify-between border-b pb-3">
                        <div>
                          <p className="font-medium">{request.request}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{request.user}</span>
                            <span className="text-xs">
                              ({request.userEmail})
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-muted-foreground">
                            {request.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <Button asChild variant="outline">
                    <Link href="/dashboard/admin/requests">
                      View All Requests
                    </Link>
                  </Button>
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-green-700 dark:text-green-500">
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2 text-center p-4 rounded-lg bg-muted/50">
                <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
                <h3 className="font-medium">API Services</h3>
                <p className="text-sm text-muted-foreground">100% Uptime</p>
              </div>
              <div className="space-y-2 text-center p-4 rounded-lg bg-muted/50">
                <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
                <h3 className="font-medium">Database</h3>
                <p className="text-sm text-muted-foreground">Healthy</p>
              </div>
              <div className="space-y-2 text-center p-4 rounded-lg bg-muted/50">
                <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
                <h3 className="font-medium">Storage</h3>
                <p className="text-sm text-muted-foreground">72% Available</p>
              </div>
              <div className="space-y-2 text-center p-4 rounded-lg bg-muted/50">
                <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
                <h3 className="font-medium">AI Models</h3>
                <p className="text-sm text-muted-foreground">All Operational</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardWrapper>
  );
}
