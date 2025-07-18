"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Clock, Info, CreditCard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function ReceptionistOfflineBooking() {
  const [date, setDate] = useState<Date>()
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [doctor, setDoctor] = useState<string>("")
  const [appointmentType, setAppointmentType] = useState<string>("new")
  const [paymentMethod, setPaymentMethod] = useState<string>("cash")
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    notes: "",
  })

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

  const doctors = [
    { id: "dr-rajesh", name: "Dr. Rajesh Kumar", specialty: "Cardiology", fee: 1200 },
    { id: "dr-priya", name: "Dr. Priya Sharma", specialty: "Dermatology", fee: 1000 },
    { id: "dr-vikram", name: "Dr. Vikram Singh", specialty: "Orthopedic", fee: 1500 },
    { id: "dr-ananya", name: "Dr. Ananya Patel", specialty: "Pediatrics", fee: 900 },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPatientDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSuccessDialogOpen(true)
  }

  const calculateTotal = () => {
    if (!doctor) return 0
    const selectedDoctor = doctors.find((d) => d.id === doctor)
    let total = selectedDoctor?.fee || 0

    if (appointmentType === "emergency") {
      total += 500 // Emergency fee
    }

    return total
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Offline Booking System</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Patient Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter patient name"
                      value={patientDetails.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Enter phone number"
                      value={patientDetails.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="Age"
                      value={patientDetails.age}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select onValueChange={(value) => setPatientDetails((prev) => ({ ...prev, gender: value }))}>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Enter address"
                      value={patientDetails.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Select Doctor</Label>
                    <Select onValueChange={setDoctor}>
                      <SelectTrigger id="doctor">
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doc) => (
                          <SelectItem key={doc.id} value={doc.id}>
                            {doc.name} - {doc.specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
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
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any specific concerns or information for the doctor"
                    value={patientDetails.notes}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payment">Payment Method</Label>
                  <RadioGroup
                    id="payment"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">Cash</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi">UPI</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span>Consultation Fee</span>
                    <span>₹{doctor ? doctors.find((d) => d.id === doctor)?.fee || 0 : 0}</span>
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
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-secondary"
                  disabled={!date || !timeSlot || !doctor || !patientDetails.name || !patientDetails.phone}
                >
                  Book Appointment
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {patientDetails.name && (
                <div className="space-y-1">
                  <h3 className="font-semibold">{patientDetails.name}</h3>
                  {patientDetails.age && patientDetails.gender && (
                    <p className="text-sm text-muted-foreground">
                      {patientDetails.age} years, {patientDetails.gender}
                    </p>
                  )}
                </div>
              )}

              {doctor && (
                <div className="space-y-1">
                  <h3 className="font-semibold">{doctors.find((d) => d.id === doctor)?.name}</h3>
                  <p className="text-sm text-muted-foreground">{doctors.find((d) => d.id === doctor)?.specialty}</p>
                </div>
              )}

              <div className="space-y-1 text-sm">
                {date && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{format(date, "PPP")}</span>
                  </div>
                )}
                {timeSlot && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{timeSlot}</span>
                  </div>
                )}
                {appointmentType && (
                  <div className="flex items-center">
                    <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      {appointmentType === "new"
                        ? "New Consultation"
                        : appointmentType === "followup"
                          ? "Follow-up"
                          : "Emergency"}
                    </span>
                  </div>
                )}
                {paymentMethod && (
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      {paymentMethod === "cash"
                        ? "Cash Payment"
                        : paymentMethod === "card"
                          ? "Card Payment"
                          : "UPI Payment"}
                    </span>
                  </div>
                )}
              </div>

              {(doctor || appointmentType === "emergency") && (
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment Booked Successfully</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-center mb-2">
              Appointment has been booked for {patientDetails.name} with {doctors.find((d) => d.id === doctor)?.name}.
            </p>
            <p className="text-center text-sm text-muted-foreground">
              {date && `Date: ${format(date, "PPP")}`} | Time: {timeSlot}
            </p>
            <p className="text-center font-semibold mt-4">
              Booking ID: HSS-{Math.floor(100000 + Math.random() * 900000)}
            </p>
          </div>
          <div className="flex justify-center">
            <Button className="bg-primary hover:bg-secondary" onClick={() => setIsSuccessDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
