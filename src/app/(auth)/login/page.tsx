import Link from "next/link";
import { Leaf } from "lucide-react";
import LoginForm from "./components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 dark:bg-background p-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center">
            <div className="bg-[hsl(var(--green-600))] text-white p-1.5 rounded-lg">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="ml-2 font-bold text-2xl text-green-700 dark:text-green-500">
              AgriSmart
            </span>
          </Link>
          <h1 className="text-2xl font-bold mt-4">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to access your AgriSmart account
          </p>
        </div>

        {/* 👇 Client Component */}
        <LoginForm />
      </div>
    </div>
  );
}
