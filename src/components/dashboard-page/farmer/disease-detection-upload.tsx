"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, ImageIcon, Loader2, AlertTriangle, Check } from "lucide-react"
import Image from "next/image"

type UploadState = "idle" | "uploading" | "success" | "error"
type DetectionResult = {
  disease: string
  confidence: number
  description: string
  treatment: string
} | null

export default function DiseaseDetectionUpload() {
  const [uploadState, setUploadState] = useState<UploadState>("idle")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [result, setResult] = useState<DetectionResult>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a preview URL
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setUploadState("idle")
    setResult(null)
  }

  const handleUpload = () => {
    if (!previewUrl) return

    setUploadState("uploading")
    setResult(null)

    // Simulate API call
    setTimeout(() => {
      setUploadState("success")
      setResult({
        disease: "Early Blight",
        confidence: 92.5,
        description:
          "Early blight is a common fungal disease that affects tomato plants. It's characterized by brown spots with concentric rings that appear on lower leaves first.",
        treatment:
          "Remove affected leaves, improve air circulation, apply fungicide, and rotate crops in future seasons.",
      })
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-green-700 dark:text-green-500">Plant Disease Detection</CardTitle>
          <CardDescription>
            Upload a photo of your plant to identify diseases and get treatment recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg p-6 h-[300px]">
            {previewUrl ? (
              <div className="relative w-full h-full">
                <Image src={previewUrl || "/placeholder.svg"} alt="Plant preview" fill className="object-contain" />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <ImageIcon className="h-16 w-16 mb-4 opacity-20" />
                <p className="mb-2">Upload a clear image of the affected plant</p>
                <p className="text-xs text-gray-400">Supported formats: JPG, PNG</p>
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
              <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
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

      <Card>
        <CardHeader>
          <CardTitle className="text-green-700 dark:text-green-500">Detection Results</CardTitle>
          <CardDescription>AI-powered analysis of plant health and disease identification</CardDescription>
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
                <p className="text-sm text-gray-600 dark:text-gray-300">{result.description}</p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Recommended Treatment:</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{result.treatment}</p>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Prevention Tips:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc pl-4">
                  <li>Ensure proper spacing between plants for good air circulation</li>
                  <li>Water at the base of plants to keep foliage dry</li>
                  <li>Remove and destroy infected plant debris</li>
                  <li>Practice crop rotation to prevent disease buildup in soil</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-[300px] flex flex-col items-center justify-center text-gray-400">
              <ImageIcon className="h-16 w-16 mb-4 opacity-20" />
              <p>Upload a plant image to detect diseases and get treatment recommendations</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
