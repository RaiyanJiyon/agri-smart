export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import { BookOpen, Lightbulb, Calendar } from "lucide-react";
import { categories } from "./data";
import { FeaturedResource } from "./components/featured-resource";
import { CategoryCard } from "./components/category-card";
import { ResourceCard } from "./components/resource-card";
import { Resource } from "@/lib/types";
import { SearchAndFilterClient } from "./components/search-and-filter";

// Server-side fetch
async function getResources(): Promise<Resource[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resources`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch resources");
  }
  const data = await res.json();
  return data.data;
}

export default async function KnowledgeHubPage() {
  const resources = await getResources();

  const featuredResources = resources.filter((r) => r?.featured);
  const popularResources = resources.filter((r) => r?.popular);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-500 mb-2">
          Knowledge Hub
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Educational resources to help you improve your farming practices
        </p>
      </div>

      {/* Featured Resource */}
      {featuredResources.length > 0 && (
        <div className="mb-12">
          <FeaturedResource resource={featuredResources[2]} />
        </div>
      )}

      {/* Categories */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <BookOpen className="mr-2 h-6 w-6 text-green-600" />
            Resource Categories
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      {/* Popular Resources */}
      {popularResources.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <Lightbulb className="mr-2 h-6 w-6 text-orange-500" />
              Popular Resources
            </h2>
            <Button variant="outline">View All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularResources.slice(0, 4).map((resource) => (
              <ResourceCard key={resource._id} resource={resource} />
            ))}
          </div>
        </div>
      )}

      {/* Seasonal Calendar */}
      <div className="mb-12 bg-muted/50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <Calendar className="mr-2 h-6 w-6 text-green-600" />
              Seasonal Farming Calendar
            </h2>
            <p className="text-muted-foreground">
              Plan your farming activities with our interactive seasonal
              calendar
            </p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            View Full Calendar
          </Button>
        </div>
        <div className="bg-card border rounded-lg p-4 h-64 flex items-center justify-center">
          <p className="text-muted-foreground">
            Interactive seasonal calendar visualization would appear here
          </p>
        </div>
      </div>

      {/* Search UI and Filter Tabs should be extracted to client components if needed */}
      <SearchAndFilterClient resources={resources} />
    </div>
  );
}
