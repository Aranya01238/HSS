"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Calendar, Clock, User, Info, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface UserBookingFormProps {
  doctor: any
  hospital: any
  onSubmit: (details: any) => void
  onNavigate: (view: string) => void
}

export function UserBookingForm({ doctor, hospital, onSubmit, onNavigate }: UserBookingFormProps) {
  const [date, setDate] = useState<Date>()
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [referralId, setReferralId] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [appointmentType, setAppointmentType] = useState<string>("new")
  const [showMap, setShowMap] = useState(true)

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const bookingDetails = {
      doctor,
      hospital,
      date,
      timeSlot,
      referralId,
      notes,
      appointmentType,
      totalAmount: calculateTotal(),
    }

    onSubmit(bookingDetails)
  }

  const calculateTotal = () => {
    let total = doctor?.consultationFee || 0

    // Add any additional fees or discounts here
    if (appointmentType === "emergency") {
      total += 500 // Emergency fee
    }

    return total
  }

  const isValidReferral = () => {
    // Check if referral ID matches the format (5 digits followed by "re")
    if (!referralId) return true
    const regex = /^\d{5}re$/
    return regex.test(referralId)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Button variant="ghost" className="mb-4 pl-0 flex items-center" onClick={() => onNavigate("doctorSelection")}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Doctors
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Book Your Appointment</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button id="date" variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Select Time Slot</Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.slice(0, 6).map((slot) => (
                    <Button
                      key={slot}
                      type="button"
                      variant={timeSlot === slot ? "default" : "outline"}
                      className={`text-xs ${timeSlot === slot ? "bg-primary hover:bg-primary" : ""}`}
                      onClick={() => setTimeSlot(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="referral" className="mr-2">
                  Referral ID (Optional)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Format: 12345re (5 digits followed by &quot;re&quot;)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="referral"
                placeholder="Enter referral ID (e.g., 12345re)"
                value={referralId}
                onChange={(e) => setReferralId(e.target.value)}
                className={!isValidReferral() ? "border-red-500" : ""}
              />
              {!isValidReferral() && (
                <p className="text-xs text-red-500">Invalid format. Use 5 digits followed by &quot;re&quot;</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Appointment Type</Label>
              <RadioGroup
                id="type"
                value={appointmentType}
                onValueChange={setAppointmentType}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new">New Consultation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="followup" id="followup" />
                  <Label htmlFor="followup">Follow-up</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="emergency" id="emergency" />
                  <Label htmlFor="emergency">Emergency (Additional ₹500)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any specific concerns or information for the doctor"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-secondary"
              disabled={!date || !timeSlot || !isValidReferral()}
            >
              Proceed to Payment
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">{doctor?.name}</h3>
                <p className="text-sm text-muted-foreground">{doctor?.specialization}</p>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>ID: {doctor?.id}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{date ? format(date, "PPP") : "Select a date"}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{timeSlot || "Select a time slot"}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span>Consultation Fee</span>
                  <span>₹{doctor?.consultationFee || 0}</span>
                </div>

                {appointmentType === "emergency" && (
                  <div className="flex justify-between mb-2">
                    <span>Emergency Fee</span>
                    <span>₹500</span>
                  </div>
                )}

                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total Amount</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>

              <div className="pt-4 text-sm text-muted-foreground">
                <p>* Payment will be processed via Razorpay UPI</p>
                <p>* Cancellation policy applies</p>
              </div>
            </CardContent>
          </Card>

          {/* Hospital Location Map */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>Hospital Location</span>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => setShowMap(!showMap)}>
                  {showMap ? "Hide Map" : "Show Map"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-1 text-primary" />
                  <span className="text-sm">{hospital?.address}</span>
                </div>

                {showMap && (
                  <div className="mt-2 rounded-md overflow-hidden border h-[200px] relative">
                    {/* This would be a real map in production */}
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium">{hospital?.name}</p>
                        <p className="text-xs text-muted-foreground">{hospital?.address}</p>
                      </div>
                    </div>
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Map+View"
                      alt="Hospital Location Map"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex justify-between text-sm pt-2">
                  <span className="text-muted-foreground">Distance: {hospital?.distance}</span>
                  <Button variant="link" size="sm" className="p-0 h-auto text-primary">
                    Get Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
