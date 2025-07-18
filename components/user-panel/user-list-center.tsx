"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Upload, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface UserListCenterProps {
  onNavigate: (view: string) => void
}

export function UserListCenter({ onNavigate }: UserListCenterProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast({
        title: "Application submitted",
        description: "We've received your application and will contact you soon.",
      })
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Button variant="ghost" className="mb-4 pl-0 flex items-center" onClick={() => onNavigate("home")}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">List Your Healthcare Center</h1>
        <p className="text-muted-foreground">Join our network of healthcare providers</p>
      </div>

      <Tabs defaultValue="register">
        <TabsList className="mb-6">
          <TabsTrigger value="register">Register Your Center</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="register">
          {isSubmitted ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-green-600">Application Submitted Successfully!</CardTitle>
                <CardDescription className="text-center">
                  Thank you for your interest in joining our healthcare network
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="rounded-full bg-green-100 p-3 mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-center mb-4">
                  We've received your application and our team will review it shortly. You can expect to hear from us
                  within 2-3 business days.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={() => onNavigate("home")}>Return to Home</Button>
              </CardFooter>
            </Card>
          ) : (
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Healthcare Center Information</CardTitle>
                  <CardDescription>Provide details about your healthcare center to get started</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="center-name">Center Name</Label>
                        <Input id="center-name" placeholder="Enter healthcare center name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="center-type">Center Type</Label>
                        <Select>
                          <SelectTrigger id="center-type">
                            <SelectValue placeholder="Select center type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hospital">Hospital</SelectItem>
                            <SelectItem value="clinic">Clinic</SelectItem>
                            <SelectItem value="diagnostic">Diagnostic Center</SelectItem>
                            <SelectItem value="specialty">Specialty Center</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Complete Address</Label>
                      <Textarea id="address" placeholder="Enter complete address" required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="City" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="State" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input id="pincode" placeholder="Pincode" required />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Contact Person Name</Label>
                        <Input id="contact-name" placeholder="Enter name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="designation">Designation</Label>
                        <Input id="designation" placeholder="Enter designation" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="Enter email address" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Enter phone number" required />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Center Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="specialties">Specialties Offered</Label>
                        <Select>
                          <SelectTrigger id="specialties">
                            <SelectValue placeholder="Select specialties" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multi">Multi-Specialty</SelectItem>
                            <SelectItem value="cardiology">Cardiology</SelectItem>
                            <SelectItem value="orthopedic">Orthopedic</SelectItem>
                            <SelectItem value="pediatric">Pediatric</SelectItem>
                            <SelectItem value="neurology">Neurology</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="doctors">Number of Doctors</Label>
                        <Input id="doctors" type="number" placeholder="Enter number of doctors" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="services">Services Offered</Label>
                      <Textarea id="services" placeholder="List the services offered at your center" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="documents">Upload Documents</Label>
                      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-1">
                          Drag and drop files here or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">Upload registration certificate, licenses, etc.</p>
                        <Input id="documents" type="file" multiple className="hidden" />
                        <Button variant="outline" size="sm" className="mt-4">
                          Browse Files
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-primary hover:bg-secondary" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          )}
        </TabsContent>

        <TabsContent value="benefits">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Increased Visibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get discovered by thousands of patients searching for healthcare services in your area. Our platform
                  helps you reach a wider audience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Streamlined Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our online booking system makes it easy for patients to schedule appointments, reducing administrative
                  work and phone calls.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access comprehensive tools to manage patient appointments, medical records, and follow-ups all in one
                  place.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analytics & Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Gain valuable insights into your center's performance with detailed analytics on patient visits,
                  popular services, and more.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Marketing Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Benefit from our marketing initiatives to promote healthcare services to potential patients in your
                  area.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dedicated Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our dedicated support team is available to help you with any questions or issues you may encounter
                  while using our platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">How long does the registration process take?</h3>
                <p className="text-sm text-muted-foreground">
                  The initial registration takes about 15-20 minutes to complete. After submission, our team reviews the
                  application within 2-3 business days.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">What documents are required for registration?</h3>
                <p className="text-sm text-muted-foreground">
                  You'll need to provide your center's registration certificate, medical licenses, tax identification
                  documents, and proof of address.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Are there any fees to list my center?</h3>
                <p className="text-sm text-muted-foreground">
                  Basic listing is free. We offer premium listing options with additional features for a monthly
                  subscription fee.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">How do I manage my center's information after listing?</h3>
                <p className="text-sm text-muted-foreground">
                  Once approved, you'll receive access to a dedicated dashboard where you can update your center's
                  information, services, and availability.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Can I integrate this with my existing systems?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we offer API integration with popular hospital management systems. Our technical team can assist
                  with the integration process.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="flex items-start max-w-md">
                <Info className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Have more questions? Contact our partner support team at{" "}
                  <span className="text-primary">partners@hindsvaasthseva.com</span> or call{" "}
                  <span className="text-primary">+91 1800-123-4567</span>
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
