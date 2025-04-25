import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Resource } from "@/lib/types";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedResourceProps {
  resource: Resource;
}

export function FeaturedResource({ resource }: FeaturedResourceProps) {
  const {
    _id,
    title,
    description,
    category,
    thumbnail,
    author,
    authorRole,
    datePublished,
    readTime,
    tags,
    previewContent,
  } = resource;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 bg-muted/50 rounded-xl overflow-hidden">
      <div className="lg:col-span-2 h-64 lg:h-full relative">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-4 left-4 bg-green-600 hover:bg-green-700">
          Featured
        </Badge>
      </div>
      <div className="lg:col-span-3 p-6 flex flex-col">
        <div className="mb-2">
          <Badge variant="outline">
            {category
              .replace("-", " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </Badge>
        </div>
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(datePublished).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
          {readTime && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {readTime}
            </div>
          )}
        </div>
        <p className="text-muted-foreground mb-4">
          {previewContent || description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        {author && (
          <div className="mt-auto mb-4">
            <p className="font-medium">{author}</p>
            {authorRole && (
              <p className="text-sm text-muted-foreground">{authorRole}</p>
            )}
          </div>
        )}
        <Button asChild className="w-fit bg-green-600 hover:bg-green-700">
          <Link href={`knowledge-hub/${_id}`}>
            Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
