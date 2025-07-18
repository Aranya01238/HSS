"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

interface UserSearchProps {
  onSearch: (searchParams: SearchParams) => void
}

export interface SearchParams {
  location: string
  date: Date | undefined
  appointmentType: string
  hospitalType: string
}

export function UserSearch({ onSearch }: UserSearchProps) {
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()
  const [location, setLocation] = useState("")
  const [appointmentType, setAppointmentType] = useState("")
  const [hospitalType, setHospitalType] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Mock location suggestions
  const locationSuggestions = [
    "New Delhi, India",
    "Mumbai, Maharashtra",
    "Bangalore, Karnataka",
    "Chennai, Tamil Nadu",
    "Kolkata, West Bengal",
    "Hyderabad, Telangana",
    "Pune, Maharashtra",
    "Ahmedabad, Gujarat",
    "Jaipur, Rajasthan",
    "Lucknow, Uttar Pradesh",
  ]

  useEffect(() => {
    if (location.length > 2) {
      const filtered = locationSuggestions.filter((loc) => loc.toLowerCase().includes(location.toLowerCase()))
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }, [location])

  const handleSearch = () => {
    if (!location) {
      toast({
        title: "Location required",
        description: "Please enter a location to search",
        variant: "destructive",
      })
      return
    }

    onSearch({
      location,
      date,
      appointmentType,
      hospitalType,
    })

    toast({
      title: "Search completed",
      description: "Showing healthcare centers near " + location,
    })
  }

  const handleLocationSelect = (loc: string) => {
    setLocation(loc)
    setShowSuggestions(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Find Healthcare Services Near You</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="space-y-2 relative">
          <label className="text-sm font-medium">Nearby Centre</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter location"
              className="pl-9"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {showSuggestions && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-muted cursor-pointer"
                    onClick={() => handleLocationSelect(suggestion)}
                  >
                    <MapPin className="inline h-4 w-4 mr-2 text-muted-foreground" />
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Appointment Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Appointment Type</label>
          <Select onValueChange={setAppointmentType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consultation">Consultation</SelectItem>
              <SelectItem value="followup">Follow-up</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
              <SelectItem value="labtest">Lab Test</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Hospital Type</label>
          <Select onValueChange={setHospitalType}>
            <SelectTrigger>
              <SelectValue placeholder="Select hospital" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="government">Government</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="clinic">Clinic</SelectItem>
              <SelectItem value="speciality">Speciality</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button className="w-full md:w-auto md:px-8 bg-primary hover:bg-secondary" onClick={handleSearch}>
        <Search className="mr-2 h-4 w-4" />
        Search Healthcare
      </Button>
    </div>
  )
}
