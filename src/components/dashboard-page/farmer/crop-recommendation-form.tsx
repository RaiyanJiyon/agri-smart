"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Leaf, Droplets, ThermometerSun, Loader2 } from "lucide-react"

export default function CropRecommendationForm() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setResult(
        "Based on your soil and climate data, we recommend planting Wheat, Corn, or Soybeans for optimal yield. Wheat is particularly well-suited for your soil pH and nitrogen levels.",
      )
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-green-700 dark:text-green-500">Crop Recommendation</CardTitle>
          <CardDescription>Enter your soil and climate data to get AI-powered crop recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter your location" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Field Area (hectares)</Label>
                <Input id="area" type="number" placeholder="Enter area" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="soil-type">Soil Type</Label>
              <Select defaultValue="loam">
                <SelectTrigger id="soil-type">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="loam">Loam</SelectItem>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="silt">Silt</SelectItem>
                  <SelectItem value="peaty">Peaty</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="ph-level">Soil pH Level</Label>
                <span className="text-sm text-gray-500">7.2</span>
              </div>
              <Slider defaultValue={[7.2]} min={0} max={14} step={0.1} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="nitrogen">Nitrogen (mg/kg)</Label>
                <span className="text-sm text-gray-500">120</span>
              </div>
              <Slider defaultValue={[120]} min={0} max={300} step={1} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="phosphorus">Phosphorus (mg/kg)</Label>
                <span className="text-sm text-gray-500">85</span>
              </div>
              <Slider defaultValue={[85]} min={0} max={200} step={1} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="potassium">Potassium (mg/kg)</Label>
                <span className="text-sm text-gray-500">40</span>
              </div>
              <Slider defaultValue={[40]} min={0} max={200} step={1} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperature">Average Temperature (°C)</Label>
                <div className="flex items-center">
                  <ThermometerSun className="h-4 w-4 mr-2 text-orange-500" />
                  <Input id="temperature" type="number" placeholder="Enter temperature" defaultValue="25" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rainfall">Annual Rainfall (mm)</Label>
                <div className="flex items-center">
                  <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                  <Input id="rainfall" type="number" placeholder="Enter rainfall" defaultValue="1200" />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            className="w-full bg-[hsl(var(--green-600))] hover:bg-[hsl(var(--green-700))]"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Leaf className="h-4 w-4 mr-2" />
                Get Recommendations
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-green-700 dark:text-green-500">Recommendation Results</CardTitle>
          <CardDescription>AI-generated crop recommendations based on your data</CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-4">
              <p>{result}</p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full mb-2">
                    <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="font-medium text-center">Wheat</p>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">High match</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full mb-2">
                    <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="font-medium text-center">Corn</p>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">Good match</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full mb-2">
                    <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="font-medium text-center">Soybeans</p>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">Good match</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[300px] flex flex-col items-center justify-center text-gray-400">
              <Leaf className="h-16 w-16 mb-4 opacity-20" />
              <p>Enter your soil and climate data to get personalized crop recommendations</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
