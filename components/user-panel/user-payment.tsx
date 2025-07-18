"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

interface UserPaymentProps {
  bookingDetails: any
  onComplete: () => void
  onNavigate: (view: string) => void
}

export function UserPayment({ bookingDetails, onComplete, onNavigate }: UserPaymentProps) {
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success" | "failed">("pending")
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = () => {
    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus("success")
      setIsLoading(false)
    }, 2000)
  }

  useEffect(() => {
    if (paymentStatus === "success") {
      // Redirect to appointments after successful payment
      const timer = setTimeout(() => {
        onComplete()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [paymentStatus, onComplete])

  return (
    <div className="container mx-auto px-4 py-6">
      {paymentStatus === "pending" && (
        <Button variant="ghost" className="mb-4 pl-0 flex items-center" onClick={() => onNavigate("bookingForm")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Booking Form
        </Button>
      )}

      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {paymentStatus === "pending"
            ? "Complete Your Payment"
            : paymentStatus === "success"
              ? "Payment Successful"
              : "Payment Failed"}
        </h1>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {paymentStatus === "pending" ? "Payment Details" : paymentStatus === "success" ? "Thank You!" : "Oops!"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {paymentStatus === "pending" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Appointment Summary</h3>
                  <div className="text-sm space-y-1">
                    <p>Doctor: {bookingDetails?.doctor?.name}</p>
                    <p>Specialization: {bookingDetails?.doctor?.specialization}</p>
                    <p>Hospital: {bookingDetails?.hospital?.name}</p>
                    <p>Date: {bookingDetails?.date ? format(bookingDetails.date, "PPP") : ""}</p>
                    <p>Time: {bookingDetails?.timeSlot}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span>₹{bookingDetails?.totalAmount}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Payment Method</h3>
                  <div className="flex items-center justify-center p-4 border rounded-md bg-muted/30">
                    <img src="/placeholder.svg?height=40&width=120" alt="Razorpay UPI" className="h-10" />
                    <span className="ml-2 font-medium">UPI Payment</span>
                  </div>
                </div>
              </div>
            )}

            {paymentStatus === "success" && (
              <div className="text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                <div className="space-y-2">
                  <p className="font-medium">Your appointment has been booked successfully!</p>
                  <p className="text-sm text-muted-foreground">A confirmation has been sent to your email and phone.</p>
                </div>
                <div className="pt-4 border-t text-sm">
                  <p>Booking ID: HSS-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p>Amount Paid: ₹{bookingDetails?.totalAmount}</p>
                </div>
              </div>
            )}

            {paymentStatus === "failed" && (
              <div className="text-center space-y-4">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
                <div className="space-y-2">
                  <p className="font-medium">Your payment could not be processed.</p>
                  <p className="text-sm text-muted-foreground">Please try again or use a different payment method.</p>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter>
            {paymentStatus === "pending" && (
              <Button className="w-full bg-primary hover:bg-secondary" onClick={handlePayment} disabled={isLoading}>
                {isLoading ? "Processing..." : "Pay Now"}
              </Button>
            )}

            {paymentStatus === "success" && (
              <Button className="w-full" onClick={onComplete}>
                View Your Appointments
              </Button>
            )}

            {paymentStatus === "failed" && (
              <Button className="w-full" onClick={() => setPaymentStatus("pending")}>
                Try Again
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
