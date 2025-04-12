"use client";

import React, { useState } from "react";
import Image from "next/image";

// Importing UI components from your custom UI library
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ImageIcon, Loader2, AlertTriangle, Check } from "lucide-react";

type UploadState = "idle" | "uploading" | "success" | "error";
type DetectionResult = {
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
  prevention: string[];
} | null;

export default function DiseaseDetection() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<DetectionResult>(null);
  const [file, setFile] = useState<File | null>(null);

  // Handle file change: creates preview url and resets state.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    // Create a preview of the uploaded image
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    setUploadState("idle");
    setResult(null);
  };

  // Function that sends the base64 image to the API endpoint,
  // extracts the JSON from the response and updates the component state.
  const analyzeImageWithDeepSeek = async (imageBase64: string) => {
    setUploadState("uploading");
    setResult(null);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
            "HTTP-Referer": window.location.href,
            "X-Title": "AgriSmart Disease Detection",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-pro-exp-03-25:free",
            messages: [
              {
                role: "system",
                content: `You are an agricultural expert AI specialized in plant disease detection. 
                Analyze the provided plant image and respond with:
                1. Disease name (most likely)
                2. Confidence percentage (estimate)
                3. Detailed description of symptoms
                4. Recommended treatment plan
                5. Prevention tips (as bullet points)

                Format your response as JSON:
                {
                "disease": "Disease Name",
                "confidence": 85.5,
                "description": "Detailed description...",
                "treatment": "Recommended treatments...",
                "prevention": ["Tip 1", "Tip 2", "Tip 3"]
                }
                Respond ONLY with valid JSON.`,
              },
              {
                role: "user",
                content: `Analyze this plant image for diseases: ${imageBase64}`,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      // Extract JSON block from the response content
      const jsonStart = content.indexOf("{");
      const jsonEnd = content.lastIndexOf("}") + 1;
      const jsonString = content.slice(jsonStart, jsonEnd);

      const analysisResult = JSON.parse(jsonString);

      setResult({
        disease: analysisResult.disease,
        confidence: analysisResult.confidence,
        description: analysisResult.description,
        treatment: analysisResult.treatment,
        prevention: analysisResult.prevention,
      });
      setUploadState("success");
    } catch (error) {
      console.error("Analysis error:", error);
      setUploadState("error");
    }
  };

  // Read file and pass base64 representation to the analysis function.
  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result?.toString().split(",")[1] || "";
      analyzeImageWithDeepSeek(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Upload Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-700 dark:text-green-500">
            Plant Disease Detection
          </CardTitle>
          <CardDescription>
            Upload a photo of your plant to identify diseases and get treatment
            recommendations.
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
              onClick={() => document.getElementById("file-upload")?.click()}
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
              Error analyzing image. Please try again with a clearer photo.
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
            AI-powered analysis of plant health and disease identification.
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
                <h4 className="font-medium mb-1">Recommended Treatment:</h4>
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
    </div>
  );
}
