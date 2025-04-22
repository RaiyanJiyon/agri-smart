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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  Flag,
  MessageSquare,
  ImageIcon,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  Users,
  Eye,
} from "lucide-react";
import { LineChart } from "@/components/ui/line-chart";
import { DashboardWrapper } from "../../component/dashboard-wrapper";

export default function ModerationPage() {
  // Sample data for the line chart
  const moderationData = {
    data: [
      {
        name: "Flagged Content",
        values: [
          { x: "Mon", y: 12 },
          { x: "Tue", y: 8 },
          { x: "Wed", y: 15 },
          { x: "Thu", y: 10 },
          { x: "Fri", y: 7 },
          { x: "Sat", y: 5 },
          { x: "Sun", y: 3 },
        ],
      },
    ],
  };

  return (
    <DashboardWrapper userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Content Moderation
            </h1>
            <p className="text-muted-foreground">
              Review and moderate user-generated content
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-green-600 hover:bg-green-700 gap-2">
              <Shield className="h-4 w-4" />
              Update Policies
            </Button>
          </div>
        </div>

        {/* Moderation Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-green-700 dark:text-green-500">
              Moderation Activity
            </CardTitle>
            <CardDescription>
              Flagged content over the past 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={moderationData.data}
              valueFormatter={(value) => value.toString()}
              colors={["stroke-red-500"]}
            />
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Flagged
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">60</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">14</div>
              <p className="text-xs text-muted-foreground">
                Awaiting moderation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Removed Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">32</div>
              <p className="text-xs text-muted-foreground">Violated policies</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">14</div>
              <p className="text-xs text-muted-foreground">
                Cleared after review
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by content, user, or reason..."
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

        {/* Tabs for different content types */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="forum">Forum Posts</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="reports">User Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: "FLAG-2023-1542",
                  type: "Forum Post",
                  user: "john.smith@example.com",
                  userName: "John Smith",
                  flagged: "2 hours ago",
                  reason: "Inappropriate content",
                  status: "pending",
                  icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
                  content:
                    "This post contains potentially misleading information about pesticide usage...",
                  reports: 3,
                },
                {
                  id: "FLAG-2023-1541",
                  type: "Comment",
                  user: "maria.r@example.com",
                  userName: "Maria Rodriguez",
                  flagged: "4 hours ago",
                  reason: "Harassment",
                  status: "pending",
                  icon: <MessageSquare className="h-8 w-8 text-purple-500" />,
                  content:
                    "This comment contains personal attacks against another community member...",
                  reports: 5,
                },
                {
                  id: "FLAG-2023-1540",
                  type: "Image",
                  user: "ahmed.k@example.com",
                  userName: "Ahmed Khan",
                  flagged: "Yesterday",
                  reason: "Inappropriate content",
                  status: "removed",
                  icon: <ImageIcon className="h-8 w-8 text-green-500" />,
                  content:
                    "This image contains content that violates community guidelines...",
                  reports: 8,
                },
                {
                  id: "FLAG-2023-1539",
                  type: "User Report",
                  user: "sarah.j@example.com",
                  userName: "Sarah Johnson",
                  flagged: "Yesterday",
                  reason: "Misinformation",
                  status: "approved",
                  icon: <FileText className="h-8 w-8 text-red-500" />,
                  content:
                    "This report contains factually incorrect information about crop diseases...",
                  reports: 2,
                },
                {
                  id: "FLAG-2023-1538",
                  type: "Forum Post",
                  user: "michael.c@example.com",
                  userName: "Michael Chen",
                  flagged: "2 days ago",
                  reason: "Spam",
                  status: "removed",
                  icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
                  content:
                    "This post contains promotional content and external links to commercial products...",
                  reports: 12,
                },
                {
                  id: "FLAG-2023-1537",
                  type: "Comment",
                  user: "priya.s@example.com",
                  userName: "Priya Sharma",
                  flagged: "2 days ago",
                  reason: "Inappropriate content",
                  status: "approved",
                  icon: <MessageSquare className="h-8 w-8 text-purple-500" />,
                  content:
                    "This comment was flagged but does not violate our community guidelines...",
                  reports: 1,
                },
              ].map((item, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Badge variant="outline" className="mb-2">
                        {item.type}
                      </Badge>
                      {item.status === "pending" && (
                        <Badge
                          variant="outline"
                          className="bg-amber-100 text-amber-700 border-amber-200"
                        >
                          Pending Review
                        </Badge>
                      )}
                      {item.status === "approved" && (
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-700 border-green-200"
                        >
                          Approved
                        </Badge>
                      )}
                      {item.status === "removed" && (
                        <Badge
                          variant="outline"
                          className="bg-red-100 text-red-700 border-red-200"
                        >
                          Removed
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-muted p-2 rounded-lg">{item.icon}</div>
                      <div>
                        <CardTitle className="text-base">{item.id}</CardTitle>
                        <CardDescription className="text-xs">
                          Flagged {item.flagged}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {item.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {item.userName}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                      {item.content}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Flag className="h-3.5 w-3.5 text-red-500" />
                      <span>
                        Flagged for{" "}
                        <span className="font-medium">{item.reason}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Users className="h-3.5 w-3.5" />
                      <span>
                        <span className="font-medium">{item.reports}</span> user
                        reports
                      </span>
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
          <TabsContent value="forum" className="mt-4">
            <Card className="p-8 text-center text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <p className="text-lg font-medium mb-2">
                Forum posts will appear here
              </p>
              <p>Filter to view only flagged forum posts for moderation</p>
            </Card>
          </TabsContent>
          <TabsContent value="comments" className="mt-4">
            <Card className="p-8 text-center text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-purple-500" />
              <p className="text-lg font-medium mb-2">
                Comments will appear here
              </p>
              <p>Filter to view only flagged comments for moderation</p>
            </Card>
          </TabsContent>
          <TabsContent value="images" className="mt-4">
            <Card className="p-8 text-center text-gray-500">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p className="text-lg font-medium mb-2">
                Images will appear here
              </p>
              <p>Filter to view only flagged images for moderation</p>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="mt-4">
            <Card className="p-8 text-center text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <p className="text-lg font-medium mb-2">
                User reports will appear here
              </p>
              <p>Filter to view only flagged user reports for moderation</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardWrapper>
  );
}
