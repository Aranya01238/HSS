"use client";

import { useState } from "react";
import {
  Heart,
  Menu,
  Globe,
  User,
  Stethoscope,
  FlaskRoundIcon as Flask,
  Bed,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
interface UserHeaderProps {
  onNavigate: (view: string) => void;
}

export function UserHeader({ onNavigate }: UserHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-2"
            onClick={() => onNavigate("home")}
            role="button"
          >
            <Image
              src="/logo.png"
              alt="Hind Svaasth Seva Logo"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Button
              variant="link"
              className="text-sm font-medium hover:text-primary flex items-center gap-1 p-0"
              onClick={() => onNavigate("doctorConsultation")}
            >
              <Stethoscope className="h-4 w-4" />
              Doctor Consultation
            </Button>
            <Button
              variant="link"
              className="text-sm font-medium hover:text-primary flex items-center gap-1 p-0"
              onClick={() => onNavigate("labTests")}
            >
              <Flask className="h-4 w-4" />
              Lab Tests
            </Button>
            <Button
              variant="link"
              className="text-sm font-medium hover:text-primary flex items-center gap-1 p-0"
              onClick={() => onNavigate("emergencyBeds")}
            >
              <Bed className="h-4 w-4" />
              Emergency Beds
            </Button>
            <Button
              variant="link"
              className="text-sm font-medium hover:text-primary flex items-center gap-1 p-0"
              onClick={() => onNavigate("listCenter")}
            >
              <Building className="h-4 w-4" />
              List Your Centre
            </Button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => {}}
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only">Change language</span>
            </Button>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex"
                onClick={() => (window.location.href = "/login")}
              >
                Staff Login
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => onNavigate("dashboard")}
              >
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-6 w-6 text-primary" />
                        <span className="text-lg font-bold">
                          Hind Svaasth Seva
                        </span>
                      </div>
                    </div>
                    <nav className="flex flex-col space-y-4 mt-4">
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => {
                          onNavigate("doctorConsultation");
                        }}
                      >
                        <Stethoscope className="h-5 w-5 mr-2" />
                        Doctor Consultation
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => {
                          onNavigate("labTests");
                        }}
                      >
                        <Flask className="h-5 w-5 mr-2" />
                        Lab Tests
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => {
                          onNavigate("emergencyBeds");
                        }}
                      >
                        <Bed className="h-5 w-5 mr-2" />
                        Emergency Beds
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => {
                          onNavigate("listCenter");
                        }}
                      >
                        <Building className="h-5 w-5 mr-2" />
                        List Your Centre
                      </Button>
                    </nav>
                    <div className="mt-auto pb-6">
                      <Button
                        className="w-full"
                        onClick={() => (window.location.href = "/login")}
                      >
                        Staff Login
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
