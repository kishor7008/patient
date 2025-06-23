"use client"

import {
  LayoutDashboard,
  Users,
  UserPlus,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SidebarProps {
  currentTab: string
  onTabChange: (tab: any) => void
  collapsed: boolean
  onToggleCollapse: () => void
  patientCount: number
}

export default function Sidebar({ currentTab, onTabChange, collapsed, onToggleCollapse, patientCount }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "patients", label: "Patients", icon: Users, badge: patientCount },
    { id: "add", label: "Add Patient", icon: UserPlus },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white shadow-lg border-r transition-all duration-300 z-50 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Patient Manager</h2>
                <p className="text-xs text-gray-600">Healthcare System</p>
              </div>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="p-1 h-8 w-8">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentTab === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-12 ${collapsed ? "px-2" : "px-3"} ${
                  isActive ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className={`w-5 h-5 ${collapsed ? "" : "mr-3"}`} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <Badge
                        variant={isActive ? "secondary" : "default"}
                        className={`ml-2 ${isActive ? "bg-blue-500 text-white" : ""}`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-sm font-medium text-blue-900">Quick Stats</div>
            <div className="text-xs text-blue-700 mt-1">{patientCount} patients registered</div>
          </div>
        </div>
      )}
    </div>
  )
}
