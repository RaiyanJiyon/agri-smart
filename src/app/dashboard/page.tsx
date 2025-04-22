import { redirect } from "next/navigation"

// Mock auth check - in a real app, this would check the user's role from your auth system
const getUserRole = (): "admin" | "user" => {
  // For demo purposes, we'll just return "user" or "admin"
  // In a real app, this would check authentication state
  return "user" // Change to "admin" to see the admin dashboard
}

export default function DashboardPage() {
  // Get the user role from your auth system
  const userRole = getUserRole()

  // Redirect to the appropriate dashboard
  if (userRole === "admin") {
    redirect("/dashboard/admin")
  } else {
    redirect("/dashboard/user")
  }

  // This will never be rendered, but is included for TypeScript
  return null
}
