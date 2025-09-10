"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setSubmitting(true);
    try {
      // TODO: Wire this up to your API endpoint, e.g., /api/auth/forgot-password
      // await fetch("/api/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
      await new Promise((r) => setTimeout(r, 800));
      setMessage("If an account exists for this email, we sent a password reset link.");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

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
        <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/70 backdrop-blur rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mt-1 text-green-800 dark:text-green-400">Reset your password</h1>
            <p className="text-muted-foreground mt-2">
              Enter your email address and we’ll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={submitting} className="w-full bg-[hsl(var(--green-600))] hover:bg-[hsl(var(--green-700))]">
              {submitting ? "Sending..." : "Send reset link"}
            </Button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">{message}</p>
          )}

          <div className="mt-6 text-center">
            <Link href="/login" className="text-green-700 dark:text-green-400 hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
