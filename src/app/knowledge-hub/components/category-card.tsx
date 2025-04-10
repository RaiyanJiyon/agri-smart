"use client"

import type { CategoryInfo } from "../data"
import { Card, CardContent } from "@/components/ui/card"
import { Sprout, Beef, Mountain, Bug, Droplets, Leaf, Cpu, BarChart, Cloud, Tractor } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { JSX } from "react"

interface CategoryCardProps {
  category: CategoryInfo
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { id, name, description, icon, color } = category

  const getIcon = (): JSX.Element => {
    const props = { className: `h-6 w-6 text-${color}-600` }

    switch (icon) {
      case "Sprout":
        return <Sprout {...props} />
      case "Beef":
        return <Beef {...props} />
      case "Mountain":
        return <Mountain {...props} />
      case "Bug":
        return <Bug {...props} />
      case "Droplets":
        return <Droplets {...props} />
      case "Leaf":
        return <Leaf {...props} />
      case "Cpu":
        return <Cpu {...props} />
      case "BarChart":
        return <BarChart {...props} />
      case "Cloud":
        return <Cloud {...props} />
      case "Tractor":
        return <Tractor {...props} />
      default:
        return <Leaf {...props} />
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Link href={`/knowledge-hub/category/${id}`}>
        <Card
          className={`h-full border-${color}-100 dark:border-${color}-900/30 hover:border-${color}-200 dark:hover:border-${color}-800 transition-colors`}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/20 mb-4`}>{getIcon()}</div>
            <h3 className="font-semibold text-lg mb-2">{name}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
