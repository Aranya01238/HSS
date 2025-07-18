"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [supCredentials, setSupCredentials] = useState({
    username: "",
    password: "",
  })

  const [recCredentials, setRecCredentials] = useState({
    username: "",
    password: "",
  })

  const handleSupLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (supCredentials.username === "Sup1234" && supCredentials.password === "Sup1234") {
        toast({
          title: "Login Successful",
          description: "Welcome to the Supervisor Panel",
        })
        router.push("/supervisor")
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleRecLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (recCredentials.username === "Rec1234" && recCredentials.password === "Rec1234") {
        toast({
          title: "Login Successful",
          description: "Welcome to the Receptionist Panel",
        })
        router.push("/receptionist")
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Hind Svaasth Seva</span>
          </div>
          <Button variant="ghost" className="flex items-center" onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Staff Login</CardTitle>
            <CardDescription className="text-center">Login to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="supervisor" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="supervisor">Supervisor</TabsTrigger>
                <TabsTrigger value="receptionist">Receptionist</TabsTrigger>
              </TabsList>

              <TabsContent value="supervisor">
                <form onSubmit={handleSupLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="sup-username">Username</Label>
                    <Input
                      id="sup-username"
                      placeholder="Enter your username"
                      value={supCredentials.username}
                      onChange={(e) => setSupCredentials({ ...supCredentials, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sup-password">Password</Label>
                    <Input
                      id="sup-password"
                      type="password"
                      placeholder="Enter your password"
                      value={supCredentials.password}
                      onChange={(e) => setSupCredentials({ ...supCredentials, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-secondary" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login to Supervisor Panel"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="receptionist">
                <form onSubmit={handleRecLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="rec-username">Username</Label>
                    <Input
                      id="rec-username"
                      placeholder="Enter your username"
                      value={recCredentials.username}
                      onChange={(e) => setRecCredentials({ ...recCredentials, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rec-password">Password</Label>
                    <Input
                      id="rec-password"
                      type="password"
                      placeholder="Enter your password"
                      value={recCredentials.password}
                      onChange={(e) => setRecCredentials({ ...recCredentials, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-secondary" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login to Receptionist Panel"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-muted-foreground">
              <p>Demo Credentials:</p>
              <p>Supervisor: Sup1234 / Sup1234</p>
              <p>Receptionist: Rec1234 / Rec1234</p>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
