"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp, Award, Filter, Search, Send } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"

// Sample post type
type Post = {
  id: string
  title: string
  author: string
  avatar: string
  time: string
  replies: number
  likes: number
  tags: string[]
  expert: boolean
  comments?: Comment[]
}

// Sample comment type
type Comment = {
  id: string
  author: string
  avatar: string
  content: string
  time: string
  likes: number
}

const ForumPost = () => {
  // Sample data with unique IDs and comments
  const posts: Post[] = [
    {
      id: "post-1",
      title: "Best practices for organic pest control?",
      author: "Maria G.",
      avatar: "MG",
      time: "2 hours ago",
      replies: 8,
      likes: 12,
      tags: ["Organic", "Pest Control"],
      expert: true,
      comments: [
        {
          id: "comment-1",
          author: "John D.",
          avatar: "JD",
          content: "I've had great success using neem oil spray for aphids and other soft-bodied insects. It's completely organic and doesn't harm beneficial insects when used correctly.",
          time: "1 hour ago",
          likes: 3,
        },
        {
          id: "comment-2",
          author: "Priya K.",
          avatar: "PK",
          content: "Companion planting has worked wonders in my garden. Marigolds help repel nematodes, and nasturtiums act as trap crops for aphids.",
          time: "45 minutes ago",
          likes: 5,
        },
      ],
    },
    {
      id: "post-2",
      title: "Soil pH levels for growing blueberries",
      author: "John D.",
      avatar: "JD",
      time: "Yesterday",
      replies: 15,
      likes: 24,
      tags: ["Soil", "Berries"],
      expert: false,
      comments: [
        {
          id: "comment-3",
          author: "Maria G.",
          avatar: "MG",
          content: "Blueberries thrive in acidic soil with a pH between 4.5 and 5.5. I use sulfur to lower the pH in my garden beds.",
          time: "20 hours ago",
          likes: 7,
        },
      ],
    },
    {
      id: "post-3",
      title: "Water conservation techniques during drought",
      author: "Priya K.",
      avatar: "PK",
      time: "2 days ago",
      replies: 21,
      likes: 36,
      tags: ["Water", "Drought"],
      expert: true,
      comments: [],
    },
    {
      id: "post-4",
      title: "Early signs of tomato blight and prevention",
      author: "Carlos M.",
      avatar: "CM",
      time: "3 days ago",
      replies: 12,
      likes: 18,
      tags: ["Tomatoes", "Disease"],
      expert: false,
      comments: [],
    },
  ]

  // State to track which posts have their comments section open
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({})
  // State to track new comment text for each post
  const [newComments, setNewComments] = useState<Record<string, string>>({})

  // Toggle comments section for a specific post
  const toggleComments = (postId: string) => {
    setOpenComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  // Handle comment input change
  const handleCommentChange = (postId: string, value: string) => {
    setNewComments(prev => ({
      ...prev,
      [postId]: value
    }))
  }

  // Handle comment submission
  const submitComment = (postId: string) => {
    if (!newComments[postId]?.trim()) return

    // In a real app, you would send this to your API
    console.log(`New comment for post ${postId}: ${newComments[postId]}`)
    
    // Clear the input after submission
    setNewComments(prev => ({
      ...prev,
      [postId]: ""
    }))
  }

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
          {posts.map((post) => (
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
                        {post.avatar}
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

                {/* Comments section - only shown when toggled */}
                {openComments[post.id] && (
                  <div className="w-full mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <h4 className="text-sm font-medium mb-3">Comments ({post.replies})</h4>
                    
                    {/* Existing comments */}
                    <div className="space-y-4 mb-4">
                      {post.comments && post.comments.length > 0 ? (
                        post.comments.map(comment => (
                          <div key={comment.id} className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">{comment.avatar}</AvatarFallback>
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

                    {/* New comment input */}
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
          ))}
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

      <div className="flex justify-center mt-8">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  )
}

export default ForumPost
