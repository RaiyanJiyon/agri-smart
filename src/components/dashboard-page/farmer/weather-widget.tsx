import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, Wind, Droplets } from "lucide-react"

export default function WeatherWidget() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-green-700 dark:text-green-500">Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold">28°C</p>
              <p className="text-gray-500 dark:text-gray-400">Partly Cloudy</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your Location</p>
            </div>
            <Cloud className="h-16 w-16 text-blue-400" />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">Tomorrow</p>
              <Sun className="h-8 w-8 my-1 text-orange-400" />
              <p className="text-sm font-medium">30°C</p>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">Wed</p>
              <CloudRain className="h-8 w-8 my-1 text-blue-400" />
              <p className="text-sm font-medium">24°C</p>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">Thu</p>
              <Cloud className="h-8 w-8 my-1 text-blue-400" />
              <p className="text-sm font-medium">26°C</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Wind className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Wind</p>
                <p className="text-sm font-medium">12 km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Droplets className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Humidity</p>
                <p className="text-sm font-medium">68%</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
