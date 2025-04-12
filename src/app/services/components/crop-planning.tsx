"use client";

import type React from "react";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
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
import { Slider } from "@/components/ui/slider";
import { Leaf, Droplets, ThermometerSun, Loader2 } from "lucide-react";
import { getCropRecommendations } from "@/lib/gemini";

export default function CropPlanning() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // State for sliders
  const [phLevel, setPhLevel] = useState(7.2);
  const [nitrogen, setNitrogen] = useState(120);
  const [phosphorus, setPhosphorus] = useState(85);
  const [potassium, setPotassium] = useState(40);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const prompt = `
    You are an agricultural expert AI.
    Given the following values, suggest 3 crops to grow, with reasoning:
    
    - Soil pH: ${phLevel}
    - Nitrogen: ${nitrogen} mg/kg
    - Phosphorus: ${phosphorus} mg/kg
    - Potassium: ${potassium} mg/kg
    - Average Temperature: 25°C
    - Rainfall: 1200mm
    - Soil Type: Loam
    
    Return your response as a short paragraph followed by a bullet list.
    `;

    try {
      const response = await getCropRecommendations(prompt);
      setResult(response);
    } catch (error) {
      setResult("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-green-700 dark:text-green-500">
            Crop Recommendation
          </CardTitle>
          <CardDescription>
            Enter your soil and climate data to get AI-powered crop
            recommendations
          </CardDescription>
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

            {/* Soil pH Level */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="ph-level">Soil pH Level</Label>
                <span className="text-sm text-gray-500">
                  {phLevel.toFixed(1)}
                </span>
              </div>
              <Slider
                value={[phLevel]}
                min={0}
                max={14}
                step={0.1}
                onValueChange={(value) => setPhLevel(value[0])}
              />
            </div>

            {/* Nitrogen */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="nitrogen">Nitrogen (mg/kg)</Label>
                <span className="text-sm text-gray-500">{nitrogen}</span>
              </div>
              <Slider
                value={[nitrogen]}
                min={0}
                max={300}
                step={1}
                onValueChange={(value) => setNitrogen(value[0])}
              />
            </div>

            {/* Phosphorus */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="phosphorus">Phosphorus (mg/kg)</Label>
                <span className="text-sm text-gray-500">{phosphorus}</span>
              </div>
              <Slider
                value={[phosphorus]}
                min={0}
                max={200}
                step={1}
                onValueChange={(value) => setPhosphorus(value[0])}
              />
            </div>

            {/* Potassium */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="potassium">Potassium (mg/kg)</Label>
                <span className="text-sm text-gray-500">{potassium}</span>
              </div>
              <Slider
                value={[potassium]}
                min={0}
                max={200}
                step={1}
                onValueChange={(value) => setPotassium(value[0])}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperature">Average Temperature (°C)</Label>
                <div className="flex items-center">
                  <ThermometerSun className="h-4 w-4 mr-2 text-orange-500" />
                  <Input
                    id="temperature"
                    type="number"
                    placeholder="Enter temperature"
                    defaultValue="25"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rainfall">Annual Rainfall (mm)</Label>
                <div className="flex items-center">
                  <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                  <Input
                    id="rainfall"
                    type="number"
                    placeholder="Enter rainfall"
                    defaultValue="1200"
                  />
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
          <CardTitle className="text-green-700 dark:text-green-500">
            Recommendation Results
          </CardTitle>
          <CardDescription>
            AI-generated crop recommendations based on your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-4">
              <ReactMarkdown>{result}</ReactMarkdown>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full mb-2">
                    <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="font-medium text-center">Wheat</p>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    High match
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full mb-2">
                    <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="font-medium text-center">Corn</p>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    Good match
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full mb-2">
                    <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="font-medium text-center">Soybeans</p>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    Good match
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[300px] flex flex-col items-center justify-center text-gray-400">
              <Leaf className="h-16 w-16 mb-4 opacity-20" />
              <p>
                Enter your soil and climate data to get personalized crop
                recommendations
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
