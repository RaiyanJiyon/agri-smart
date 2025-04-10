"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Lightbulb, Calendar } from "lucide-react";
import { categories, ResourceCategory, resources } from "./data";
import { FeaturedResource } from "./components/featured-resource";
import { CategoryCard } from "./components/category-card";
import { ResourceCard } from "./components/resource-card";

export default function KnowledgeHubPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    ResourceCategory | "all"
  >("all");

  const featuredResources = resources.filter((resource) => resource.featured);
  const popularResources = resources.filter((resource) => resource.popular);

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      searchTerm === "" ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      activeCategory === "all" || resource.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the filter above
  };

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

      {/* Search Bar */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for farming resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Search
          </Button>
        </form>
      </div>

      {/* Featured Resource */}
      {featuredResources.length > 0 && (
        <div className="mb-12">
          <FeaturedResource resource={featuredResources[0]} />
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
              <ResourceCard key={resource.id} resource={resource} />
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

      {/* All Resources with Tabs */}
      <div>
        <h2 className="text-2xl font-bold mb-6">All Resources</h2>

        <Tabs
          defaultValue="all"
          className="mb-6"
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
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
