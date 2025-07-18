"use client"

import { Users, Clipboard, Home, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface SupervisorSidebarProps {
  currentView: string
  onNavigate: (view: string) => void
}

export function SupervisorSidebar({ currentView, onNavigate }: SupervisorSidebarProps) {
  const router = useRouter()

  return (
    <div className="w-64 bg-white border-r shrink-0 hidden md:block">
      <div className="flex flex-col h-full">
        <div className="p-4">
          <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/")}>
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant={currentView === "onlinePatients" ? "default" : "ghost"}
            className={`w-full justify-start ${currentView === "onlinePatients" ? "bg-primary hover:bg-primary" : ""}`}
            onClick={() => onNavigate("onlinePatients")}
          >
            <Clipboard className="h-4 w-4 mr-2" />
            Online Patient List
          </Button>

          <Button
            variant={currentView === "staffManagement" ? "default" : "ghost"}
            className={`w-full justify-start ${currentView === "staffManagement" ? "bg-primary hover:bg-primary" : ""}`}
            onClick={() => onNavigate("staffManagement")}
          >
            <Users className="h-4 w-4 mr-2" />
            Staff Management
          </Button>

          <Button
            variant={currentView === "analytics" ? "default" : "ghost"}
            className={`w-full justify-start ${currentView === "analytics" ? "bg-primary hover:bg-primary" : ""}`}
            onClick={() => onNavigate("analytics")}
          >
            <BarChart className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </nav>

        <div className="p-4 border-t">
          <div className="text-xs text-muted-foreground mb-2">Logged in as: Supervisor</div>
          <Button
            variant="outline"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={() => router.push("/login")}
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  )
}
