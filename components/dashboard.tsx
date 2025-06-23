"use client"

import { Users, UserPlus, Calendar, TrendingUp, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Patient } from "@/types/patient"

interface DashboardProps {
  patients: Patient[]
  onViewPatient: (patient: Patient) => void
}

export default function Dashboard({ patients, onViewPatient }: DashboardProps) {
  const getStats = () => {
    const totalPatients = patients.length
    const malePatients = patients.filter((p) => p.gender === "Male").length
    const femalePatients = patients.filter((p) => p.gender === "Female").length
    const avgAge = patients.length > 0 ? Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length) : 0
    const recentPatients = patients.slice(-5).reverse()

    return { totalPatients, malePatients, femalePatients, avgAge, recentPatients }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your patients today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Patients</p>
                <p className="text-3xl font-bold">{stats.totalPatients}</p>
              </div>
              <Users className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Male Patients</p>
                <p className="text-3xl font-bold">{stats.malePatients}</p>
              </div>
              <UserPlus className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Female Patients</p>
                <p className="text-3xl font-bold">{stats.femalePatients}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Average Age</p>
                <p className="text-3xl font-bold">{stats.avgAge}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Recent Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentPatients.length > 0 ? (
              <div className="space-y-3">
                {stats.recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{patient.name}</p>
                        <p className="text-sm text-gray-600">Case: {patient.caseNo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{patient.age}y</Badge>
                      <Button variant="ghost" size="sm" onClick={() => onViewPatient(patient)} className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No patients yet</p>
                <p className="text-sm text-gray-500">Add your first patient to get started</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>Male</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{stats.malePatients}</span>
                  <span className="text-sm text-gray-500">
                    ({stats.totalPatients > 0 ? Math.round((stats.malePatients / stats.totalPatients) * 100) : 0}%)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-500 rounded"></div>
                  <span>Female</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{stats.femalePatients}</span>
                  <span className="text-sm text-gray-500">
                    ({stats.totalPatients > 0 ? Math.round((stats.femalePatients / stats.totalPatients) * 100) : 0}%)
                  </span>
                </div>
              </div>

              {/* Visual representation */}
              <div className="mt-4">
                <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500"
                    style={{
                      width: `${stats.totalPatients > 0 ? (stats.malePatients / stats.totalPatients) * 100 : 0}%`,
                    }}
                  ></div>
                  <div
                    className="bg-pink-500"
                    style={{
                      width: `${stats.totalPatients > 0 ? (stats.femalePatients / stats.totalPatients) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
