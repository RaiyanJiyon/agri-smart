import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Leaf,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-green-600 text-white p-1.5 rounded-lg">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl text-green-700 dark:text-green-500">
                AgriSmart
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              AI-powered farming assistant helping farmers make data-driven
              decisions for better yields and sustainable practices.
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
              >
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-green-700 dark:text-green-500">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                "Home",
                "Features",
                "Dashboard",
                "Chatbot",
                "Community",
                "About",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-green-700 dark:text-green-500">
              Resources
            </h3>
            <ul className="space-y-2">
              {[
                "Blog",
                "Knowledge Base",
                "API Documentation",
                "Tutorials",
                "Case Studies",
                "FAQs",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-green-700 dark:text-green-500">
              Subscribe
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Stay updated with the latest agricultural insights and AgriSmart
              features.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Your email" className="pl-10" />
              </div>
              <Button className="bg-[hsl(var(--green-600))] hover:bg-[hsl(var(--green-700))]">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} AgriSmart. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-500"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-500"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-500"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
