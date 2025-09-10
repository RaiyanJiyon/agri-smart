import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="relative overflow-hidden px-4 py-20 text-white">
      {/* Background image and overlay to match testimonial styling */}
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url(/sliders/slider-3.jpg)" }}
        aria-hidden
      />
      <div className="absolute inset-0 h-full w-full bg-[hsl(var(--green-600))] opacity-75" aria-hidden />

      <div className="relative container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of farmers who are already using AgriSmart to
            increase yields, reduce costs, and farm more sustainably.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/dashboard">Start Free Trial</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-black"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-white/90">
            <CheckCircle2 className="h-5 w-5" />
            <span>No credit card required</span>
            <span className="mx-2">•</span>
            <CheckCircle2 className="h-5 w-5" />
            <span>14-day free trial</span>
            <span className="mx-2">•</span>
            <CheckCircle2 className="h-5 w-5" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
