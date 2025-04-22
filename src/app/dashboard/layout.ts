import { useSession } from "next-auth/react"

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) {
    const {data: session} = useSession();
    // const userRole = session?.user.name
  } 