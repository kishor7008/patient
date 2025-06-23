"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Sidebar from "@/components/sidebar"
import PatientList from "@/components/patient-list"
import PatientForm from "@/components/patient-form"
import PatientDetails from "@/components/patient-details"
import Dashboard from "@/components/dashboard"
import Settings from "@/components/settings"
import Reports from "@/components/reports"
import type { Patient } from "@/types/patient"

export default function PatientManagementApp() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [currentTab, setCurrentTab] = useState<
    "dashboard" | "patients" | "add" | "edit" | "details" | "reports" | "settings"
  >("dashboard")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Load patients from localStorage on mount
  useEffect(() => {
    const savedPatients = localStorage.getItem("patients")
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients))
    }
  }, [])

  // Save patients to localStorage whenever patients change
  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients))
  }, [patients])

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.caseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.mobileNumber.includes(searchTerm),
  )

  const handleAddPatient = (patient: Omit<Patient, "id">) => {
    const newPatient: Patient = {
      ...patient,
      id: Date.now().toString(),
    }
    setPatients([...patients, newPatient])
    setCurrentTab("patients")
  }

  const handleEditPatient = (updatedPatient: Patient) => {
    setPatients(patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p)))
    setCurrentTab("patients")
  }

  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter((p) => p.id !== id))
    setCurrentTab("patients")
  }

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setCurrentTab("details")
  }

  const handleEditClick = (patient: Patient) => {
    setSelectedPatient(patient)
    setCurrentTab("edit")
  }

  const renderContent = () => {
    switch (currentTab) {
      case "dashboard":
        return <Dashboard patients={patients} onViewPatient={handleViewPatient} />

      case "patients":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
                <p className="text-gray-600">Manage all patient records</p>
              </div>
              <Button onClick={() => setCurrentTab("add")} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search patients by name, case number, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>
            </div>

            <PatientList
              patients={filteredPatients}
              onView={handleViewPatient}
              onEdit={handleEditClick}
              onDelete={handleDeletePatient}
            />
          </div>
        )

      case "add":
        return (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Add New Patient</h1>
              <p className="text-gray-600">Enter patient information to create a new record</p>
            </div>
            <PatientForm onSubmit={handleAddPatient} onCancel={() => setCurrentTab("patients")} />
          </div>
        )

      case "edit":
        return selectedPatient ? (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Edit Patient</h1>
              <p className="text-gray-600">Update patient information</p>
            </div>
            <PatientForm
              patient={selectedPatient}
              onSubmit={handleEditPatient}
              onCancel={() => setCurrentTab("patients")}
            />
          </div>
        ) : null

      case "details":
        return selectedPatient ? (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Patient Details</h1>
              <p className="text-gray-600">Complete patient information</p>
            </div>
            <PatientDetails
              patient={selectedPatient}
              onEdit={() => handleEditClick(selectedPatient)}
              onDelete={() => handleDeletePatient(selectedPatient.id)}
              onBack={() => setCurrentTab("patients")}
            />
          </div>
        ) : null

      case "reports":
        return <Reports patients={patients} />

      case "settings":
        return <Settings />

      default:
        return <Dashboard patients={patients} onViewPatient={handleViewPatient} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        patientCount={patients.length}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="lg:hidden"
              >
                ☰
              </Button>
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">
                Total Patients: <span className="font-semibold text-blue-600">{patients.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">{renderContent()}</div>
      </div>
    </div>
  )
}
