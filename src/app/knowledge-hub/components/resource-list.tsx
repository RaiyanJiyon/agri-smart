"use client";

import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Resource } from "@/lib/types";
import { ResourceCard } from "./resource-card";

interface ResourceListProps {
  resources: Resource[];
}

export function ResourceList({ resources }: ResourceListProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleResources = showAll ? resources : resources.slice(0, 8);
  const canExpand = resources.length > 8 && !showAll;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Lightbulb className="mr-2 h-6 w-6 text-orange-500" />
          All Resources
        </h2>
        {canExpand && (
          <Button variant="outline" onClick={() => setShowAll(true)}>
            View All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleResources.map((resource) => (
          <ResourceCard key={resource._id} resource={resource} />
        ))}
      </div>
    </div>
  );
}
