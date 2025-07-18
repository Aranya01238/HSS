"use client"

import { ArrowLeft, Calendar, Clock, MapPin, Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UserAppointmentsProps {
  onNavigate: (view: string) => void
}

export function UserAppointments({ onNavigate }: UserAppointmentsProps) {
  const appointments = [
    {
      id: "HSS-123456",
      doctor: "Dr. Rajesh Kumar",
      specialty: "Cardiology",
      hospital: "Arogya Multi-Specialty Hospital",
      date: "May 15, 2023",
      time: "10:30 AM",
      status: "upcoming",
      bookingDate: "May 10, 2023",
      amount: 1200,
    },
    {
      id: "HSS-789012",
      doctor: "Dr. Priya Sharma",
      specialty: "Dermatology",
      hospital: "Skin & Care Clinic",
      date: "June 22, 2023",
      time: "2:15 PM",
      status: "completed",
      bookingDate: "June 15, 2023",
      amount: 1000,
    },
    {
      id: "HSS-345678",
      doctor: "Dr. Vikram Singh",
      specialty: "Orthopedic",
      hospital: "Joint Care Center",
      date: "July 8, 2023",
      time: "11:00 AM",
      status: "cancelled",
      bookingDate: "July 1, 2023",
      amount: 1500,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <Button variant="ghost" className="mb-4 pl-0 flex items-center" onClick={() => onNavigate("home")}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Your Appointments</h1>
        <p className="text-muted-foreground">Manage your upcoming and past appointments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="overflow-hidden">
            <div
              className={`h  => (
          <Card key={appointment.id} className="overflow-hidden">
            <div className={\`h-2 ${
              appointment.status === "upcoming"
                ? "bg-primary"
                : appointment.status === "completed"
                  ? "bg-green-500"
                  : "bg-red-500"
            }`}
            ></div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{appointment.doctor}</CardTitle>
                <Badge
                  variant={appointment.status === "upcoming" ? "default" : "outline"}
                  className={
                    appointment.status === "completed"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : appointment.status === "cancelled"
                        ? "bg-red-100 text-red-800 hover:bg-red-100"
                        : ""
                  }
                >
                  {appointment.status === "upcoming"
                    ? "Upcoming"
                    : appointment.status === "completed"
                      ? "Completed"
                      : "Cancelled"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{appointment.hospital}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{appointment.time}</span>
                </div>
                <div className="pt-2 mt-2 border-t">
                  <p className="text-xs text-muted-foreground">Booking ID: {appointment.id}</p>
                  <p className="text-xs text-muted-foreground">Booked on: {appointment.bookingDate}</p>
                  <p className="font-medium mt-1">Amount: ₹{appointment.amount}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" className="flex items-center">
                <Download className="h-4 w-4 mr-1" />
                E-Receipt
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
