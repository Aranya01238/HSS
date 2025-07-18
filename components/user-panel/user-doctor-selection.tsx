"use client"

import { Star, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UserDoctorSelectionProps {
  hospital: any
  onDoctorSelect: (doctor: any) => void
  onNavigate: (view: string) => void
}

export function UserDoctorSelection({ hospital, onDoctorSelect, onNavigate }: UserDoctorSelectionProps) {
  const doctors = [
    {
      id: "12345",
      name: "Dr. Rajesh Kumar",
      specialization: "Cardiology",
      experience: "15 years",
      rating: 4.8,
      reviews: 245,
      consultationFee: 1200,
      availability: ["Mon", "Wed", "Fri"],
      education: "MBBS, MD (Cardiology)",
      languages: ["English", "Hindi", "Tamil"],
    },
    {
      id: "23456",
      name: "Dr. Priya Sharma",
      specialization: "Dermatology",
      experience: "10 years",
      rating: 4.7,
      reviews: 189,
      consultationFee: 1000,
      availability: ["Tue", "Thu", "Sat"],
      education: "MBBS, MD (Dermatology)",
      languages: ["English", "Hindi", "Bengali"],
    },
    {
      id: "34567",
      name: "Dr. Vikram Singh",
      specialization: "Orthopedic",
      experience: "12 years",
      rating: 4.9,
      reviews: 312,
      consultationFee: 1500,
      availability: ["Mon", "Tue", "Thu", "Sat"],
      education: "MBBS, MS (Orthopedics)",
      languages: ["English", "Hindi", "Punjabi"],
    },
    {
      id: "45678",
      name: "Dr. Ananya Patel",
      specialization: "Pediatrics",
      experience: "8 years",
      rating: 4.6,
      reviews: 156,
      consultationFee: 900,
      availability: ["Mon", "Wed", "Fri", "Sat"],
      education: "MBBS, MD (Pediatrics)",
      languages: ["English", "Hindi", "Gujarati"],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <Button variant="ghost" className="mb-4 pl-0 flex items-center" onClick={() => onNavigate("bookAppointment")}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Hospitals
      </Button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">{hospital?.name || "Select a Doctor"}</h1>
        <p className="text-muted-foreground">{hospital?.address || "Choose from our specialists"}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">{doctor.name}</h3>
                  <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                </div>
                <Badge className="bg-primary hover:bg-primary">ID: {doctor.id}</Badge>
              </div>
            </CardHeader>

            <CardContent className="pb-2">
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-medium">{doctor.rating}</span>
                  </div>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{doctor.reviews} reviews</span>
                </div>

                <div>
                  <p className="text-sm">Experience: {doctor.experience}</p>
                  <p className="text-sm">Education: {doctor.education}</p>
                  <p className="text-sm">Languages: {doctor.languages.join(", ")}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {doctor.availability.map((day, index) => (
                    <Badge key={index} variant="outline" className="bg-muted/50">
                      {day}
                    </Badge>
                  ))}
                </div>

                <div className="pt-2 border-t">
                  <p className="font-semibold">Consultation Fee: ₹{doctor.consultationFee}</p>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full bg-primary hover:bg-secondary" onClick={() => onDoctorSelect(doctor)}>
                Book Appointment
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
