import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  MessageSquare,
  Upload,
  AlertTriangle,
  FileText,
  ChevronRight,
  Lightbulb,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { DashboardWrapper } from "../component/dashboard-wrapper";

export default function UserDashboard() {
  return (
    <DashboardWrapper userRole="user">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, John! Here&apos;s an overview of your farm.
            </p>
          </div>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/dashboard/user/ai-assistant">
              <MessageSquare className="mr-2 h-4 w-4" />
              Ask AI Assistant
            </Link>
          </Button>
        </div>

        {/* Alert */}
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-900/30">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              <CardTitle className="text-lg text-orange-700 dark:text-orange-400">
                Weather Alert
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-orange-700 dark:text-orange-400">
              Heavy rainfall expected in your region over the next 48 hours.
              Consider adjusting your irrigation schedule.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Main Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                AI Usage This Month
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42/50</div>
              <p className="text-xs text-muted-foreground">Credits remaining</p>
              <Progress value={84} className="mt-3 h-2" />
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
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
              <Button variant="link" size="sm" asChild className="mt-3 p-0">
                <Link
                  href="/dashboard/user/inquiries"
                  className="flex items-center h-auto"
                >
                  View inquiries <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Uploaded Documents
              </CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                Soil tests, crop images & more
              </p>
              <Button variant="link" size="sm" asChild className="mt-3 p-0">
                <Link
                  href="/dashboard/user/uploads"
                  className="flex items-center h-auto"
                >
                  Manage uploads <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Recommendations */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl text-green-700 dark:text-green-500 flex items-center">
                <Lightbulb className="mr-2 h-5 w-5" /> Recent AI Recommendations
              </CardTitle>
              <CardDescription>
                Latest insights from your AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Optimal Planting Schedule",
                    date: "Today",
                    excerpt:
                      "Based on current soil conditions and weather forecasts, optimal planting for wheat should begin next week...",
                  },
                  {
                    title: "Irrigation Adjustment Needed",
                    date: "Yesterday",
                    excerpt:
                      "Your southern field is showing signs of overwatering. Consider reducing irrigation by 15-20% and monitoring soil moisture...",
                  },
                  {
                    title: "Crop Disease Prevention",
                    date: "3 days ago",
                    excerpt:
                      "Early signs of powdery mildew detected in your tomato crop images. Recommended organic treatment is a diluted solution of...",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="border-b last:border-0 pb-3 last:pb-0"
                  >
                    <div className="flex justify-between mb-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {item.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.excerpt}
                    </p>
                    <Button variant="link" size="sm" className="px-0 h-auto">
                      Read more
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/user/reports">
                    <FileText className="mr-2 h-4 w-4" />
                    View All Reports
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-700 dark:text-green-500 flex items-center">
                <Bell className="mr-2 h-5 w-5" /> Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    title: "New AI feature available",
                    time: "2 hours ago",
                    description: "Try our new crop disease detection tool!",
                  },
                  {
                    title: "Subscription renews soon",
                    time: "1 day ago",
                    description: "Your plan will renew in 7 days",
                  },
                  {
                    title: "Community response",
                    time: "2 days ago",
                    description: "Expert replied to your forum post",
                  },
                ].map((notification, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
                  >
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                      <Bell className="h-4 w-4 text-green-700 dark:text-green-500" />
                    </div>
                    <div>
                      <div className="flex gap-2 items-center justify-between">
                        <p className="font-medium text-sm">
                          {notification.title}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-green-700 dark:text-green-500">
              Quick Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                {
                  title: "AI Assistant",
                  href: "/dashboard/user/ai-assistant",
                  icon: <MessageSquare className="h-6 w-6" />,
                },
                {
                  title: "Upload Image",
                  href: "/dashboard/user/disease-detector",
                  icon: <Upload className="h-6 w-6" />,
                },
                {
                  title: "View Reports",
                  href: "/dashboard/user/reports",
                  icon: <FileText className="h-6 w-6" />,
                },
                {
                  title: "Community",
                  href: "/community",
                  icon: <BarChart3 className="h-6 w-6" />,
                },
                {
                  title: "Knowledge Hub",
                  href: "/knowledge-hub",
                  icon: <Lightbulb className="h-6 w-6" />,
                },
                {
                  title: "Profile Settings",
                  href: "/dashboard/user/profile",
                  icon: <Bell className="h-6 w-6" />,
                },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="flex flex-col items-center justify-center bg-muted/50 hover:bg-muted rounded-lg p-4 text-center transition-colors"
                >
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3 mb-2">
                    {link.icon}
                  </div>
                  <span className="text-sm font-medium">{link.title}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardWrapper>
  );
}
