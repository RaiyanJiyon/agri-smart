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
import { MessageSquare, ThumbsUp, Award, Filter, Search } from "lucide-react";

const ForumPost = () => {
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
          {[
            {
              title: "Best practices for organic pest control?",
              author: "Maria G.",
              avatar: "MG",
              time: "2 hours ago",
              replies: 8,
              likes: 12,
              tags: ["Organic", "Pest Control"],
              expert: true,
            },
            {
              title: "Soil pH levels for growing blueberries",
              author: "John D.",
              avatar: "JD",
              time: "Yesterday",
              replies: 15,
              likes: 24,
              tags: ["Soil", "Berries"],
              expert: false,
            },
            {
              title: "Water conservation techniques during drought",
              author: "Priya K.",
              avatar: "PK",
              time: "2 days ago",
              replies: 21,
              likes: 36,
              tags: ["Water", "Drought"],
              expert: true,
            },
            {
              title: "Early signs of tomato blight and prevention",
              author: "Carlos M.",
              avatar: "CM",
              time: "3 days ago",
              replies: 12,
              likes: 18,
              tags: ["Tomatoes", "Disease"],
              expert: false,
            },
          ].map((post, i) => (
            <Card key={i} className="hover:border-green-200 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg font-medium hover:text-green-700 dark:hover:text-green-500 cursor-pointer">
                    {post.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.replies}</span>
                    <ThumbsUp className="h-4 w-4 ml-2" />
                    <span>{post.likes}</span>
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
              <CardFooter className="pt-0 flex justify-between items-center">
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
  );
};

export default ForumPost;
