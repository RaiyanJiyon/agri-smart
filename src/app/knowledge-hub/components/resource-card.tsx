"use client";

import type { Resource } from "../data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Play,
  FileText,
  BarChart2,
  ImageIcon,
  Video,
  Users,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const {
    id,
    title,
    description,
    type,
    thumbnail,
    author,
    datePublished,
    readTime,
    videoLength,
  } = resource;

  const getTypeIcon = () => {
    switch (type) {
      case "article":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "guide":
        return <FileText className="h-4 w-4" />;
      case "infographic":
        return <ImageIcon className="h-4 w-4" />;
      case "tool":
        return <BarChart2 className="h-4 w-4" />;
      case "webinar":
        return <Play className="h-4 w-4" />;
      case "case-study":
        return <Users className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeLabel = () => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ");
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link href={`/knowledge-hub/${id}`}>
        <Card className="h-full p-0 overflow-hidden hover:border-green-200 dark:hover:border-green-800 transition-colors">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={thumbnail || "/placeholder.svg"}
              alt={title}
              width={500}
              height={500}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
            {resource.featured && (
              <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">
                Featured
              </Badge>
            )}
            {resource.popular && (
              <Badge className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600">
                Popular
              </Badge>
            )}
          </div>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="flex items-center gap-1">
                {getTypeIcon()}
                <span>{getTypeLabel()}</span>
              </Badge>
              {(readTime || videoLength) && (
                <span className="text-xs text-muted-foreground flex items-center">
                  {readTime ? (
                    <>
                      <Clock className="h-3 w-3 mr-1" />
                      {readTime}
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3 mr-1" />
                      {videoLength}
                    </>
                  )}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {description}
            </p>
          </CardContent>
          <CardFooter className="px-4 py-3 border-t flex justify-between items-center">
            <div className="text-xs text-muted-foreground flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(datePublished).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
            {author && <div className="text-xs font-medium">{author}</div>}
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
