"use client"

import { BarChart3, Download, Calendar, Users, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Patient } from "@/types/patient"

interface ReportsProps {
  patients: Patient[]
}

export default function Reports({ patients }: ReportsProps) {
  const getAgeGroups = () => {
    const groups = {
      "0-18": 0,
      "19-35": 0,
      "36-50": 0,
      "51-65": 0,
      "65+": 0,
    }

    patients.forEach((patient) => {
      if (patient.age <= 18) groups["0-18"]++
      else if (patient.age <= 35) groups["19-35"]++
      else if (patient.age <= 50) groups["36-50"]++
      else if (patient.age <= 65) groups["51-65"]++
      else groups["65+"]++
    })

    return groups
  }

  const getCommonComplaints = () => {
    const complaints: { [key: string]: number } = {}

    patients.forEach((patient) => {
      if (patient.generalComplaint) {
        const complaint = patient.generalComplaint.toLowerCase()
        complaints[complaint] = (complaints[complaint] || 0) + 1
      }
    })

    return Object.entries(complaints)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
  }

  const ageGroups = getAgeGroups()
  const commonComplaints = getCommonComplaints()

  const exportData = () => {
    const csvContent = [
      ["Case No", "Name", "Age", "Gender", "Mobile", "Address", "Complaint", "Medical History"].join(","),
      ...patients.map((p) =>
        [p.caseNo, p.name, p.age, p.gender, p.mobileNumber, p.address, p.generalComplaint, p.medicalHistory]
          .map((field) => `"${field}"`)
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `patients-report-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive patient data analysis</p>
        </div>
        <Button onClick={exportData} className="bg-green-600 hover:bg-green-700">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
                <p className="text-sm text-gray-600">Total Patients</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {patients.length > 0 ? Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length) : 0}
                </p>
                <p className="text-sm text-gray-600">Average Age</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{new Date().toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Report Date</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Age Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(ageGroups).map(([range, count]) => (
                <div key={range} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="font-medium">{range} years</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{count}</Badge>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${patients.length > 0 ? (count / patients.length) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Common Complaints */}
        <Card>
          <CardHeader>
            <CardTitle>Most Common Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            {commonComplaints.length > 0 ? (
              <div className="space-y-3">
                {commonComplaints.map(([complaint, count], index) => (
                  <div key={complaint} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-xs font-bold text-red-600">
                        {index + 1}
                      </div>
                      <span className="font-medium capitalize">{complaint}</span>
                    </div>
                    <Badge variant="secondary">{count} cases</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No complaint data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Gender Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-blue-600">
                  {patients.filter((p) => p.gender === "Male").length}
                </span>
              </div>
              <p className="font-medium">Male</p>
              <p className="text-sm text-gray-600">
                {patients.length > 0
                  ? Math.round((patients.filter((p) => p.gender === "Male").length / patients.length) * 100)
                  : 0}
                %
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-pink-600">
                  {patients.filter((p) => p.gender === "Female").length}
                </span>
              </div>
              <p className="font-medium">Female</p>
              <p className="text-sm text-gray-600">
                {patients.length > 0
                  ? Math.round((patients.filter((p) => p.gender === "Female").length / patients.length) * 100)
                  : 0}
                %
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-gray-600">
                  {patients.filter((p) => p.gender === "Other").length}
                </span>
              </div>
              <p className="font-medium">Other</p>
              <p className="text-sm text-gray-600">
                {patients.length > 0
                  ? Math.round((patients.filter((p) => p.gender === "Other").length / patients.length) * 100)
                  : 0}
                %
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
