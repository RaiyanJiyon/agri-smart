"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Upload,
  ImageIcon,
  FileText,
  FileSpreadsheet,
  File,
  MoreVertical,
  Search,
  FolderPlus,
  Filter,
  Download,
  Share2,
  Trash2,
  Eye,
  Edit,
  AlertCircle,
} from "lucide-react";
import { DashboardWrapper } from "../../component/dashboard-wrapper";

// Mock data for uploads
const recentUploads = [
  {
    id: "1",
    name: "Field-A-Soil-Analysis.pdf",
    type: "document",
    size: "2.4 MB",
    uploadDate: "2023-04-15",
    category: "Soil Tests",
    status: "complete",
  },
  {
    id: "2",
    name: "Corn-Growth-Data-2023.xlsx",
    type: "spreadsheet",
    size: "1.8 MB",
    uploadDate: "2023-04-12",
    category: "Crop Data",
    status: "complete",
  },
  {
    id: "3",
    name: "North-Field-Drone-Survey.jpg",
    type: "image",
    size: "5.2 MB",
    uploadDate: "2023-04-10",
    category: "Field Images",
    status: "complete",
  },
  {
    id: "4",
    name: "Irrigation-System-Diagram.pdf",
    type: "document",
    size: "3.7 MB",
    uploadDate: "2023-04-08",
    category: "Equipment",
    status: "complete",
  },
  {
    id: "5",
    name: "Seasonal-Planting-Schedule.xlsx",
    type: "spreadsheet",
    size: "1.2 MB",
    uploadDate: "2023-04-05",
    category: "Planning",
    status: "complete",
  },
];

const pendingUploads = [
  {
    id: "6",
    name: "Harvest-Yield-Data-2023.xlsx",
    type: "spreadsheet",
    size: "4.1 MB",
    uploadDate: "2023-04-15",
    category: "Crop Data",
    status: "processing",
    progress: 65,
  },
  {
    id: "7",
    name: "South-Field-Aerial-View.jpg",
    type: "image",
    size: "8.7 MB",
    uploadDate: "2023-04-15",
    category: "Field Images",
    status: "uploading",
    progress: 30,
  },
];

const categories = [
  "All Categories",
  "Soil Tests",
  "Crop Data",
  "Field Images",
  "Equipment",
  "Planning",
  "Weather Data",
  "Pest Management",
  "Harvest Records",
];

export default function UploadsPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setSelectedFiles([]);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === recentUploads.length + pendingUploads.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(
        [...recentUploads, ...pendingUploads].map((item) => item.id)
      );
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />;
      case "document":
        return <FileText className="h-5 w-5 text-green-500" />;
      case "spreadsheet":
        return <FileSpreadsheet className="h-5 w-5 text-orange-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Complete
          </Badge>
        );
      case "processing":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Processing
          </Badge>
        );
      case "uploading":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Uploading
          </Badge>
        );
      case "failed":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <DashboardWrapper userRole="user">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">File Uploads</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Files</DialogTitle>
                <DialogDescription>
                  Upload your agricultural data, images, and documents.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="files">Select Files</Label>
                  <Input
                    id="files"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                  />
                </div>
                {selectedFiles.length > 0 && (
                  <div className="grid gap-2">
                    <Label>Selected Files</Label>
                    <ScrollArea className="h-[100px] w-full rounded-md border p-2">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-1"
                        >
                          <div className="flex items-center">
                            <File className="h-4 w-4 mr-2" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue="Crop Data">
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {isUploading && (
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <Label>Upload Progress</Label>
                      <span className="text-xs text-gray-500">
                        {uploadProgress}%
                      </span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedFiles([])}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleUpload}
                  disabled={selectedFiles.length === 0 || isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All Files</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="data">Data Files</TabsTrigger>
          </TabsList>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search files..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <FolderPlus className="h-4 w-4 mr-2" />
                New Folder
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>All Uploads</CardTitle>
                <CardDescription>
                  Manage all your uploaded files and documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={
                            selectedItems.length ===
                              recentUploads.length + pendingUploads.length &&
                            recentUploads.length + pendingUploads.length > 0
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-[300px]">Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingUploads.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedItems.includes(file.id)}
                            onCheckedChange={() => handleSelectItem(file.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {getFileIcon(file.type)}
                            <span className="ml-2">{file.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{file.category}</TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell>{file.uploadDate}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {getStatusBadge(file.status)}
                            {(file.status === "uploading" ||
                              file.status === "processing") && (
                              <Progress
                                value={file.progress}
                                className="h-1 w-full"
                              />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem disabled>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem disabled>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem disabled>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Cancel
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                    {recentUploads.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedItems.includes(file.id)}
                            onCheckedChange={() => handleSelectItem(file.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {getFileIcon(file.type)}
                            <span className="ml-2">{file.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{file.category}</TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell>{file.uploadDate}</TableCell>
                        <TableCell>{getStatusBadge(file.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Rename
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
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
                <div className="text-sm text-gray-500">
                  Showing {recentUploads.length + pendingUploads.length} files
                </div>
                <div className="flex gap-2">
                  {selectedItems.length > 0 && (
                    <>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Selected
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Selected
                      </Button>
                    </>
                  )}
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
                <CardDescription>
                  View and manage your uploaded images and photos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentUploads
                    .filter((file) => file.type === "image")
                    .map((file) => (
                      <Card key={file.id} className="overflow-hidden">
                        <div className="aspect-video bg-gray-100 flex items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-gray-400" />
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-sm">
                                {file.name}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {file.uploadDate} • {file.size}
                              </p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>
                  View and manage your uploaded documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {recentUploads
                    .filter((file) => file.type === "document")
                    .map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center">
                          <FileText className="h-8 w-8 text-green-500 mr-4" />
                          <div>
                            <h3 className="font-medium">{file.name}</h3>
                            <p className="text-sm text-gray-500">
                              {file.category} • {file.uploadDate} • {file.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Rename
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
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

          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Data Files</CardTitle>
                <CardDescription>
                  View and manage your uploaded data files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {recentUploads
                    .filter((file) => file.type === "spreadsheet")
                    .map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center">
                          <FileSpreadsheet className="h-8 w-8 text-orange-500 mr-4" />
                          <div>
                            <h3 className="font-medium">{file.name}</h3>
                            <p className="text-sm text-gray-500">
                              {file.category} • {file.uploadDate} • {file.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Rename
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
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

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Storage Usage</CardTitle>
              <CardDescription>
                Monitor your storage usage and limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      Total Storage (15.3 GB / 50 GB)
                    </span>
                    <span className="text-sm text-gray-500">30.6%</span>
                  </div>
                  <Progress value={30.6} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Images</span>
                      <span className="text-sm text-gray-500">5.8 GB</span>
                    </div>
                    <Progress value={38} className="h-1" />
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Documents</span>
                      <span className="text-sm text-gray-500">3.2 GB</span>
                    </div>
                    <Progress value={21} className="h-1" />
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Data Files</span>
                      <span className="text-sm text-gray-500">6.3 GB</span>
                    </div>
                    <Progress value={41} className="h-1" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-sm text-amber-600">
                <AlertCircle className="h-4 w-4 mr-2" />
                Your storage is 30% full
              </div>
              <Button variant="outline">Upgrade Storage</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardWrapper>
  );
}
