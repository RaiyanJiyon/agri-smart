"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ForumPost, { type Post } from "@/app/community/components/forum-post";
import TopContributors from "@/app/community/components/top-contributors";
import PopularTopics from "./components/popular-topics";
import { useState, useEffect } from "react";
import { NewDiscussionDialog } from "./components/new-discussion-dialog";
import Loading from "../loading";

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export default function CommunityPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        
        const transformedPosts = data.map((post: any) => ({
          id: post._id,
          title: post.title,
          content: post.content,
          author: post.author.name,
          avatar: post.author.avatar,
          time: formatTime(post.createdAt),
          replies: post.replies?.length || 0,
          likes: post.likes,
          tags: post.tags,
          expert: post.author.isExpert,
          comments: post.replies?.map((reply: any) => ({
            id: reply._id,
            author: reply.author.name,
            avatar: reply.author.avatar,
            content: reply.content,
            time: formatTime(reply.createdAt),
            likes: 0
          })) || []
        }));
        
        setPosts(transformedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
          {loading ? (
            <Loading />
          ) : (
            <ForumPost posts={posts} />
          )}
        </div>

        <div className="md:w-1/4 space-y-6">
          <TopContributors />
          <PopularTopics />
        </div>
      </div>

      <NewDiscussionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}