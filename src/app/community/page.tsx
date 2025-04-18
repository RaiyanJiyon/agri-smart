"use client"

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ForumPost from "@/app/community/components/forum-post";
import TopContributors from "@/app/community/components/top-contributors";
import PopularTopics from "./components/popular-topics";
import { useState } from "react";
import { toast } from "sonner";
import { NewDiscussionDialog } from "./components/new-discussion-dialog";

export default function CommunityPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle form submission
  const handleCreatePost = async (data: { postTitle: string; postContent: string; postTags?: string }) => {
    const { postTitle, postContent } = data;

    if (!postTitle.trim() || !postContent.trim()) {
      toast("Missing information", {
        description: "Please provide both a title and content for your post.",
      });
      return;
    }

    try {
      // TODO: real api will be added in here
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success message
      toast("Post created!", {
        description: "Your discussion has been posted successfully.",
      });
    } catch (error) {
      console.error(error);
      toast("Error", {
        description: "There was a problem creating your post. Please try again.",
      });
    }
  };

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
        onSubmit={handleCreatePost}
      />
    </div>
  );
}