"use client"

import { useState } from "react"
import { ReceptionistHeader } from "./receptionist-header"
import { ReceptionistSidebar } from "./receptionist-sidebar"
import { ReceptionistOfflineBooking } from "./receptionist-offline-booking"
import { ReceptionistOfflinePatients } from "./receptionist-offline-patients"

type ReceptionistView = "offlineBooking" | "offlinePatients"

export function ReceptionistPanel() {
  const [currentView, setCurrentView] = useState<ReceptionistView>("offlineBooking")

  const navigateTo = (view: ReceptionistView) => {
    setCurrentView(view)
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <ReceptionistHeader />

      <div className="flex flex-1">
        <ReceptionistSidebar currentView={currentView} onNavigate={navigateTo} />

        <main className="flex-1 p-6">
          {currentView === "offlineBooking" && <ReceptionistOfflineBooking />}

          {currentView === "offlinePatients" && <ReceptionistOfflinePatients />}
        </main>
      </div>
    </div>
  )
}
