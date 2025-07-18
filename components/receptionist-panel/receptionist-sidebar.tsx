"use client"

import { CalendarPlus, Users, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface ReceptionistSidebarProps {
  currentView: string
  onNavigate: (view: string) => void
}

export function ReceptionistSidebar({ currentView, onNavigate }: ReceptionistSidebarProps) {
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
            variant={currentView === "offlineBooking" ? "default" : "ghost"}
            className={`w-full justify-start ${currentView === "offlineBooking" ? "bg-primary hover:bg-primary" : ""}`}
            onClick={() => onNavigate("offlineBooking")}
          >
            <CalendarPlus className="h-4 w-4 mr-2" />
            Offline Booking System
          </Button>

          <Button
            variant={currentView === "offlinePatients" ? "default" : "ghost"}
            className={`w-full justify-start ${currentView === "offlinePatients" ? "bg-primary hover:bg-primary" : ""}`}
            onClick={() => onNavigate("offlinePatients")}
          >
            <Users className="h-4 w-4 mr-2" />
            Offline Patient List
          </Button>
        </nav>

        <div className="p-4 border-t">
          <div className="text-xs text-muted-foreground mb-2">Logged in as: Receptionist</div>
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
