import type React from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "AgriSmart Dashboard",
  description: "Manage your AgriSmart account and access personalized farming insights",
}

// Mock auth check - in a real app, this would check the user's role from your auth system
const getUserRole = (): "admin" | "user" => {
  // For demo purposes, we'll just return "user" or "admin"
  // In a real app, this would check authentication state
  return "user" // Change to "admin" to see the admin dashboard
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get the user role from your auth system
  const userRole = getUserRole()

  // Redirect to the appropriate dashboard
  if (userRole === "admin" && typeof window !== "undefined") {
    redirect("/dashboard/admin")
  } else if (userRole === "user" && typeof window !== "undefined") {
    redirect("/dashboard/user")
  }

  return <>{children}</>
}
