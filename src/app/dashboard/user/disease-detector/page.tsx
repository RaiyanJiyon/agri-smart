"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Upload,
  ImageIcon,
  Loader2,
  AlertTriangle,
  Check,
  FileText,
  Download,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardWrapper } from "../../component/dashboard-wrapper";

type UploadState = "idle" | "uploading" | "success" | "error";
type DetectionResult = {
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
  prevention: string[];
} | null;

// Mockup data for recent activities
const mockRecentActivities = [
  {
    id: "ACT-001",
    file: "/mock-images/plant1.jpg",
    result: {
      disease: "Leaf Spot",
      confidence: 92.5,
      description: "A fungal infection causing spots on leaves.",
      treatment: "Apply fungicide and remove infected leaves.",
      prevention: ["Avoid overhead watering", "Ensure proper air circulation"],
    },
    timestamp: new Date("2023-10-01T10:15:00"),
  },
  {
    id: "ACT-002",
    file: "/mock-images/plant2.jpg",
    result: {
      disease: "Powdery Mildew",
      confidence: 87.3,
      description: "A white powdery growth on leaves.",
      treatment: "Use sulfur-based sprays and prune affected areas.",
      prevention: ["Plant resistant varieties", "Maintain proper spacing"],
    },
    timestamp: new Date("2023-09-28T14:45:00"),
  },
  {
    id: "ACT-003",
    file: "/mock-images/plant3.jpg",
    result: {
      disease: "Root Rot",
      confidence: 95.0,
      description: "Decay of roots due to overwatering.",
      treatment: "Improve drainage and reduce watering frequency.",
      prevention: ["Use well-draining soil", "Avoid waterlogged conditions"],
    },
    timestamp: new Date("2023-09-25T09:30:00"),
  },
];

export default function DiseaseDetection() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<DetectionResult>(null);
  const [file, setFile] = useState<File | null>(null);
  console.log(file);
  const [recentActivities, setRecentActivities] =
    useState<
      { id: string; file: string; result: DetectionResult; timestamp: Date }[]
    >(mockRecentActivities);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    setUploadState("idle");
    setResult(null);
  };

  const handleUpload = () => {
    // Simulate analysis (replace with actual API call)
    setTimeout(() => {
      setResult({
        disease: "Mock Disease",
        confidence: 90.0,
        description: "This is a simulated disease detection result.",
        treatment: "Simulated treatment advice.",
        prevention: ["Tip 1", "Tip 2", "Tip 3"],
      });
      setUploadState("success");

      // Add to recent activities
      setRecentActivities((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          file: previewUrl || "/mock-images/default.jpg",
          result: {
            disease: "Mock Disease",
            confidence: 90.0,
            description: "This is a simulated disease detection result.",
            treatment: "Simulated treatment advice.",
            prevention: ["Tip 1", "Tip 2", "Tip 3"],
          },
          timestamp: new Date(),
        },
      ]);
    }, 2000);
  };

  return (
    <DashboardWrapper userRole="user">
      <div className="flex flex-col space-y-6 p-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Disease Detector
          </h2>
          <p className="text-muted-foreground">
            Analyze plant health and detect diseases using AI-powered tools
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
            <TabsTrigger value="recent">Recent Activities</TabsTrigger>
          </TabsList>

          {/* Upload & Analyze Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700 dark:text-green-500">
                  Plant Disease Detection
                </CardTitle>
                <CardDescription>
                  Upload a photo of your plant to identify diseases and get
                  treatment recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg p-6 h-[300px]">
                  {previewUrl ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={previewUrl}
                        alt="Plant preview"
                        fill
                        className="object-contain"
                        onLoad={() => URL.revokeObjectURL(previewUrl)}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <ImageIcon className="h-16 w-16 mb-4 opacity-20" />
                      <p className="mb-2">
                        Upload a clear image of the affected plant
                      </p>
                      <p className="text-xs text-gray-400">
                        Supported formats: JPG, PNG
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <div className="flex gap-4 w-full">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Select Image
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Button>
                  <Button
                    className="flex-1 bg-[hsl(var(--green-600))] hover:bg-[hsl(var(--green-700))]"
                    disabled={!previewUrl || uploadState === "uploading"}
                    onClick={handleUpload}
                  >
                    {uploadState === "uploading" ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Detect Disease
                      </>
                    )}
                  </Button>
                </div>

                {uploadState === "error" && (
                  <div className="w-full p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    Error analyzing image. Please try again with a clearer
                    photo.
                  </div>
                )}
              </CardFooter>
            </Card>

            {/* Results Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700 dark:text-green-500">
                  Detection Results
                </CardTitle>
                <CardDescription>
                  AI-powered analysis of plant health and disease
                  identification.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <Check className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Disease Identified</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {result.disease} (Confidence: {result.confidence}%)
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-1">Description:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {result.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-1">
                        Recommended Treatment:
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {result.treatment}
                      </p>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">
                        Prevention Tips:
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc pl-4">
                        {result.prevention.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="h-[300px] flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon className="h-16 w-16 mb-4 opacity-20" />
                    <p className="text-center">
                      {uploadState === "uploading"
                        ? "Analyzing plant image..."
                        : "Upload a plant image to detect diseases and get treatment recommendations."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Activities Tab */}
          <TabsContent value="recent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>
                  View and manage your recent disease detection activities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Disease</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivities.length > 0 ? (
                      recentActivities.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell>
                            <Image
                              src={activity.file}
                              alt="Recent activity"
                              width={50}
                              height={50}
                              className="rounded-md object-cover"
                            />
                          </TableCell>
                          <TableCell>{activity?.result?.disease}</TableCell>
                          <TableCell>{activity?.result?.confidence}%</TableCell>
                          <TableCell>
                            {format(activity.timestamp, "MMM d, yyyy")}
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
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download Report
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          No recent activities found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardWrapper>
  );
}
