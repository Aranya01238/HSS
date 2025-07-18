"use client"

import { useState } from "react"
import { Search, Filter, Calendar, Clock, User, Phone, FileText, MoreVertical, Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReceptionistOfflinePatients() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const offlinePatients = [
    {
      id: "HSS-123456",
      name: "Rahul Sharma",
      age: 45,
      gender: "Male",
      phone: "+91 98765 43210",
      doctor: "Dr. Rajesh Kumar",
      specialty: "Cardiology",
      date: "May 15, 2023",
      time: "10:30 AM",
      status: "waiting",
      amount: 1200,
      tokenNumber: "A-12",
    },
    {
      id: "HSS-789012",
      name: "Priya Patel",
      age: 32,
      gender: "Female",
      phone: "+91 87654 32109",
      doctor: "Dr. Priya Sharma",
      specialty: "Dermatology",
      date: "May 15, 2023",
      time: "11:15 AM",
      status: "in-progress",
      amount: 1000,
      tokenNumber: "A-13",
    },
    {
      id: "HSS-345678",
      name: "Amit Singh",
      age: 28,
      gender: "Male",
      phone: "+91 76543 21098",
      doctor: "Dr. Vikram Singh",
      specialty: "Orthopedic",
      date: "May 15, 2023",
      time: "12:00 PM",
      status: "completed",
      amount: 1500,
      tokenNumber: "A-14",
    },
    {
      id: "HSS-901234",
      name: "Sneha Gupta",
      age: 35,
      gender: "Female",
      phone: "+91 65432 10987",
      doctor: "Dr. Ananya Patel",
      specialty: "Pediatrics",
      date: "May 15, 2023",
      time: "12:45 PM",
      status: "waiting",
      amount: 900,
      tokenNumber: "A-15",
    },
    {
      id: "HSS-567890",
      name: "Rajiv Malhotra",
      age: 52,
      gender: "Male",
      phone: "+91 54321 09876",
      doctor: "Dr. Rajesh Kumar",
      specialty: "Cardiology",
      date: "May 15, 2023",
      time: "2:30 PM",
      status: "cancelled",
      amount: 1200,
      tokenNumber: "A-16",
    },
  ]

  const filteredPatients = offlinePatients.filter(
    (patient) =>
      (statusFilter === "all" || patient.status === statusFilter) &&
      (patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-amber-500"
      case "in-progress":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "waiting":
        return { bg: "bg-amber-100", text: "text-amber-800", label: "Waiting" }
      case "in-progress":
        return { bg: "bg-blue-100", text: "text-blue-800", label: "In Progress" }
      case "completed":
        return { bg: "bg-green-100", text: "text-green-800", label: "Completed" }
      case "cancelled":
        return { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" }
      default:
        return { bg: "bg-gray-100", text: "text-gray-800", label: "Unknown" }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Offline Patient List</h1>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              className="pl-9 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="waiting">Waiting</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="overflow-hidden">
            <div className={`h-2 ${getStatusColor(patient.status)}`}></div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center">
                    <span className="mr-2">{patient.name}</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {patient.tokenNumber}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {patient.age} years, {patient.gender}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`${getStatusBadge(patient.status).bg} ${
                    getStatusBadge(patient.status).text
                  } hover:${getStatusBadge(patient.status).bg}`}
                >
                  {getStatusBadge(patient.status).label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{patient.doctor}</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{patient.specialty}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{patient.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{patient.time}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{patient.phone}</span>
                </div>
                <div className="pt-2 mt-2 border-t">
                  <p className="text-xs text-muted-foreground">Booking ID: {patient.id}</p>
                  <p className="font-medium mt-1">Amount: ₹{patient.amount}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" className="flex items-center">
                <Printer className="h-4 w-4 mr-1" />
                Print Token
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Change Status</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipt
                  </DropdownMenuItem>
                  <DropdownMenuItem>Reschedule</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No patients found matching your search.</p>
        </div>
      )}
    </div>
  )
}
