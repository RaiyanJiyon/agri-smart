"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: {
    name: string
    values: {
      x: string
      y: number
    }[]
  }[]
  showLegend?: boolean
  valueFormatter?: (value: number) => string
  colors?: string[]
}

export function LineChart({
  data,
  showLegend = true,
  valueFormatter = (value: number) => value.toString(),
  colors = ["stroke-green-500", "stroke-blue-500", "stroke-purple-500", "stroke-amber-500", "stroke-red-500"],
  className,
  ...props
}: LineChartProps) {
  // Find the maximum value to scale the chart
  const maxValue = Math.max(...data.flatMap((series) => series.values.map((item) => item.y)))

  // Get all unique x values across all series
  const allXValues = Array.from(new Set(data.flatMap((series) => series.values.map((item) => item.x))))

  // Sort x values if they are dates or numbers
  allXValues.sort()

  // Calculate points for each series
  const seriesPoints = data.map((series) => {
    const points: { x: number; y: number; value: number; label: string }[] = []

    allXValues.forEach((xValue, index) => {
      const dataPoint = series.values.find((item) => item.x === xValue)
      if (dataPoint) {
        points.push({
          x: index * (100 / (allXValues.length - 1 || 1)),
          y: 100 - (dataPoint.y / maxValue) * 100,
          value: dataPoint.y,
          label: xValue,
        })
      }
    })

    return points
  })

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {showLegend && (
        <div className="flex flex-wrap items-center gap-4">
          {data.map((series, seriesIndex) => (
            <div key={seriesIndex} className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-sm bg-${colors[seriesIndex % colors.length].split("-")[1]}`} />
              <span className="text-sm font-medium">{series.name}</span>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-md border bg-background">
        <div className="p-6">
          <div className="h-[200px] w-full relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-right text-sm text-muted-foreground pr-2">
              <span>{valueFormatter(maxValue)}</span>
              <span>{valueFormatter(maxValue / 2)}</span>
              <span>0</span>
            </div>

            {/* Grid lines */}
            <div className="absolute left-8 right-0 top-0 h-full flex flex-col justify-between">
              <div className="border-t border-dashed border-muted-foreground/20 w-full h-0"></div>
              <div className="border-t border-dashed border-muted-foreground/20 w-full h-0"></div>
              <div className="border-t border-dashed border-muted-foreground/20 w-full h-0"></div>
            </div>

            {/* X-axis labels */}
            <div className="absolute left-8 right-0 bottom-0 flex justify-between text-center text-sm text-muted-foreground pt-2">
              {allXValues.map((label) => (
                <span key={label} className="truncate">
                  {label}
                </span>
              ))}
            </div>

            {/* Lines */}
            <svg className="absolute left-8 right-0 top-0 h-[calc(100%-20px)] w-[calc(100%-8px)]">
              {seriesPoints.map((points, seriesIndex) => (
                <React.Fragment key={seriesIndex}>
                  {/* Line */}
                  <polyline
                    points={points.map((p) => `${p.x}% ${p.y}%`).join(" ")}
                    fill="none"
                    className={`${colors[seriesIndex % colors.length]} stroke-2`}
                  />

                  {/* Points */}
                  {points.map((point, pointIndex) => (
                    <circle
                      key={pointIndex}
                      cx={`${point.x}%`}
                      cy={`${point.y}%`}
                      r="3"
                      className={`fill-background ${colors[seriesIndex % colors.length]} stroke-2`}
                    >
                      <title>{`${point.label}: ${valueFormatter(point.value)}`}</title>
                    </circle>
                  ))}
                </React.Fragment>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
