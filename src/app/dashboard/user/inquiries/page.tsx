"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  Clock,
  CheckCircle2,
  HelpCircle,
  XCircle,
  Send,
  Paperclip,
  MoreHorizontal,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardWrapper } from "../../component/dashboard-wrapper";

// Sample inquiry data
const inquiries = [
  {
    id: "INQ-001",
    subject: "Crop Disease Identification Help",
    category: "Technical Support",
    status: "open",
    priority: "high",
    date: "2023-04-18",
    lastUpdate: "2023-04-19",
    messages: 3,
  },
  {
    id: "INQ-002",
    subject: "Subscription Billing Issue",
    category: "Billing",
    status: "in-progress",
    priority: "medium",
    date: "2023-04-15",
    lastUpdate: "2023-04-17",
    messages: 4,
  },
  {
    id: "INQ-003",
    subject: "Feature Request: Weather Alerts",
    category: "Feature Request",
    status: "open",
    priority: "low",
    date: "2023-04-12",
    lastUpdate: "2023-04-12",
    messages: 1,
  },
  {
    id: "INQ-004",
    subject: "Mobile App Login Problem",
    category: "Technical Support",
    status: "resolved",
    priority: "high",
    date: "2023-04-05",
    lastUpdate: "2023-04-08",
    messages: 5,
  },
  {
    id: "INQ-005",
    subject: "Data Export Not Working",
    category: "Technical Support",
    status: "closed",
    priority: "medium",
    date: "2023-03-28",
    lastUpdate: "2023-04-02",
    messages: 6,
  },
];

// Sample conversation for a selected inquiry
const sampleConversation = [
  {
    id: 1,
    sender: "user",
    name: "John Farmer",
    message:
      "I'm having trouble identifying what appears to be a disease on my tomato plants. The leaves are showing yellow spots and curling at the edges. Can you help me identify the issue?",
    timestamp: "2023-04-18T10:30:00",
    attachments: [{ name: "tomato_plant.jpg", size: "2.4 MB", type: "image" }],
  },
  {
    id: 2,
    sender: "support",
    name: "Sarah Support",
    message:
      "Hello John, thank you for reaching out. Based on your description, it sounds like it could be early blight or septoria leaf spot. Could you please share a clear image of the affected leaves so I can provide a more accurate assessment?",
    timestamp: "2023-04-18T11:15:00",
    attachments: [],
  },
  {
    id: 3,
    sender: "user",
    name: "John Farmer",
    message:
      "I've attached two more photos showing close-ups of the affected leaves. The spots seem to be spreading to neighboring plants as well.",
    timestamp: "2023-04-18T13:45:00",
    attachments: [
      { name: "close_up1.jpg", size: "1.8 MB", type: "image" },
      { name: "close_up2.jpg", size: "2.1 MB", type: "image" },
    ],
  },
  {
    id: 4,
    sender: "support",
    name: "Sarah Support",
    message:
      "Thank you for the additional images. This appears to be Septoria leaf spot, a common fungal disease in tomatoes. I recommend removing the affected leaves immediately to prevent spread. Apply a copper-based fungicide according to package directions. Also, ensure proper spacing between plants for air circulation and avoid overhead watering. Would you like me to send you our detailed guide on managing tomato diseases?",
    timestamp: "2023-04-19T09:20:00",
    attachments: [],
  },
];

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    open: { variant: "default", icon: HelpCircle },
    "in-progress": { variant: "secondary", icon: Clock },
    resolved: { variant: "outline", icon: CheckCircle2 },
    closed: { variant: "outline", icon: XCircle },
  } as const;

  const style =
    statusStyles[status as keyof typeof statusStyles] || statusStyles.open;
  const Icon = style.icon;

  return (
    <Badge
      variant={
        style.variant as "default" | "destructive" | "outline" | "secondary"
      }
      className="capitalize flex items-center gap-1"
    >
      <Icon className="h-3 w-3" />
      {status.replace("-", " ")}
    </Badge>
  );
}

// Priority badge component
function PriorityBadge({ priority }: { priority: string }) {
  const priorityStyles = {
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  };

  return (
    <Badge
      variant="outline"
      className={`capitalize ${
        priorityStyles[priority as keyof typeof priorityStyles]
      }`}
    >
      {priority}
    </Badge>
  );
}

export default function InquiriesPage() {
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectInquiry = (id: string) => {
    setSelectedInquiry(id);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <DashboardWrapper userRole="user">
      <div className="flex flex-col space-y-6 p-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Inquiries</h2>
          <p className="text-muted-foreground">
            Manage your support inquiries and requests
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <TabsList className="grid grid-cols-4 w-full sm:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>

            <div className="flex w-full sm:w-auto gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search inquiries..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Inquiry
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Create New Inquiry</DialogTitle>
                    <DialogDescription>
                      Submit a new support request or question
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="Brief description of your issue"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="category" className="text-sm font-medium">
                        Category
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="feature">
                            Feature Request
                          </SelectItem>
                          <SelectItem value="account">
                            Account Management
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="priority" className="text-sm font-medium">
                        Priority
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Describe your issue in detail..."
                        className="min-h-[120px]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">
                        Attachments (Optional)
                      </label>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          type="button"
                          className="w-full"
                        >
                          <Paperclip className="mr-2 h-4 w-4" />
                          Add Files
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        You can upload images, documents, or screenshots related
                        to your inquiry (max 10MB per file)
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Submit Inquiry</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            {selectedInquiry ? (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedInquiry(null)}
                        className="h-8 px-2"
                      >
                        <ChevronDown className="h-4 w-4 rotate-90 mr-1" />
                        Back
                      </Button>
                      <CardTitle>
                        {
                          inquiries.find((i) => i.id === selectedInquiry)
                            ?.subject
                        }
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>ID: {selectedInquiry}</span>
                      <span>•</span>
                      <span>
                        {
                          inquiries.find((i) => i.id === selectedInquiry)
                            ?.category
                        }
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge
                      status={
                        inquiries.find((i) => i.id === selectedInquiry)
                          ?.status || "open"
                      }
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                        <DropdownMenuItem>Change Priority</DropdownMenuItem>
                        <DropdownMenuItem>Print Conversation</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Close Inquiry
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    {/* Conversation thread */}
                    <div className="space-y-4 max-h-[500px] overflow-y-auto p-1">
                      {sampleConversation.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`flex gap-3 max-w-[80%] ${
                              message.sender === "user"
                                ? "flex-row-reverse"
                                : "flex-row"
                            }`}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={`/placeholder.svg?height=32&width=32`}
                              />
                              <AvatarFallback>
                                {message.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2 mb-1 text-sm">
                                <span className="font-medium">
                                  {message.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {format(
                                    new Date(message.timestamp),
                                    "MMM d, h:mm a"
                                  )}
                                </span>
                              </div>
                              <div
                                className={`p-3 rounded-lg ${
                                  message.sender === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                                }`}
                              >
                                <p className="text-sm">{message.message}</p>
                                {message.attachments.length > 0 && (
                                  <div className="mt-2 space-y-1">
                                    {message.attachments.map(
                                      (attachment, i) => (
                                        <div
                                          key={i}
                                          className={`text-xs flex items-center gap-1 p-1.5 rounded ${
                                            message.sender === "user"
                                              ? "bg-primary/80 text-primary-foreground"
                                              : "bg-background"
                                          }`}
                                        >
                                          <Paperclip className="h-3 w-3" />
                                          <span>{attachment.name}</span>
                                          <span className="text-xs opacity-70">
                                            ({attachment.size})
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Reply box */}
                    <div className="flex items-end gap-2 pt-2 border-t">
                      <Textarea
                        placeholder="Type your reply..."
                        className="min-h-[80px]"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <div className="flex flex-col gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          title="Attach files"
                        >
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>All Inquiries</CardTitle>
                    <CardDescription>
                      View and manage all your support inquiries
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Select defaultValue="newest">
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                        <SelectItem value="status">Status</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Last Update</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inquiries.map((inquiry) => (
                        <TableRow
                          key={inquiry.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleSelectInquiry(inquiry.id)}
                        >
                          <TableCell className="font-medium">
                            {inquiry.id}
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{inquiry.subject}</div>
                            <div className="text-xs text-muted-foreground">
                              {inquiry.messages} message
                              {inquiry.messages !== 1 ? "s" : ""}
                            </div>
                          </TableCell>
                          <TableCell>{inquiry.category}</TableCell>
                          <TableCell>
                            <StatusBadge status={inquiry.status} />
                          </TableCell>
                          <TableCell>
                            <PriorityBadge priority={inquiry.priority} />
                          </TableCell>
                          <TableCell>
                            {format(new Date(inquiry.date), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell>
                            {format(
                              new Date(inquiry.lastUpdate),
                              "MMM d, yyyy"
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectInquiry(inquiry.id);
                              }}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing 5 of 12 inquiries
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
            )}
          </TabsContent>

          <TabsContent value="open" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Open Inquiries</CardTitle>
                <CardDescription>
                  View and respond to your open inquiries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You have {inquiries.filter((i) => i.status === "open").length}{" "}
                  open inquiries that need attention.
                </p>
                {/* Similar table as in "all" tab but filtered for open inquiries */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>In Progress Inquiries</CardTitle>
                <CardDescription>
                  Inquiries that are currently being addressed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You have{" "}
                  {inquiries.filter((i) => i.status === "in-progress").length}{" "}
                  inquiries in progress.
                </p>
                {/* Similar table as in "all" tab but filtered for in-progress inquiries */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resolved Inquiries</CardTitle>
                <CardDescription>
                  Previously resolved inquiries and their solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You have{" "}
                  {
                    inquiries.filter(
                      (i) => i.status === "resolved" || i.status === "closed"
                    ).length
                  }{" "}
                  resolved inquiries.
                </p>
                {/* Similar table as in "all" tab but filtered for resolved inquiries */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardWrapper>
  );
}
