"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface JobFormData {
  name: string
  age: string
  qualification: string
  graduation: string
  phoneNumber: string
  whatsappNumber: string
  sameAsPhone: boolean
}

interface UsthadJobFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: JobFormData) => void
  jobTitle: string
}

const UsthadJobForm = ({ isOpen, onClose, onSubmit, jobTitle }: UsthadJobFormProps) => {
  const [formData, setFormData] = useState<JobFormData>({
    name: "",
    age: "",
    qualification: "",
    graduation: "",
    phoneNumber: "",
    whatsappNumber: "",
    sameAsPhone: false,
  })

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("usthadJobFormData")
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setFormData(parsedData)
    }
  }, [])

  // Handle input changes
  const handleInputChange = (field: keyof JobFormData, value: string | boolean) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }

      // If sameAsPhone is checked, copy phone number to whatsapp
      if (field === "sameAsPhone" && value === true) {
        updated.whatsappNumber = updated.phoneNumber
      }

      // If phone number changes and sameAsPhone is checked, update whatsapp
      if (field === "phoneNumber" && updated.sameAsPhone) {
        updated.whatsappNumber = value as string
      }

      return updated
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Save to localStorage
    localStorage.setItem("usthadJobFormData", JSON.stringify(formData))

    // Submit the form
    onSubmit(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900 pr-8">Apply for {jobTitle}</DialogTitle>
            
          </div>
          <p className="text-sm text-gray-600">Please fill out the form below to apply for this position.</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                placeholder="Enter your full name"
                className="h-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium text-gray-700">
                Age *
              </Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                required
                placeholder="Enter your age"
                min="18"
                max="70"
                className="h-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualification" className="text-sm font-medium text-gray-700">
              Qualification *
            </Label>
            <Input
              id="qualification"
              value={formData.qualification}
              onChange={(e) => handleInputChange("qualification", e.target.value)}
              required
              placeholder="e.g., Alim, Hafiz, Masters in Islamic Studies"
              className="h-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="graduation" className="text-sm font-medium text-gray-700">
              Graduation Year *
            </Label>
            <Input
              id="graduation"
              type="number"
              value={formData.graduation}
              onChange={(e) => handleInputChange("graduation", e.target.value)}
              required
              placeholder="Enter graduation year"
              min="1980"
              max={new Date().getFullYear()}
              className="h-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
              Phone Number *
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              required
              placeholder="Enter your phone number"
              className="h-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <Checkbox
              id="sameAsPhone"
              checked={formData.sameAsPhone}
              onCheckedChange={(checked) => handleInputChange("sameAsPhone", checked as boolean)}
              className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
            />
            <Label htmlFor="sameAsPhone" className="text-sm text-gray-700 cursor-pointer">
              WhatsApp number is same as phone number
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsappNumber" className="text-sm font-medium text-gray-700">
              WhatsApp Number *
            </Label>
            <Input
              id="whatsappNumber"
              type="tel"
              value={formData.whatsappNumber}
              onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
              required
              placeholder="Enter your WhatsApp number"
              disabled={formData.sameAsPhone}
              className={`h-10 border-gray-200 focus:border-green-500 focus:ring-green-500 ${
                formData.sameAsPhone ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-11 border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 h-11 bg-green-600 hover:bg-green-700 text-white">
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UsthadJobForm
