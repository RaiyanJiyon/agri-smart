"use client";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { SignUpForm } from "./components/sign-up-form";

export default function SignUpPage() {
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const redirectPath = searchParams.get("redirect") || "/";

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 dark:bg-background p-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center">
            <div className="bg-[hsl(var(--green-600))] text-white p-1.5 rounded-lg">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="ml-2 font-bold text-2xl text-green-700 dark:text-green-500">
              AgriSmart
            </span>
          </Link>
          <h1 className="text-2xl font-bold mt-4">
            Create Your Farmer Account
          </h1>
          <p className="text-muted-foreground mt-2">
            Join thousands of farmers using AgriSmart to improve their farming
          </p>
        </div>

        <SignUpForm redirectPath={redirectPath} />
      </div>
    </div>
  );
}
