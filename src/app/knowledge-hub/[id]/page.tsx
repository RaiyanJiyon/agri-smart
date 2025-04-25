"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ResourceCard } from "../components/resource-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Play,
  Share2,
  Bookmark,
  ThumbsUp,
  Download,
  FileText,
  Video,
  ImageIcon,
  BarChart2,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Resource } from "@/lib/types";
import { categories } from "../data"; // Import the categories from your data file

export default function ResourceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [resource, setResource] = useState<Resource | null>(null);
  const [relatedResources, setRelatedResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  // Unwrap the params Promise using React.use()
  const resolveParams = use(params);
  const { id } = resolveParams;

  useEffect(() => {
    const fetchResourceAndRelated = async () => {
      try {
        // Fetch the main resource
        const response = await fetch(`/api/resources/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch resource data");
        }

        const data = await response.json();
        setResource(data);

        // Fetch related resources
        if (data) {
          // Fetch resources with the same category or tags
          const relatedResponse = await fetch("/api/resources");
          if (relatedResponse.ok) {
            const allResources = await relatedResponse.json();
            
            // Filter for related resources
            const related = allResources.data
              .filter(
                (r: Resource) =>
                  r._id !== id &&
                  (r.category === data.category ||
                    r.tags.some((tag: string) => data.tags.includes(tag)))
              )
              .slice(0, 3);

            setRelatedResources(related);
          }
        }
      } catch (error) {
        console.error("Error fetching resource:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResourceAndRelated();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-lg">Loading resource...</p>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          onClick={() => router.push("/knowledge-hub")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Knowledge Hub
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Resource Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The resource you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button
            onClick={() => router.push("/knowledge-hub")}
            className="bg-green-600 hover:bg-green-700"
          >
            Browse Knowledge Hub
          </Button>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.id === resource.category);
  const categoryName = category
    ? category.name
    : resource.category.replace("-", " ");

  const getTypeIcon = () => {
    switch (resource.type) {
      case "article":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "guide":
        return <FileText className="h-5 w-5" />;
      case "infographic":
        return <ImageIcon className="h-5 w-5" />;
      case "tool":
        return <BarChart2 className="h-5 w-5" />;
      case "webinar":
        return <Play className="h-5 w-5" />;
      case "case-study":
        return <Users className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="outline"
        onClick={() => router.push("/knowledge-hub")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Knowledge Hub
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="flex items-center gap-1">
                {getTypeIcon()}
                <span>
                  {resource.type.charAt(0).toUpperCase() +
                    resource.type.slice(1).replace("-", " ")}
                </span>
              </Badge>
              <Badge variant="secondary">{categoryName}</Badge>
              {resource.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(resource.datePublished).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              {resource.readTime && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {resource.readTime} read
                </div>
              )}
              {resource.videoLength && (
                <div className="flex items-center">
                  <Play className="h-4 w-4 mr-1" />
                  {resource.videoLength}
                </div>
              )}
              {resource.author && <div>By {resource.author}</div>}
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8 rounded-xl overflow-hidden">
            <Image
              src={resource.thumbnail || "/placeholder.svg"}
              alt={resource.title}
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Resource Content */}
          <div className="prose dark:prose-invert max-w-none mb-8">
            {resource.type === "video" || resource.type === "webinar" ? (
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-6">
                <iframe
                  width="560"
                  height="315"
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/7cEStg9OA2Q?si=mGSl6JzYHSI2kbfL"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            ) : resource.type === "infographic" ? (
              <div className="text-center mb-6">
                <Image
                  src={resource.thumbnail || "/placeholder.svg"}
                  alt={resource.title}
                  width={500}
                  height={500}
                  className="max-w-full h-auto mx-auto"
                />
              </div>
            ) : resource.type === "tool" ? (
              <div className="bg-muted p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-4">Interactive Tool</h3>
                <p className="mb-4">
                  This interactive tool would be embedded here.
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  Launch Tool
                </Button>
              </div>
            ) : null}

            <h2 className="text-2xl font-bold">Introduction</h2>
            <p>
              {resource.previewContent ||
                `This is where the full content of the ${resource.title} would be displayed. In a real implementation, this would be rich content stored in a database or CMS.`}
            </p>

            <p>
              Agriculture is not crop production as popular belief holds -
              it&apos;s the production of food and fiber from the world&apos;s
              land and waters. Without agriculture it is not possible to have a
              city, stock market, banks, university, church or army. Agriculture
              is the foundation of civilization and any stable economy.
            </p>

            <h2 className="text-2xl font-bold mt-4">Key Points</h2>
            <ul className="list-disc pl-4">
              <li>Important point about {resource.title}</li>
              <li>Another critical aspect to consider</li>
              <li>Best practices for implementation</li>
              <li>Common challenges and solutions</li>
            </ul>

            <h2 className="text-2xl font-bold mt-4">Detailed Analysis</h2>
            <p>
              Detailed analysis would go here, with specific information related
              to {resource.title}. This would include charts, tables, and other
              visual aids to help explain the concepts.
            </p>

            <h2 className="text-2xl font-bold mt-4">Conclusion</h2>
            <p>
              Summary of the key takeaways from this resource. Practical next
              steps for farmers to implement the knowledge gained from this
              resource.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4" />
              Helpful
            </Button>
            {(resource.type === "guide" || resource.type === "infographic") && (
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
            )}
          </div>

          {/* Author Info (if available) */}
          {resource.author && (
            <div className="bg-muted p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold mb-2">About the Author</h3>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl">
                  {resource.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-bold">{resource.author}</p>
                  {resource.authorRole && (
                    <p className="text-muted-foreground">
                      {resource.authorRole}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {/* Category Info */}
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Browse {categoryName}</h3>
            <p className="text-muted-foreground mb-4">
              {category?.description}
            </p>
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href={`/knowledge-hub?category=${resource.category}`}>
                View All {categoryName} Resources
              </Link>
            </Button>
          </div>

          {/* Related Resources */}
          {relatedResources.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Related Resources</h3>
              <div className="space-y-4">
                {relatedResources.map((related) => (
                  <ResourceCard key={related._id} resource={related} />
                ))}
              </div>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-900/30">
            <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Get the latest farming tips and resources delivered to your inbox.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3 py-2 border rounded-md"
              />
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* You should fetch more resources from your API instead */}
      {relatedResources.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            More Resources You Might Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedResources.length > 0 &&
              relatedResources.map((r) => (
                <ResourceCard key={r._id} resource={r} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
