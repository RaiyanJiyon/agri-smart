"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Mic, ImageIcon, Bot, User } from "lucide-react";
import { marked } from "marked";
import DOMPurify from "dompurify";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  isHtml?: boolean;
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AgriSmart AI assistant. I specialize in agriculture, farming techniques, crop management, and livestock. How can I help with your farming questions today?",
      sender: "bot",
      timestamp: new Date(),
      isHtml: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [language, setLanguage] = useState("english");
  const [isLoading, setIsLoading] = useState(false);

  // Configure marked to use line breaks
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      isHtml: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call the DeepSeek R1 API
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
            "HTTP-Referer": window.location.href,
            "X-Title": "AgriSmart AI Assistant",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-pro-exp-03-25:free",
            messages: [
              {
                role: "system",
                content: `You are an agricultural expert assistant specialized in farming techniques, crop management, livestock, and agricultural technology. 
                Respond only to agriculture-related questions in ${language}. For non-agriculture questions, politely explain that you specialize in farming topics.
                Provide accurate, practical advice based on scientific farming practices. Use markdown formatting for better readability (headings, lists, bold text).`,
              },
              { role: "user", content: inputValue },
            ],
          }),
        }
      );

      const data = await response.json();
      const markdownResponse =
        data.choices?.[0]?.message?.content ||
        "I couldn't generate a response. Please try again with a farming-related question.";

      // Convert markdown to HTML and sanitize it
      const htmlResponse = DOMPurify.sanitize(marked.parse(markdownResponse));

      const botMessage: Message = {
        id: Date.now().toString(),
        content: htmlResponse,
        sender: "bot",
        timestamp: new Date(),
        isHtml: true,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, I encountered an error. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
        isHtml: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-700 dark:text-green-500">
              AgriSmart AI Assistant
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Get expert answers to your farming questions
            </p>
          </div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="border-2 border-green-100 dark:border-green-900/30 mb-4">
          <CardContent className="p-0">
            <ScrollArea className="h-[60vh] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-start gap-2 max-w-[80%] ${
                        message.sender === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar
                        className={
                          message.sender === "user"
                            ? "bg-green-100"
                            : "bg-green-600"
                        }
                      >
                        <AvatarFallback>
                          {message.sender === "user" ? (
                            <User className="h-5 w-5 text-green-700" />
                          ) : (
                            <Bot className="h-5 w-5 text-white" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          message.sender === "user"
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        {message.isHtml ? (
                          <div
                            className="prose prose-sm dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: message.content,
                            }}
                          />
                        ) : (
                          <p>{message.content}</p>
                        )}
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "user"
                              ? "text-green-100"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <Avatar className="bg-green-600">
                        <AvatarFallback>
                          <Bot className="h-5 w-5 text-white" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="rounded-2xl px-4 py-2 bg-gray-100 dark:bg-gray-800">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <Mic className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type your farming question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pr-12"
              disabled={isLoading}
            />
            <Button
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 h-8 w-8 p-0"
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Suggested farming questions:
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              "When should I plant wheat in my region?",
              "How to prevent pests in organic farming?",
              "Best irrigation practices for arid climates",
              "How to increase soil fertility naturally?",
            ].map((question, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setInputValue(question);
                }}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
