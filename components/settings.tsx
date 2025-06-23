"use client"

import type React from "react"

import { Save, Download, Upload, Trash2, Shield, Bell, Palette } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function Settings() {
  const [settings, setSettings] = useState({
    clinicName: "Healthcare Clinic",
    doctorName: "Dr. Smith",
    address: "123 Medical Street",
    phone: "+1 234 567 8900",
    email: "clinic@healthcare.com",
    notifications: true,
    autoBackup: true,
    theme: "light",
  })

  const handleSave = () => {
    localStorage.setItem("clinicSettings", JSON.stringify(settings))
    alert("Settings saved successfully!")
  }

  const handleExportData = () => {
    const data = {
      patients: JSON.parse(localStorage.getItem("patients") || "[]"),
      settings: settings,
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `patient-data-backup-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          if (data.patients) {
            localStorage.setItem("patients", JSON.stringify(data.patients))
          }
          if (data.settings) {
            setSettings(data.settings)
            localStorage.setItem("clinicSettings", JSON.stringify(data.settings))
          }
          alert("Data imported successfully! Please refresh the page.")
        } catch (error) {
          alert("Error importing data. Please check the file format.")
        }
      }
      reader.readAsText(file)
    }
  }

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all patient data? This action cannot be undone.")) {
      localStorage.removeItem("patients")
      alert("All patient data has been cleared.")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your clinic settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clinic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Clinic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="clinicName">Clinic Name</Label>
              <Input
                id="clinicName"
                value={settings.clinicName}
                onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="doctorName">Doctor Name</Label>
              <Input
                id="doctorName"
                value={settings.doctorName}
                onChange={(e) => setSettings({ ...settings, doctorName: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <Label htmlFor="notifications">Enable Notifications</Label>
              </div>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <Label htmlFor="autoBackup">Auto Backup</Label>
              </div>
              <Switch
                id="autoBackup"
                checked={settings.autoBackup}
                onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
              />
            </div>

            <div>
              <Label htmlFor="theme">Theme</Label>
              <Select value={settings.theme} onValueChange={(value) => setSettings({ ...settings, theme: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={handleExportData} variant="outline" className="h-12">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>

            <div>
              <input type="file" accept=".json" onChange={handleImportData} className="hidden" id="import-file" />
              <Button asChild variant="outline" className="w-full h-12">
                <label htmlFor="import-file" className="cursor-pointer flex items-center justify-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </label>
              </Button>
            </div>

            <Button onClick={handleClearData} variant="destructive" className="h-12">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Version</p>
              <p className="font-medium">1.0.0</p>
            </div>
            <div>
              <p className="text-gray-600">Last Updated</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Storage Used</p>
              <p className="font-medium">{Math.round(JSON.stringify(localStorage).length / 1024)} KB</p>
            </div>
            <div>
              <p className="text-gray-600">Browser</p>
              <p className="font-medium">{navigator.userAgent.split(" ")[0]}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
