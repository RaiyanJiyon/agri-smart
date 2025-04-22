import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Filter,
  Circle,
  CheckCircle,
  AlertCircle,
  XCircle,
  MoreHorizontal,
  MessageSquare,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DashboardWrapper } from "../../component/dashboard-wrapper";

export default function RequestsPage() {
  return (
    <DashboardWrapper userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Requests</h1>
            <p className="text-muted-foreground">
              Manage and respond to user inquiries and support requests
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="mr-2 h-4 w-4" />
              Batch Resolve
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">248</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">42</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">189</div>
              <p className="text-xs text-muted-foreground">
                Successfully completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Average Response Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2h</div>
              <p className="text-xs text-muted-foreground\">Target: 6 hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests by user, topic, or ID..."
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

        {/* Tabs for different request types */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableCaption>List of all user requests</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        id: "REQ-2023-1542",
                        subject: "Soil Analysis Report Error",
                        user: "john.smith@example.com",
                        submitted: "2 hours ago",
                        category: "Technical Support",
                        status: "pending",
                        assignedTo: "Sarah Johnson",
                      },
                      {
                        id: "REQ-2023-1541",
                        subject: "Account Upgrade Request",
                        user: "maria.r@example.com",
                        submitted: "4 hours ago",
                        category: "Billing",
                        status: "pending",
                        assignedTo: "Michael Chen",
                      },
                      {
                        id: "REQ-2023-1540",
                        subject: "Data Export Feature Request",
                        user: "ahmed.k@example.com",
                        submitted: "Yesterday",
                        category: "Feature Request",
                        status: "in-progress",
                        assignedTo: "Priya Sharma",
                      },
                      {
                        id: "REQ-2023-1539",
                        subject: "Inappropriate Content Report",
                        user: "sarah.j@example.com",
                        submitted: "Yesterday",
                        category: "Content Moderation",
                        status: "flagged",
                        assignedTo: "Carlos Martinez",
                      },
                      {
                        id: "REQ-2023-1538",
                        subject: "API Integration Help",
                        user: "michael.c@example.com",
                        submitted: "2 days ago",
                        category: "Technical Support",
                        status: "resolved",
                        assignedTo: "Ahmed Khan",
                      },
                      {
                        id: "REQ-2023-1537",
                        subject: "Billing Discrepancy",
                        user: "priya.s@example.com",
                        submitted: "2 days ago",
                        category: "Billing",
                        status: "resolved",
                        assignedTo: "Maria Rodriguez",
                      },
                      {
                        id: "REQ-2023-1536",
                        subject: "Account Access Issue",
                        user: "carlos.m@example.com",
                        submitted: "3 days ago",
                        category: "Account Support",
                        status: "resolved",
                        assignedTo: "John Smith",
                      },
                    ].map((request, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-mono text-xs">
                          {request.id}
                        </TableCell>
                        <TableCell className="font-medium">
                          {request.subject}
                        </TableCell>
                        <TableCell>{request.user}</TableCell>
                        <TableCell>{request.submitted}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{request.category}</Badge>
                        </TableCell>
                        <TableCell>
                          {request.status === "pending" && (
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1 bg-amber-100 text-amber-700 border-amber-200"
                            >
                              <Circle className="h-2 w-2 fill-amber-500" />
                              Pending
                            </Badge>
                          )}
                          {request.status === "in-progress" && (
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1 bg-blue-100 text-blue-700 border-blue-200"
                            >
                              <Clock className="h-2 w-2" />
                              In Progress
                            </Badge>
                          )}
                          {request.status === "resolved" && (
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1 bg-green-100 text-green-700 border-green-200"
                            >
                              <CheckCircle className="h-2 w-2" />
                              Resolved
                            </Badge>
                          )}
                          {request.status === "flagged" && (
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1 bg-red-100 text-red-700 border-red-200"
                            >
                              <AlertCircle className="h-2 w-2" />
                              Flagged
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{request.assignedTo}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                <span>Respond</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                <span>Mark as Resolved</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <AlertCircle className="mr-2 h-4 w-4" />
                                <span>Flag</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="mr-2 h-4 w-4" />
                                <span>Reject</span>
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

            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </TabsContent>
          <TabsContent value="pending" className="mt-4">
            <Card className="p-8 text-center text-gray-500">
              <Circle className="h-12 w-12 mx-auto mb-4 text-amber-500" />
              <p className="text-lg font-medium mb-2">
                Pending requests will appear here
              </p>
              <p>Filter to view only pending requests that need attention</p>
            </Card>
          </TabsContent>
          <TabsContent value="resolved" className="mt-4">
            <Card className="p-8 text-center text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p className="text-lg font-medium mb-2">
                Resolved requests will appear here
              </p>
              <p>View all successfully resolved user requests</p>
            </Card>
          </TabsContent>
          <TabsContent value="flagged" className="mt-4">
            <Card className="p-8 text-center text-gray-500">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <p className="text-lg font-medium mb-2">
                Flagged requests will appear here
              </p>
              <p>View requests that require special attention or escalation</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardWrapper>
  );
}
