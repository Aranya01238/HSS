"use client"

import { useState } from "react"
import { UserHeader } from "./user-header"
import { UserSearch, type SearchParams } from "./user-search"
import { UserCategoryFilters } from "./user-category-filters"
import { UserHealthcareResults } from "./user-healthcare-results"
import { UserDashboard } from "./user-dashboard"
import { UserBookAppointment } from "./user-book-appointment"
import { UserDoctorSelection } from "./user-doctor-selection"
import { UserBookingForm } from "./user-booking-form"
import { UserPayment } from "./user-payment"
import { UserAppointments } from "./user-appointments"
import { UserLabTests } from "./user-lab-tests"
import { UserEmergencyBeds } from "./user-emergency-beds"
import { UserListCenter } from "./user-list-center"

type UserPanelView =
  | "home"
  | "dashboard"
  | "bookAppointment"
  | "doctorSelection"
  | "bookingForm"
  | "payment"
  | "appointments"
  | "doctorConsultation"
  | "labTests"
  | "emergencyBeds"
  | "listCenter"

export function UserPanel() {
  const [currentView, setCurrentView] = useState<UserPanelView>("home")
  const [selectedHospital, setSelectedHospital] = useState<any>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const [searchParams, setSearchParams] = useState<SearchParams | undefined>()
  const [activeCategory, setActiveCategory] = useState("all")

  const handleHospitalSelect = (hospital: any) => {
    setSelectedHospital(hospital)
    setCurrentView("doctorSelection")
  }

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor)
    setCurrentView("bookingForm")
  }

  const handleBookingSubmit = (details: any) => {
    setBookingDetails(details)
    setCurrentView("payment")
  }

  const handlePaymentComplete = () => {
    setCurrentView("appointments")
  }

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params)
    // If we're not already on the home view, navigate there
    if (currentView !== "home") {
      setCurrentView("home")
    }
  }

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category)
  }

  const navigateTo = (view: UserPanelView) => {
    setCurrentView(view)
  }

  return (
    <div className="min-h-screen bg-white">
      <UserHeader onNavigate={navigateTo} />

      {currentView === "home" && (
        <main className="container mx-auto px-4 py-6">
          <UserSearch onSearch={handleSearch} />
          <UserCategoryFilters onFilterChange={handleCategoryFilter} />
          <UserHealthcareResults
            onHospitalSelect={handleHospitalSelect}
            searchParams={searchParams}
            activeCategory={activeCategory}
          />
        </main>
      )}

      {currentView === "dashboard" && <UserDashboard onNavigate={navigateTo} />}

      {currentView === "bookAppointment" && (
        <UserBookAppointment onHospitalSelect={handleHospitalSelect} onNavigate={navigateTo} />
      )}

      {currentView === "doctorSelection" && (
        <UserDoctorSelection hospital={selectedHospital} onDoctorSelect={handleDoctorSelect} onNavigate={navigateTo} />
      )}

      {currentView === "bookingForm" && (
        <UserBookingForm
          doctor={selectedDoctor}
          hospital={selectedHospital}
          onSubmit={handleBookingSubmit}
          onNavigate={navigateTo}
        />
      )}

      {currentView === "payment" && (
        <UserPayment bookingDetails={bookingDetails} onComplete={handlePaymentComplete} onNavigate={navigateTo} />
      )}

      {currentView === "appointments" && <UserAppointments onNavigate={navigateTo} />}

      {currentView === "doctorConsultation" && (
        <main className="container mx-auto px-4 py-6">
          <UserSearch onSearch={handleSearch} />
          <UserCategoryFilters onFilterChange={handleCategoryFilter} />
          <UserHealthcareResults
            onHospitalSelect={handleHospitalSelect}
            searchParams={searchParams}
            activeCategory={activeCategory}
          />
        </main>
      )}

      {currentView === "labTests" && <UserLabTests onNavigate={navigateTo} />}

      {currentView === "emergencyBeds" && <UserEmergencyBeds onNavigate={navigateTo} />}

      {currentView === "listCenter" && <UserListCenter onNavigate={navigateTo} />}
    </div>
  )
}
