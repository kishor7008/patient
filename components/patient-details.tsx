"use client"

import { Edit, Trash2, User, Phone, MapPin, Heart, Users, CreditCard, Share, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Patient } from "@/types/patient"

interface PatientDetailsProps {
  patient: Patient
  onEdit: () => void
  onDelete: () => void
  onBack?: () => void
}

export default function PatientDetails({ patient, onEdit, onDelete, onBack }: PatientDetailsProps) {
  const handleCall = () => {
    window.location.href = `tel:${patient.mobileNumber}`
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Patient: ${patient.name}`,
          text: `Case: ${patient.caseNo}\nAge: ${patient.age}\nPhone: ${patient.mobileNumber}`,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              {patient.photo ? (
                <img
                  src={patient.photo || "/placeholder.svg"}
                  alt={patient.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              <p className="opacity-90">Case: {patient.caseNo}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {patient.age} years
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {patient.gender}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {onBack && (
              <Button
                onClick={onBack}
                variant="secondary"
                className="bg-white/20 text-white border-0 hover:bg-white/30"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              onClick={handleCall}
              variant="secondary"
              className="bg-white/20 text-white border-0 hover:bg-white/30"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button
              onClick={handleShare}
              variant="secondary"
              className="bg-white/20 text-white border-0 hover:bg-white/30"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button onClick={onEdit} variant="secondary" className="bg-white/20 text-white border-0 hover:bg-white/30">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Phone className="w-5 h-5 text-blue-600" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Mobile Number</p>
                <p className="font-medium text-lg">{patient.mobileNumber}</p>
              </div>
            </div>
            {patient.address && (
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{patient.address}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Family Details */}
        {(patient.mothersName || patient.fathersName) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5 text-green-600" />
                Family Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {patient.mothersName && (
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700 font-medium">Mother's Name</span>
                  <span className="text-green-800">{patient.mothersName}</span>
                </div>
              )}
              {patient.fathersName && (
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700 font-medium">Father's Name</span>
                  <span className="text-green-800">{patient.fathersName}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="w-5 h-5 text-red-600" />
            Medical Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {patient.generalComplaint && (
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <p className="text-sm text-red-700 font-medium">General Complaint</p>
              <p className="text-red-800 mt-1">{patient.generalComplaint}</p>
            </div>
          )}
          {patient.medicalHistory && (
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-blue-700 font-medium">Medical History</p>
              <p className="text-blue-800 mt-1">{patient.medicalHistory}</p>
            </div>
          )}
          {patient.familyHistory && (
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-yellow-700 font-medium">Family History</p>
              <p className="text-yellow-800 mt-1">{patient.familyHistory}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Information */}
      {patient.payment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CreditCard className="w-5 h-5 text-purple-600" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <p className="text-purple-800 font-medium">{patient.payment}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button onClick={onEdit} className="flex-1 bg-green-600 hover:bg-green-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit Patient
            </Button>
            <Button onClick={onDelete} variant="destructive" className="flex-1">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Patient
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
