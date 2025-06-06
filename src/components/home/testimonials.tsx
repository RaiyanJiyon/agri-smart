import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";

const Testimonials = () => {
  // Array of testimonial data
  const testimonials = [
    {
      quote:
        "AgriSmart's crop recommendations increased my wheat yield by 30% while using less water and fertilizer. The ROI has been incredible.",
      name: "John Deere",
      role: "Wheat Farmer, Kansas",
      avatar: "JD",
      rating: 5,
    },
    {
      quote:
        "The disease detection feature saved my tomato crop. I uploaded a photo of affected leaves and got an immediate diagnosis and treatment plan.",
      name: "Maria Rodriguez",
      role: "Organic Farmer, California",
      avatar: "MR",
      rating: 5,
    },
    {
      quote:
        "The weather forecasting is incredibly accurate. I've been able to plan my planting and harvesting with confidence, even in unpredictable seasons.",
      name: "Raj Patel",
      role: "Rice Farmer, India",
      avatar: "RP",
      rating: 4,
    },
  ];

  return (
    <section className="py-20 bg-[hsl(var(--green-50))] dark:bg-[hsl(var(--green-900))]/10 px-4">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[hsl(var(--green-700))] dark:text-[hsl(var(--green-500))]">
            What Farmers Are Saying
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hear from farmers who have transformed their operations with AgriSmart
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ quote, name, role, avatar, rating }, index) => (
            <Card
              key={index}
              className="border-2 border-[hsl(var(--green-100))] dark:border-[hsl(var(--green-900))]/30 shadow-md hover:shadow-lg transition-all"
            >
              <CardHeader>
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                  {Array.from({ length: 5 - rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-gray-300 dark:text-gray-600"
                    />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  &quot;{quote}&quot;
                </p>
              </CardHeader>
              <CardContent>
                {/* Author Info */}
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-[hsl(var(--green-100))] dark:bg-[hsl(var(--green-800))] text-[hsl(var(--green-700))] dark:text-[hsl(var(--green-300))]">
                      {avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-[hsl(var(--green-700))] dark:text-[hsl(var(--green-300))]">
                      {name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button 
            asChild 
            size="lg"
            className="bg-[hsl(var(--green-600))] hover:bg-[hsl(var(--green-700))] text-white"
          >
            <Link href="/community">
              Read More Success Stories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;