"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/shared/mode-toggle";
import {
  Menu,
  Leaf,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  ShoppingCart,
} from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Community", href: "/community" },
  { name: "Knowledge Hub", href: "/knowledge-hub" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (!session?.user?.id) return;
      try {
        const res = await fetch(`/api/cart/${session.user.id}`);
        const data = await res.json();
        setCartCount(data.length || 0);
      } catch (error) {
        console.error("Failed to fetch cart count:", error);
      }
    };
    fetchCartCount();
  }, [session?.user?.id]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
    toast("You have been logged out successfully.", {
      description: "Redirecting to the sign-in page...",
    });
  };

  if (pathname.includes("/dashboard")) {
    return;
  }

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
          {/* Logo */}
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
          <nav className="hidden lg:flex items-center gap-6">
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
            {/* Dark Mode Toggle and Cart Button (Desktop) */}
            <div className="hidden lg:flex items-center gap-2">
              <ModeToggle />
              {session?.user && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="relative flex items-center gap-2"
                >
                  <Link href="/my-cart">
                    <ShoppingCart className="h-4 w-4" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </Button>
              )}
              {session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <span>{session?.user?.name}</span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link
                        href="dashboard/profile"
                        className="flex items-center cursor-pointer"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          Ctrl+P
                        </span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/dashboard/${session?.user.role}`}
                        className="flex items-center cursor-pointer"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          Ctrl+,
                        </span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Button
                        onClick={handleSignOut}
                        variant="ghost"
                        className="flex items-center cursor-pointer text-red-500 dark:text-red-400 w-full justify-start"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign out</span>
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <Link href="/login">
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </Link>
                </Button>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden flex items-center gap-2">
              <ModeToggle />
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full px-6">
                    {/* VisuallyHidden title */}
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
                    {session?.user && (
                      <div className="flex items-center gap-3 py-4 border-b border-gray-100 dark:border-gray-800">
                        <div>
                          <p className="font-medium">{session?.user?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {session?.user?.email}
                          </p>
                        </div>
                      </div>
                    )}
                    <nav className="flex flex-col gap-4 py-8">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsSheetOpen(false)} // Close the sheet on link click
                          className={`text-lg font-medium transition-colors hover:text-green-700 dark:hover:text-green-500 ${
                            pathname === item.href
                              ? "text-green-700 dark:text-green-500"
                              : "text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                      {session?.user && (
                        <>
                          <Link
                            href="/profile"
                            onClick={() => setIsSheetOpen(false)} // Close the sheet on link click
                            className="text-lg font-medium transition-colors hover:text-green-700 dark:hover:text-green-500 text-gray-600 dark:text-gray-300 flex items-center gap-2"
                          >
                            <User className="h-4 w-4" />
                            Profile
                          </Link>
                          <Link
                            href="/dashboard"
                            onClick={() => setIsSheetOpen(false)} // Close the sheet on link click
                            className="text-lg font-medium transition-colors hover:text-green-700 dark:hover:text-green-500 text-gray-600 dark:text-gray-300 flex items-center gap-2"
                          >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                          </Link>
                        </>
                      )}
                    </nav>
                    <div className="mt-auto flex flex-col gap-4 py-4">
                      {session?.user && (
                        <Link
                          href="/my-cart"
                          onClick={() => setIsSheetOpen(false)} // Close the sheet on link click
                          className="text-lg font-medium transition-colors hover:text-green-700 dark:hover:text-green-500 text-gray-600 dark:text-gray-300 flex items-center gap-2"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          My Cart
                          {cartCount > 0 && (
                            <span className="ml-auto bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {cartCount}
                            </span>
                          )}
                        </Link>
                      )}
                      {session?.user ? (
                        <Button
                          onClick={() => {
                            handleSignOut();
                            setIsSheetOpen(false); // Close the sheet on sign-out
                          }}
                          variant="outline"
                          className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          <span>Sign Out</span>
                        </Button>
                      ) : (
                        <Button
                          asChild
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <Link
                            href="/login"
                            className="flex items-center justify-center gap-2"
                          >
                            <User className="h-4 w-4" />
                            <span>Sign In</span>
                          </Link>
                        </Button>
                      )}
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
