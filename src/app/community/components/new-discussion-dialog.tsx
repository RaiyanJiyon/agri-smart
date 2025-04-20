"use client"

import { Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  tags: z.string().min(1, { message: "Please include at least one tag" }), 
});

interface NewDiscussionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewDiscussionDialog({
  open,
  onOpenChange,
}: NewDiscussionDialogProps) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
  });

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (!data.title.trim() || !data.content.trim()) {
        toast("Missing information", {
          description: "Please provide both a title and content for your post.",
        });
        return;
      }

      // Get first two letters of name in uppercase if no image
      const avatarFallback = session?.user?.name 
        ? session.user.name
          .split(' ')
          .map(n => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()
        : 'US'; // Default if no name

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          tags: data.tags.split(',').map(tag => tag.trim()),
          author: {
            name: `${session?.user?.name}`,
            email: `${session?.user?.email}`,
            avatar: `${session?.user.image ? session.user.image : avatarFallback}`,
            isExpert: false
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create post');
      }

      toast.success("Post created successfully!");
      
      form.reset();
      onOpenChange(false);

    } catch (error) {
      console.error('Error:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "An unexpected error occurred"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Discussion</DialogTitle>
          <DialogDescription>
            Share your farming questions or insights with the community.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What's your question or topic?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide details about your question or share your knowledge..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Tags
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add tags separated by commas (e.g., Organic, Pest Control, Soil)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button 
                        type="submit" 
                        className="bg-green-600 hover:bg-green-700"
                        disabled={!session || isLoading || form.formState.isSubmitting}
                      >
                        {
                          form.formState.isSubmitting ? 
                          'Posting Discussion...' 
                          :
                          'Post Discussion'
                        }
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!session && (
                    <TooltipContent>
                      <p>You need to sign in to post a discussion</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}