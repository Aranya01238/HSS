"use client"

import { useState } from "react"
import { Plus, Calendar, Clock, User, MapPin, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface UserDashboardProps {
  onNavigate: (view: string) => void
}

export function UserDashboard({ onNavigate }: UserDashboardProps) {
  const [isAddHistoryOpen, setIsAddHistoryOpen] = useState(false)

  const appointments = [
    {
      id: "APT-001",
      doctor: "Dr. Rajesh Kumar",
      specialty: "Cardiology",
      hospital: "Arogya Multi-Specialty Hospital",
      date: "May 15, 2023",
      time: "10:30 AM",
      status: "completed",
    },
    {
      id: "APT-002",
      doctor: "Dr. Priya Sharma",
      specialty: "Dermatology",
      hospital: "Skin & Care Clinic",
      date: "June 22, 2023",
      time: "2:15 PM",
      status: "completed",
    },
    {
      id: "APT-003",
      doctor: "Dr. Vikram Singh",
      specialty: "Orthopedic",
      hospital: "Joint Care Center",
      date: "July 8, 2023",
      time: "11:00 AM",
      status: "completed",
    },
  ]

  const medicalHistory = [
    {
      id: "MH-001",
      issue: "Hypertension",
      cure: "Prescribed Amlodipine 5mg daily",
      doctor: "Dr. Rajesh Kumar",
      venue: "Arogya Multi-Specialty Hospital",
      date: "May 15, 2023",
    },
    {
      id: "MH-002",
      issue: "Eczema",
      cure: "Topical corticosteroid cream and antihistamines",
      doctor: "Dr. Priya Sharma",
      venue: "Skin & Care Clinic",
      date: "June 22, 2023",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <Button onClick={() => onNavigate("home")}>Back to Home</Button>
      </div>

      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">Appointment History</TabsTrigger>
          <TabsTrigger value="medical-history">Medical History</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{appointment.doctor}</CardTitle>
                    <Badge
                      variant={appointment.status === "completed" ? "outline" : "default"}
                      className={
                        appointment.status === "completed" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                      }
                    >
                      {appointment.status === "completed" ? "Completed" : "Upcoming"}
                    </Badge>
                  </div>
                  <CardDescription>{appointment.specialty}</CardDescription>
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
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="medical-history" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Dialog open={isAddHistoryOpen} onOpenChange={setIsAddHistoryOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-secondary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medical History
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add Medical History</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="issue">Medical Issue</Label>
                    <Input id="issue" placeholder="Enter medical issue" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cure">Treatment/Cure</Label>
                    <Textarea id="cure" placeholder="Enter treatment details" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="doctor">Doctor</Label>
                    <Input id="doctor" placeholder="Enter doctor's name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="venue">Venue</Label>
                    <Input id="venue" placeholder="Enter hospital/clinic name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddHistoryOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-primary hover:bg-secondary" onClick={() => setIsAddHistoryOpen(false)}>
                    Save
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medicalHistory.map((history) => (
              <Card key={history.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{history.issue}</CardTitle>
                  <CardDescription>{history.date}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start">
                      <FileText className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                      <span>{history.cure}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{history.doctor}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{history.venue}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <X className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
