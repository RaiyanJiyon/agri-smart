"use client";

import { useState } from "react";
import { Resource } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories, ResourceCategory } from "../data";
import { ResourceCard } from "./resource-card";


export function SearchAndFilterClient({ resources }: { resources: Resource[] }) {
  const [activeCategory, setActiveCategory] = useState<ResourceCategory | "all">("all");

  const filteredResources = resources.filter((resource) => {
   

    const matchesCategory =
      activeCategory === "all" || resource.category === activeCategory;

    return matchesCategory;
  });

  return (
    <>
      <div className="mb-6">
        <Tabs
          defaultValue="all"
          onValueChange={(value) =>
            setActiveCategory(value as ResourceCategory | "all")
          }
        >
          <TabsList className="flex flex-wrap h-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {filteredResources.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No resources found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or browse different categories
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </div>
      )}
    </>
  );
}
