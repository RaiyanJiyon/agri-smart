"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Award, Filter, Search, Send } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";

export type Comment = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
};

export type Post = {
  id: string;
  title: string;
  content: string,
  author: string;
  avatar: string;
  time: string;
  replies: number;
  likes: number;
  tags: string[];
  expert: boolean;
  comments?: Comment[];
};

interface ForumPostProps {
  posts: Post[];
}

const ForumPost = ({ posts }: ForumPostProps) => {
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [newComments, setNewComments] = useState<Record<string, string>>({});

  const toggleComments = (postId: string) => {
    setOpenComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCommentChange = (postId: string, value: string) => {
    setNewComments(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  const submitComment = (postId: string) => {
    if (!newComments[postId]?.trim()) return;

    console.log(`New comment for post ${postId}: ${newComments[postId]}`);
    
    setNewComments(prev => ({
      ...prev,
      [postId]: ""
    }));
  };

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search discussions..." className="pl-10" />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="recent" className="w-full mb-6">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
          <TabsTrigger value="solved">Solved</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          {posts.length === 0 ? (
            <Card className="p-8 text-center text-gray-500">
              <p>No discussions found. Start the conversation!</p>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="hover:border-green-200 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg font-medium hover:text-green-700 dark:hover:text-green-500 cursor-pointer">
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <button 
                        onClick={() => toggleComments(post.id)}
                        className="flex items-center gap-1 hover:text-green-600 transition-colors"
                        aria-label="Show comments"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.replies}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-green-600 transition-colors ml-2">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                <div className="mb-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {post.content}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 mb-2">
                    {post.tags.map((tag, j) => (
                      <Badge
                        key={j}
                        variant="outline"
                        className="bg-green-50 dark:bg-green-900/20 hover:bg-green-100"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex flex-col w-full">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {post.author.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{post.author}</span>
                      {post.expert && (
                        <Badge className="bg-green-600 text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          Expert
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{post.time}</span>
                  </div>

                  {openComments[post.id] && (
                    <div className="w-full mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <h4 className="text-sm font-medium mb-3">Comments ({post.replies})</h4>
                      
                      <div className="space-y-4 mb-4">
                        {post.comments && post.comments.length > 0 ? (
                          post.comments.map(comment => (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">
                                  {comment.author.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-muted p-3 rounded-lg">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="font-medium text-sm">{comment.author}</span>
                                    <span className="text-xs text-gray-500">{comment.time}</span>
                                  </div>
                                  <p className="text-sm">{comment.content}</p>
                                </div>
                                <div className="flex gap-4 mt-1 ml-1">
                                  <button className="text-xs text-gray-500 hover:text-green-600 flex items-center gap-1">
                                    <ThumbsUp className="h-3 w-3" />
                                    <span>{comment.likes}</span>
                                  </button>
                                  <button className="text-xs text-gray-500 hover:text-green-600">Reply</button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
                        )}
                      </div>

                      <div className="flex gap-3 items-start">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">YO</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 relative">
                          <Textarea 
                            placeholder="Write a comment..." 
                            className="min-h-[80px] pr-10"
                            value={newComments[post.id] || ''}
                            onChange={(e) => handleCommentChange(post.id, e.target.value)}
                          />
                          <Button 
                            size="sm" 
                            className="absolute right-2 bottom-2 h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
                            onClick={() => submitComment(post.id)}
                            disabled={!newComments[post.id]?.trim()}
                          >
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send comment</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          <Card className="p-8 text-center text-gray-500">
            <p>Popular discussions will appear here</p>
          </Card>
        </TabsContent>

        <TabsContent value="unanswered" className="space-y-4">
          <Card className="p-8 text-center text-gray-500">
            <p>Unanswered discussions will appear here</p>
          </Card>
        </TabsContent>

        <TabsContent value="solved" className="space-y-4">
          <Card className="p-8 text-center text-gray-500">
            <p>Solved discussions will appear here</p>
          </Card>
        </TabsContent>
      </Tabs>

      {posts.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline">Load More</Button>
        </div>
      )}
    </div>
  );
};

export default ForumPost;