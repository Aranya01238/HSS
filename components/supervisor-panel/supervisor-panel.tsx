"use client"

import { useState } from "react"
import { SupervisorHeader } from "./supervisor-header"
import { SupervisorSidebar } from "./supervisor-sidebar"
import { SupervisorOnlinePatients } from "./supervisor-online-patients"
import { SupervisorStaffManagement } from "./supervisor-staff-management"
import { SupervisorAnalytics } from "./supervisor-analytics"

type SupervisorView = "onlinePatients" | "staffManagement" | "analytics"

export function SupervisorPanel() {
  const [currentView, setCurrentView] = useState<SupervisorView>("onlinePatients")

  const navigateTo = (view: SupervisorView) => {
    setCurrentView(view)
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <SupervisorHeader />

      <div className="flex flex-1">
        <SupervisorSidebar currentView={currentView} onNavigate={navigateTo} />

        <main className="flex-1 p-6">
          {currentView === "onlinePatients" && <SupervisorOnlinePatients />}
          {currentView === "staffManagement" && <SupervisorStaffManagement />}
          {currentView === "analytics" && <SupervisorAnalytics />}
        </main>
      </div>
    </div>
  )
}
