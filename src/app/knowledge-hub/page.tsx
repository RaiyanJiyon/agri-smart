export const dynamic = "force-dynamic";

import { FeaturedResource } from "./components/featured-resource";
import { ResourceList } from "./components/resource-list";
import { Resource } from "@/lib/types";

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

      {/* All Resources */}
      {resources.length > 0 && (
        <ResourceList resources={resources} />
      )}
    </div>
  );
}
