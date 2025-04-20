"use client"

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ForumPost from "@/app/community/components/forum-post";
import TopContributors from "@/app/community/components/top-contributors";
import PopularTopics from "./components/popular-topics";
import { useState } from "react";
import { NewDiscussionDialog } from "./components/new-discussion-dialog";

export default function CommunityPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-500">
            Community Forum
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Connect with farmers and agricultural experts
          </p>
        </div>
        <Button
          className="mt-4 md:mt-0 bg-[hsl(var(--green-600))] hover:bg-[hsl(var(--green-700)))]"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Discussion
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/4">
          {/* Community Forum */}
          <ForumPost />
        </div>

        <div className="md:w-1/4 space-y-6">
          {/* Top Contributors */}
          <TopContributors />

          {/* Popular Topics */}
          <PopularTopics />
        </div>
      </div>

      {/* Use the NewDiscussionDialog component */}
      <NewDiscussionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}