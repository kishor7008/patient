"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Save, X } from "lucide-react"
import type { Patient } from "@/types/patient"

interface PatientFormProps {
  patient?: Patient
  onSubmit: (patient: Patient | Omit<Patient, "id">) => void
  onCancel: () => void
}

export default function PatientForm({ patient, onSubmit, onCancel }: PatientFormProps) {
  const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0");
const sequenceNumber = "01"; // Replace this logic with an actual counter if needed

const caseNo = patient?.caseNo || `CASE${year}-${month}-P${sequenceNumber}`;

  const [formData, setFormData] = useState({
    caseNo: patient?.caseNo || caseNo,
    name: patient?.name || "",
    age: patient?.age || 0,
    gender: patient?.gender || ("Male" as "Male" | "Female" | "Other"),
    mobileNumber: patient?.mobileNumber || "",
    address: patient?.address || "",
    familyHistory: patient?.familyHistory || "",
    generalComplaint: patient?.generalComplaint || "",
    mothersName: patient?.mothersName || "",
    fathersName: patient?.fathersName || "",
    medicalHistory: patient?.medicalHistory || "",
    photo: patient?.photo || "",
    payment: patient?.payment || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (patient) {
      onSubmit({ ...formData, id: patient.id })
    } else {
      onSubmit(formData)
    }
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">📋 Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="caseNo" className="text-sm font-medium">
                  Case Number *
                </Label>
                <Input
                  id="caseNo"
                  value={formData.caseNo}
                  onChange={(e) => handleChange("caseNo", e.target.value)}
                  placeholder="Enter case number"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Patient Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter patient name"
                  className="mt-1"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age" className="text-sm font-medium">
                    Age *
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleChange("age", Number.parseInt(e.target.value) || 0)}
                    placeholder="Age"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender" className="text-sm font-medium">
                    Gender *
                  </Label>
                  <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="mobileNumber" className="text-sm font-medium">
                  Mobile Number *
                </Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => handleChange("mobileNumber", e.target.value)}
                  placeholder="Enter mobile number"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-sm font-medium">
                  Address
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Enter residential address"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">🏥 Medical Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="generalComplaint" className="text-sm font-medium">
                  General Complaint
                </Label>
                <Textarea
                  id="generalComplaint"
                  value={formData.generalComplaint}
                  onChange={(e) => handleChange("generalComplaint", e.target.value)}
                  placeholder="Why patient came / symptoms"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="medicalHistory" className="text-sm font-medium">
                  Medical History
                </Label>
                <Textarea
                  id="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={(e) => handleChange("medicalHistory", e.target.value)}
                  placeholder="Past illnesses/surgeries"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="familyHistory" className="text-sm font-medium">
                  Family History
                </Label>
                <Textarea
                  id="familyHistory"
                  value={formData.familyHistory}
                  onChange={(e) => handleChange("familyHistory", e.target.value)}
                  placeholder="Illness in family, if any"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Family Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">👨‍👩‍👧‍👦 Family Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="mothersName" className="text-sm font-medium">
                  Mother's Name
                </Label>
                <Input
                  id="mothersName"
                  value={formData.mothersName}
                  onChange={(e) => handleChange("mothersName", e.target.value)}
                  placeholder="Enter mother's name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="fathersName" className="text-sm font-medium">
                  Father's Name
                </Label>
                <Input
                  id="fathersName"
                  value={formData.fathersName}
                  onChange={(e) => handleChange("fathersName", e.target.value)}
                  placeholder="Enter father's name"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">💳 Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
             <div>
                <Label htmlFor="consultantFee" className="text-sm font-medium">
                  Consultantion Fees
                </Label>
                <Input
                  id="consultantFee"
                  value={formData.payment}
                  onChange={(e) => handleChange("consultantFee", e.target.value)}
                  placeholder="Paid amount"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="payment" className="text-sm font-medium">
                  Payment
                </Label>
                <Input
                  id="payment"
                  value={formData.payment}
                  onChange={(e) => handleChange("payment", e.target.value)}
                  placeholder="Paid amount / remarks"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="photo" className="text-sm font-medium">
                  Photo URL
                </Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="photo"
                    value={formData.photo}
                    onChange={(e) => handleChange("photo", e.target.value)}
                    placeholder="Patient photo URL (optional)"
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" size="sm" className="px-3">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 pb-8">
          <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 h-12 text-lg">
            <Save className="w-5 h-5 mr-2" />
            {patient ? "Update Patient" : "Add Patient"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1 h-12 text-lg">
            <X className="w-5 h-5 mr-2" />
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
