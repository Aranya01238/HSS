"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Heart, MapPin, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { SearchParams } from "./user-search"

interface UserHealthcareResultsProps {
  onHospitalSelect: (hospital: any) => void
  searchParams?: SearchParams
  activeCategory?: string
}

export function UserHealthcareResults({
  onHospitalSelect,
  searchParams,
  activeCategory = "all",
}: UserHealthcareResultsProps) {
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: "Children's Wellness Center",
      image: "/placeholder.svg?height=200&width=400",
      address: "123 Health Avenue, New Delhi",
      rating: 4.8,
      reviews: 245,
      badges: ["Premier", "Top Rated"],
      specialties: ["Pediatric", "Vaccination"],
      distance: "2.3 km",
      category: "pediatric",
      location: "New Delhi, India",
      type: "private",
    },
    {
      id: 2,
      name: "Cardio Care Hospital",
      image: "/placeholder.svg?height=200&width=400",
      address: "456 Medical Lane, Mumbai",
      rating: 4.6,
      reviews: 189,
      badges: ["24/7 Emergency"],
      specialties: ["Cardiology", "Cardiac Surgery"],
      distance: "3.5 km",
      category: "cardiology",
      location: "Mumbai, Maharashtra",
      type: "government",
    },
    {
      id: 3,
      name: "Arogya Multi-Specialty Hospital",
      image: "/placeholder.svg?height=200&width=400",
      address: "789 Wellness Road, Bangalore",
      rating: 4.9,
      reviews: 312,
      badges: ["Premier", "Government"],
      specialties: ["General Medicine", "Surgery", "Orthopedic"],
      distance: "1.8 km",
      category: "orthopedic",
      location: "Bangalore, Karnataka",
      type: "government",
    },
    {
      id: 4,
      name: "Neuro Health Institute",
      image: "/placeholder.svg?height=200&width=400",
      address: "101 Brain Street, Chennai",
      rating: 4.7,
      reviews: 156,
      badges: ["Specialized"],
      specialties: ["Neurology", "Neurosurgery"],
      distance: "4.2 km",
      category: "neurology",
      location: "Chennai, Tamil Nadu",
      type: "private",
    },
    {
      id: 5,
      name: "Skin & Care Clinic",
      image: "/placeholder.svg?height=200&width=400",
      address: "202 Glow Avenue, Hyderabad",
      rating: 4.5,
      reviews: 178,
      badges: ["Specialized"],
      specialties: ["Dermatology", "Cosmetic Dermatology"],
      distance: "2.7 km",
      category: "dermatology",
      location: "Hyderabad, Telangana",
      type: "clinic",
    },
    {
      id: 6,
      name: "City Diagnostic Center",
      image: "/placeholder.svg?height=200&width=400",
      address: "303 Test Road, Kolkata",
      rating: 4.4,
      reviews: 132,
      badges: ["24/7 Service"],
      specialties: ["Pathology", "Radiology", "Diagnostic"],
      distance: "3.1 km",
      category: "diagnostic",
      location: "Kolkata, West Bengal",
      type: "speciality",
    },
  ])

  const [filteredHospitals, setFilteredHospitals] = useState(hospitals)
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    let filtered = [...hospitals]

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((hospital) => hospital.category === activeCategory)
    }

    // Filter by search params if provided
    if (searchParams?.location) {
      filtered = filtered.filter((hospital) =>
        hospital.location.toLowerCase().includes(searchParams.location.toLowerCase()),
      )
    }

    if (searchParams?.hospitalType) {
      filtered = filtered.filter((hospital) => hospital.type === searchParams.hospitalType)
    }

    setFilteredHospitals(filtered)
  }, [activeCategory, searchParams, hospitals])

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Healthcare Centers Near You</h2>
        <span className="text-sm text-muted-foreground">{filteredHospitals.length} results found</span>
      </div>

      {filteredHospitals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No healthcare centers found matching your criteria.</p>
          <Button variant="link" className="mt-2" onClick={() => setFilteredHospitals(hospitals)}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => (
            <Card
              key={hospital.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onHospitalSelect(hospital)}
            >
              <div className="relative">
                <img
                  src={hospital.image || "/placeholder.svg"}
                  alt={hospital.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 flex flex-wrap gap-2">
                  {hospital.badges.map((badge, index) => (
                    <Badge key={index} className="bg-primary hover:bg-primary">
                      {badge}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 rounded-full"
                  onClick={(e) => toggleFavorite(hospital.id, e)}
                >
                  <Heart
                    className={`h-5 w-5 ${favorites.includes(hospital.id) ? "fill-primary text-primary" : "text-primary"}`}
                  />
                  <span className="sr-only">Add to favorites</span>
                </Button>
              </div>

              <CardHeader className="pb-2">
                <h3 className="text-lg font-bold">{hospital.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{hospital.address}</span>
                </div>
              </CardHeader>

              <CardContent className="pb-2">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-medium">{hospital.rating}</span>
                  </div>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{hospital.reviews} reviews</span>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{hospital.distance}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {hospital.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="bg-muted/50">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full bg-primary hover:bg-secondary" onClick={() => onHospitalSelect(hospital)}>
                  Book Appointment
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
