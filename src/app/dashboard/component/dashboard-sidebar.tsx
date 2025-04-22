"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  Send,
  Upload,
  User,
  CreditCard,
  BarChart3,
  Flag,
  FileCog,
  BookOpen,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/shared/mode-toggle"


interface DashboardSidebarProps {
  userRole: "admin" | "user"
}

export function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  // Adapt to screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true)
      } else {
        setCollapsed(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Define navigation items based on user role
  const userNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard/user",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "AI Assistant",
      href: "/dashboard/user/ai-assistant",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Reports",
      href: "/dashboard/user/reports",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Inquiries",
      href: "/dashboard/user/inquiries",
      icon: <Send className="h-5 w-5" />,
    },
    {
      title: "Uploads",
      href: "/dashboard/user/uploads",
      icon: <Upload className="h-5 w-5" />,
    },
    {
      title: "Community",
      href: "/community",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Knowledge Hub",
      href: "/knowledge-hub",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Profile",
      href: "/dashboard/user/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Billing",
      href: "/dashboard/user/billing",
      icon: <CreditCard className="h-5 w-5" />,
    },
  ]

  const adminNavItems = [
    {
      title: "Overview",
      href: "/dashboard/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "User Management",
      href: "/dashboard/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "AI Usage Logs",
      href: "/dashboard/admin/logs",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Requests",
      href: "/dashboard/admin/requests",
      icon: <Send className="h-5 w-5" />,
    },
    {
      title: "Data Review",
      href: "/dashboard/admin/data-review",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Moderation",
      href: "/dashboard/admin/moderation",
      icon: <Flag className="h-5 w-5" />,
    },
    {
      title: "Billing",
      href: "/dashboard/admin/billing",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "System Settings",
      href: "/dashboard/admin/settings",
      icon: <FileCog className="h-5 w-5" />,
    },
  ]

  const navItems = userRole === "admin" ? adminNavItems : userNavItems

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-30 h-screen border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center px-4 border-b">
          {collapsed ? (
            <div className="flex items-center justify-center w-full">
              <div className="bg-green-600 text-white p-1.5 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 2s.5 2.25.5 4.5-.5 4.5-.5 4.5" />
                  <path d="M12 2s.5 2.25.5 4.5-.5 4.5-.5 4.5" />
                  <path d="M8 2s.5 2.25.5 4.5-.5 4.5-.5 4.5" />
                  <path d="M20 14c.5 0 1.5.5 1.5 2.5S20 20 20 20h-7" />
                  <path d="M20 14h-7c-1 0-1.5-.5-2.5-2-1-1.5-2-2-3.5-2s-2.5.5-2.5 2.5c0 3 2.5 9 2.5 9H11" />
                  <path d="M11 19.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                </svg>
              </div>
            </div>
          ) : (
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
              <div className="bg-green-600 text-white p-1.5 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 2s.5 2.25.5 4.5-.5 4.5-.5 4.5" />
                  <path d="M12 2s.5 2.25.5 4.5-.5 4.5-.5 4.5" />
                  <path d="M8 2s.5 2.25.5 4.5-.5 4.5-.5 4.5" />
                  <path d="M20 14c.5 0 1.5.5 1.5 2.5S20 20 20 20h-7" />
                  <path d="M20 14h-7c-1 0-1.5-.5-2.5-2-1-1.5-2-2-3.5-2s-2.5.5-2.5 2.5c0 3 2.5 9 2.5 9H11" />
                  <path d="M11 19.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                </svg>
              </div>
              <span className="text-green-700 dark:text-green-500">AgriSmart</span>
            </Link>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-16 -mr-3 h-6 w-6 rounded-full bg-background border"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          )}
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <ScrollArea className="flex-1 pt-4">
          <nav className="flex flex-col gap-1 px-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  collapsed && "justify-center px-0",
                )}
              >
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </ScrollArea>

        <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-green-100 text-green-700 text-sm">
                {userRole === "admin" ? "AD" : "JD"}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium leading-none">{userRole === "admin" ? "Admin User" : "John Doe"}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {userRole === "admin" ? "admin@agrismart.com" : "john@example.com"}
                </p>
              </div>
            )}
            {!collapsed && <ModeToggle />}
          </div>

          <Button
            variant="outline"
            size={collapsed ? "icon" : "default"}
            className={cn(
              "w-full text-muted-foreground hover:text-foreground hover:bg-accent",
              collapsed && "h-10 w-10",
            )}
          >
            <LogOut className={cn("h-4 w-4", !collapsed && "mr-2")} />
            {!collapsed && <span>Log out</span>}
          </Button>
        </div>
      </div>
    </aside>
  )
}
