"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Testimonials = () => {
  // Array of testimonial data
  const testimonials = [
    {
      quote:
        "AgriSmart's crop recommendations increased my wheat yield by 30% while using less water and fertilizer. The ROI has been incredible.",
      name: "John Deere",
      role: "Wheat Farmer, Kansas",
      imageSrc: "/farmers/farmer-1.jpg",
      rating: 5,
    },
    {
      quote:
        "The disease detection feature saved my tomato crop. I uploaded a photo of affected leaves and got an immediate diagnosis and treatment plan.",
      name: "Maria Rodriguez",
      role: "Organic Farmer, California",
      imageSrc: "/farmers/farmer-2.jpg",
      rating: 5,
    },
    {
      quote:
        "The weather forecasting is incredibly accurate. I've been able to plan my planting and harvesting with confidence, even in unpredictable seasons.",
      name: "Raj Patel",
      role: "Rice Farmer, India",
      imageSrc: "/farmers/farmer-3.jpg",
      rating: 4,
    },
  ];

  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index];

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="relative px-4 overflow-hidden min-h-screen flex items-center">
      {/* Background image with overlay to match the provided style */}
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url(/sliders/slider-2.jpg)" }}
        aria-hidden
      />
      <div className="absolute inset-0 h-full w-full bg-[hsl(var(--green-600))] opacity-75" aria-hidden />

      <div className="relative container mx-auto text-center text-white">
        {/* Single testimonial view */}
        <div className="max-w-3xl mx-auto">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full ring-4 ring-white/20 overflow-hidden relative">
              <Image
                src={current.imageSrc}
                alt={current.name}
                fill
                sizes="64px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Quote */}
          <p className="text-lg md:text-xl leading-8 md:leading-9 opacity-95">
            {"\u201C"}{current.quote}{"\u201D"}
          </p>

          {/* Name and role */}
          <div className="mt-6">
            <div className="text-xl md:text-2xl font-semibold">{current.name}</div>
            <div className="opacity-90">{current.role}</div>
          </div>

          {/* Stars */}
          <div className="mt-4 flex justify-center">
            {Array.from({ length: current.rating }).map((_, i) => (
              <Star key={`full-${i}`} className="h-5 w-5 text-yellow-300 fill-yellow-300" />
            ))}
            {Array.from({ length: 5 - current.rating }).map((_, i) => (
              <Star key={`empty-${i}`} className="h-5 w-5 text-white/40" />
            ))}
          </div>
        </div>

        {/* Prev/Next Controls */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimonial"
          className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-white text-[hsl(var(--green-700))] hover:bg-white/90 shadow"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next testimonial"
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-white text-[hsl(var(--green-700))] hover:bg-white/90 shadow"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button 
            asChild 
            size="lg"
            className="bg-[hsl(var(--green-600))] hover:bg-[hsl(var(--green-700))] text-white py-6"
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