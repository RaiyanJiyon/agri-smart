"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "/sliders/slider-1.jpg",
    title: "AI-Powered Farming Solutions",
    subtitle:
      "Make data-driven decisions for better yields and sustainable farming",
    cta: "Get Started",
    ctaLink: "/dashboard",
  },
  {
    id: 2,
    image: "/sliders/slider-2.jpg",
    title: "Detect Plant Diseases Instantly",
    subtitle:
      "Upload photos and get immediate diagnosis with treatment recommendations",
    cta: "Try Disease Detection",
    ctaLink: "/dashboard",
  },
  {
    id: 3,
    image: "/sliders/slider-3.jpg",
    title: "Join Our Farming Community",
    subtitle:
      "Connect with experts and fellow farmers to share knowledge and best practices",
    cta: "Join Community",
    ctaLink: "/community",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-md">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
                  {slide.subtitle}
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-[hsl(var(--green-600))] hover:bg-[hsl(var(--green-700))] text-white"
                >
                  <Link href={slide.ctaLink}>{slide.cta}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[hsl(var(--green-600))] hover:bg-[hsl(var(--green-700))] text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[hsl(var(--green-600))] hover:bg-[hsl(var(--green-700))] text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide
                ? "bg-[hsl(var(--green-600))] hover:bg-[hsl(var(--green-700))]"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
