"use client"

import { useState } from "react"
import { ArrowLeft, Search, Filter, Clock, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UserLabTestsProps {
  onNavigate: (view: string) => void
}

export function UserLabTests({ onNavigate }: UserLabTestsProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const labTests = [
    {
      id: "LT001",
      name: "Complete Blood Count (CBC)",
      description:
        "Measures different components of blood including red and white blood cells, platelets, and hemoglobin.",
      price: 500,
      duration: "1 day",
      category: "blood",
    },
    {
      id: "LT002",
      name: "Lipid Profile",
      description: "Measures cholesterol levels including HDL, LDL, and triglycerides to assess heart health.",
      price: 800,
      duration: "1 day",
      category: "blood",
    },
    {
      id: "LT003",
      name: "Liver Function Test",
      description: "Assesses liver function by measuring enzymes, proteins, and bilirubin levels.",
      price: 1200,
      duration: "1-2 days",
      category: "blood",
    },
    {
      id: "LT004",
      name: "Thyroid Function Test",
      description: "Measures thyroid hormone levels to check for thyroid disorders.",
      price: 1500,
      duration: "1-2 days",
      category: "hormone",
    },
    {
      id: "LT005",
      name: "Vitamin D Test",
      description: "Measures vitamin D levels in the blood to check for deficiency.",
      price: 1800,
      duration: "2 days",
      category: "vitamin",
    },
    {
      id: "LT006",
      name: "HbA1c (Glycated Hemoglobin)",
      description: "Measures average blood sugar levels over the past 2-3 months.",
      price: 1000,
      duration: "1 day",
      category: "diabetes",
    },
    {
      id: "LT007",
      name: "X-Ray",
      description: "Imaging test that uses radiation to create pictures of the inside of the body.",
      price: 1200,
      duration: "Same day",
      category: "imaging",
    },
    {
      id: "LT008",
      name: "Ultrasound",
      description: "Imaging test that uses sound waves to create pictures of the inside of the body.",
      price: 2000,
      duration: "Same day",
      category: "imaging",
    },
    {
      id: "LT009",
      name: "MRI Scan",
      description: "Detailed imaging test that uses magnetic fields and radio waves to create detailed images.",
      price: 8000,
      duration: "1-2 days",
      category: "imaging",
    },
  ]

  const filteredTests = labTests.filter(
    (test) =>
      test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-6">
      <Button variant="ghost" className="mb-4 pl-0 flex items-center" onClick={() => onNavigate("home")}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Lab Tests & Diagnostics</h1>
        <p className="text-muted-foreground">Book diagnostic tests and health checkups</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tests..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Button variant="outline" className="ml-2" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Tests</TabsTrigger>
          <TabsTrigger value="blood">Blood Tests</TabsTrigger>
          <TabsTrigger value="imaging">Imaging</TabsTrigger>
          <TabsTrigger value="packages">Health Packages</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <Card key={test.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{test.name}</CardTitle>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {test.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground mb-4">{test.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Results in: {test.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Test ID: {test.id}</span>
                    </div>
                    <div className="pt-2 mt-2 border-t">
                      <p className="font-medium">Price: ₹{test.price}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary hover:bg-secondary">Book Test</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredTests.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No tests found matching your search.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="blood">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests
              .filter((test) => test.category === "blood")
              .map((test) => (
                <Card key={test.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{test.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground mb-4">{test.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Results in: {test.duration}</span>
                      </div>
                      <div className="pt-2 mt-2 border-t">
                        <p className="font-medium">Price: ₹{test.price}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-secondary">Book Test</Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="imaging">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests
              .filter((test) => test.category === "imaging")
              .map((test) => (
                <Card key={test.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{test.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground mb-4">{test.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Results in: {test.duration}</span>
                      </div>
                      <div className="pt-2 mt-2 border-t">
                        <p className="font-medium">Price: ₹{test.price}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-secondary">Book Test</Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="packages">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Basic Health Checkup</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive basic health checkup including CBC, Lipid Profile, and Liver Function Test.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>3 Tests Included</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Results in: 2 days</span>
                  </div>
                  <div className="pt-2 mt-2 border-t">
                    <p className="font-medium">Price: ₹2000</p>
                    <p className="text-xs text-muted-foreground">Save ₹500 on individual tests</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-secondary">Book Package</Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Comprehensive Health Checkup</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground mb-4">
                  Complete health assessment including blood tests, thyroid function, vitamin levels, and more.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>8 Tests Included</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Results in: 3 days</span>
                  </div>
                  <div className="pt-2 mt-2 border-t">
                    <p className="font-medium">Price: ₹5000</p>
                    <p className="text-xs text-muted-foreground">Save ₹1800 on individual tests</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-secondary">Book Package</Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Executive Health Checkup</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground mb-4">
                  Premium health assessment with all tests, doctor consultation, and personalized health report.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>12 Tests + Consultation</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Results in: 3-4 days</span>
                  </div>
                  <div className="pt-2 mt-2 border-t">
                    <p className="font-medium">Price: ₹10000</p>
                    <p className="text-xs text-muted-foreground">Save ₹3500 on individual tests</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-secondary">Book Package</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
