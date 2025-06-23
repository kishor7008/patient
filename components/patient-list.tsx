"use client"

import { Edit, Eye, Trash2, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Patient } from "@/types/patient"

interface PatientListProps {
  patients: Patient[]
  onView: (patient: Patient) => void
  onEdit: (patient: Patient) => void
  onDelete: (id: string) => void
}

export default function PatientList({ patients, onView, onEdit, onDelete }: PatientListProps) {
  if (patients.length === 0) {
    return (
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="p-12 text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600 font-medium">No patients found</p>
          <p className="text-gray-500 mt-2">Add your first patient to get started</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map((patient) => (
        <Card key={patient.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                {patient.photo ? (
                  <img
                    src={patient.photo || "/placeholder.svg"}
                    alt={patient.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate text-lg">{patient.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Case: {patient.caseNo}</p>

                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {patient.age}y
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {patient.gender}
                  </Badge>
                </div>

                {patient.generalComplaint && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{patient.generalComplaint}</p>
                )}

                <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                  <Phone className="w-3 h-3" />
                  <span>{patient.mobileNumber}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(patient)}
                    className="flex-1 hover:bg-blue-50 hover:border-blue-300"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(patient)}
                    className="flex-1 hover:bg-green-50 hover:border-green-300"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(patient.id)}
                    className="hover:bg-red-50 hover:border-red-300 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
