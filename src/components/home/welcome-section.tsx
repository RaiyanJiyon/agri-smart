import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  Sprout,
  MapPin,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

const WelcomeSection = () => {
  return (
    <section className="py-16 md:py-20 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* Left: Friendly Farmer Image */}
        <div className="flex justify-center md:justify-start">
          <Image
            src="/farmers/farmer-solo.png"
            alt="Friendly farmer smiling"
            width={520}
            height={520}
            priority
            className="h-auto w-full max-w-md md:max-w-lg object-contain drop-shadow-sm"
          />
        </div>

        {/* Right: Content */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[hsl(var(--green-700))] dark:text-[hsl(var(--green-500))]">
              Welcome to AgriSmart Farming Assistance
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-prose">
              Empowering farmers with tools, insights, and expert advice to make
              smarter agricultural decisions.
            </p>
            {/* Signature */}
            <div className="pt-2">
              <Image
                src="/signature.png"
                alt="AgriSmart signature"
                width={220}
                height={80}
                className="w-40 md:w-48 h-auto object-contain opacity-90"
              />
            </div>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-1 gap-4 max-w-lg">
            <Link href="/about" aria-label="Explore Features">
              <Button
                className="w-full justify-between rounded-lg bg-[hsl(var(--green-600))] text-white hover:bg-[hsl(var(--green-600))]/90 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 py-8"
                size="lg"
              >
                <span className="inline-flex items-center gap-3">
                  <BarChart2 className="size-5" />
                  <span className="font-semibold">Explore Features</span>
                </span>
                <ChevronRight className="size-5 opacity-90" />
              </Button>
            </Link>

            <Link href="/dashboard/user/crop-recommendation" aria-label="Get Crop Advice">
              <Button
                className="w-full justify-between rounded-lg bg-[hsl(var(--green-600))] text-white hover:bg-[hsl(var(--green-600))]/90 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 py-8"
                size="lg"
              >
                <span className="inline-flex items-center gap-3">
                  <Sprout className="size-5" />
                  <span className="font-semibold">Get Crop Advice</span>
                </span>
                <ChevronRight className="size-5 opacity-90" />
              </Button>
            </Link>

            <Link href="/community" aria-label="Find Local Experts">
              <Button
                className="w-full justify-between rounded-lg bg-[hsl(var(--green-600))] text-white hover:bg-[hsl(var(--green-600))]/90 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 py-8"
                size="lg"
              >
                <span className="inline-flex items-center gap-3">
                  <MapPin className="size-5" />
                  <span className="font-semibold">Find Local Experts</span>
                </span>
                <ChevronRight className="size-5 opacity-90" />
              </Button>
            </Link>

            <Link href="/dashboard/user/ai-assistant" aria-label="Chat With Us">
              <Button
                className="w-full justify-between rounded-lg bg-[hsl(var(--green-600))] text-white hover:bg-[hsl(var(--green-600))]/90 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 py-8"
                size="lg"
              >
                <span className="inline-flex items-center gap-3">
                  <MessageSquare className="size-5" />
                  <span className="font-semibold">Chat With Us</span>
                </span>
                <ChevronRight className="size-5 opacity-90" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
