"use client";

import { SignUpForm } from "./components/sign-up-form";
import Image from "next/image";

export default function SignUpPage() {
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const redirectPath = searchParams.get("redirect") || "/";

  return (
    <div className="relative min-h-screen">
      <Image
        src="/auth-bg.jpg"
        alt="Background"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-10">
        <div className="w-full max-w-2xl bg-white/80 dark:bg-gray-900/70 backdrop-blur rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mt-1 text-green-800 dark:text-green-400">
              Create Your Farmer Account
            </h1>
            <p className="text-muted-foreground mt-2">
              Join thousands of farmers using AgriSmart to improve their farming
            </p>
          </div>
          <SignUpForm redirectPath={redirectPath} />
        </div>
      </div>
    </div>
  );
}
