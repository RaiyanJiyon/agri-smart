import type React from "react"
import { DashboardSidebar } from "./dashboard-sidebar"

interface DashboardWrapperProps {
  children: React.ReactNode
  userRole: "admin" | "user"
}

export function DashboardWrapper({ children, userRole }: DashboardWrapperProps) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar userRole={userRole} />
      <div className="flex-1 ml-16 md:ml-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
