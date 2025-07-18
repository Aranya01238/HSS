"use client"

import { useState } from "react"
import { ArrowLeft, Search, MapPin, Phone, Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UserEmergencyBedsProps {
  onNavigate: (view: string) => void
}

export function UserEmergencyBeds({ onNavigate }: UserEmergencyBedsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState<string>("all")

  const emergencyHospitals = [
    {
      id: "EH001",
      name: "City General Hospital",
      address: "123 Emergency Lane, New Delhi",
      phone: "+91 98765 43210",
      totalBeds: 50,
      availableBeds: 12,
      waitTime: "10-15 min",
      location: "New Delhi",
      status: "available",
      distance: "2.3 km",
    },
    {
      id: "EH002",
      name: "Lifeline Medical Center",
      address: "456 Critical Care Road, Mumbai",
      phone: "+91 87654 32109",
      totalBeds: 30,
      availableBeds: 0,
      waitTime: "45-60 min",
      location: "Mumbai",
      status: "full",
      distance: "3.5 km",
    },
    {
      id: "EH003",
      name: "Arogya Emergency Hospital",
      address: "789 Urgent Street, Bangalore",
      phone: "+91 76543 21098",
      totalBeds: 40,
      availableBeds: 5,
      waitTime: "20-30 min",
      location: "Bangalore",
      status: "limited",
      distance: "1.8 km",
    },
    {
      id: "EH004",
      name: "Rapid Care Hospital",
      address: "101 Quick Response Avenue, Chennai",
      phone: "+91 65432 10987",
      totalBeds: 25,
      availableBeds: 8,
      waitTime: "15-20 min",
      location: "Chennai",
      status: "available",
      distance: "4.2 km",
    },
    {
      id: "EH005",
      name: "Emergency Medical Institute",
      address: "202 Urgent Care Street, Hyderabad",
      phone: "+91 54321 09876",
      totalBeds: 35,
      availableBeds: 2,
      waitTime: "30-40 min",
      location: "Hyderabad",
      status: "limited",
      distance: "2.7 km",
    },
    {
      id: "EH006",
      name: "Critical Care Center",
      address: "303 Emergency Road, Kolkata",
      phone: "+91 43210 98765",
      totalBeds: 20,
      availableBeds: 0,
      waitTime: "50-60 min",
      location: "Kolkata",
      status: "full",
      distance: "3.1 km",
    },
  ]

  const filteredHospitals = emergencyHospitals.filter(
    (hospital) =>
      (locationFilter === "all" || hospital.location === locationFilter) &&
      (hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-green-600"
      case "limited":
        return "text-amber-600"
      case "full":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "limited":
        return <AlertCircle className="h-5 w-5 text-amber-600" />
      case "full":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return null
    }
  }

  const getAvailabilityPercentage = (available: number, total: number) => {
    return (available / total) * 100
  }

  const getProgressColor = (percentage: number) => {
    if (percentage === 0) return "bg-red-600"
    if (percentage < 20) return "bg-amber-600"
    return "bg-green-600"
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Button variant="ghost" className="mb-4 pl-0 flex items-center" onClick={() => onNavigate("home")}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Emergency Beds Availability</h1>
        <p className="text-muted-foreground">Find available emergency beds in hospitals near you</p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div className="relative w-full md:w-auto md:flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search hospitals..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="New Delhi">New Delhi</SelectItem>
            <SelectItem value="Mumbai">Mumbai</SelectItem>
            <SelectItem value="Bangalore">Bangalore</SelectItem>
            <SelectItem value="Chennai">Chennai</SelectItem>
            <SelectItem value="Hyderabad">Hyderabad</SelectItem>
            <SelectItem value="Kolkata">Kolkata</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map((hospital) => {
          const availabilityPercentage = getAvailabilityPercentage(hospital.availableBeds, hospital.totalBeds)
          const progressColor = getProgressColor(availabilityPercentage)

          return (
            <Card key={hospital.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{hospital.name}</CardTitle>
                  <div className="flex items-center">
                    {getStatusIcon(hospital.status)}
                    <Badge
                      variant="outline"
                      className={`ml-2 ${
                        hospital.status === "available"
                          ? "bg-green-100 text-green-800"
                          : hospital.status === "limited"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {hospital.status === "available"
                        ? "Available"
                        : hospital.status === "limited"
                          ? "Limited"
                          : "Full"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{hospital.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{hospital.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Wait time: {hospital.waitTime}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Bed Availability</span>
                      <span className={`text-sm font-medium ${getStatusColor(hospital.status)}`}>
                        {hospital.availableBeds} / {hospital.totalBeds}
                      </span>
                    </div>
                    <Progress value={availabilityPercentage} className={progressColor} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-secondary" disabled={hospital.status === "full"}>
                  {hospital.status === "full" ? "No Beds Available" : "Book Emergency Bed"}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {filteredHospitals.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No emergency hospitals found matching your search.</p>
        </div>
      )}

      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-2" />
          <div>
            <h3 className="font-medium text-amber-800">Emergency Information</h3>
            <p className="text-sm text-amber-700 mt-1">
              In case of severe emergency, please call the national emergency number <strong>112</strong> or ambulance
              service <strong>108</strong> immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
