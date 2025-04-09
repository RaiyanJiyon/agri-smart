"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { LanguageToggle } from "@/components/shared/language-toggle";
import { Menu, Leaf, User } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Chatbot", href: "/chatbot" },
  { name: "Community", href: "/community" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm"
          : "bg-white dark:bg-gray-950"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-[hsl(var(--green-600))] text-white p-1.5 rounded-lg">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl text-green-700 dark:text-green-500">
                AgriSmart
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-green-700 dark:hover:text-green-500 ${
                  pathname === item.href
                    ? "text-green-700 dark:text-green-500"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <ModeToggle />
              <LanguageToggle />
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link href={'/sign-in'}>
                <User className="h-4 w-4" />
                <span>Sign In</span>
                </Link>
              </Button>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center gap-2">
              <ModeToggle />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full px-6">
                    {/* Add a VisuallyHidden title */}
                    <VisuallyHidden>
                      <h2>Menu</h2>
                    </VisuallyHidden>

                    <div className="flex items-center justify-between py-4">
                      <Link href="/" className="flex items-center gap-2">
                        <div className="bg-[hsl(var(--green-600))] text-white p-1.5 rounded-lg">
                          <Leaf className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-xl text-green-700 dark:text-green-500">
                          AgriSmart
                        </span>
                      </Link>
                    </div>
                    <nav className="flex flex-col gap-4 py-8">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`text-lg font-medium transition-colors hover:text-green-700 dark:hover:text-green-500 ${
                            pathname === item.href
                              ? "text-green-700 dark:text-green-500"
                              : "text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                    <div className="mt-auto flex flex-col gap-4 py-4">
                      <LanguageToggle />
                      <Button
                        asChild
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Link
                          href="/sign-in"
                          className="flex items-center justify-center gap-2"
                        >
                          <User className="h-4 w-4" />
                          <span>Sign In</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
