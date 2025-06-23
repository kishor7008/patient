"use client"

import { Users, Plus, BarChart3, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AndroidBottomNavProps {
  currentView: string
  onViewChange: (view: "list" | "add" | "stats" | "settings") => void
}

export default function AndroidBottomNav({ currentView, onViewChange }: AndroidBottomNavProps) {
  const navItems = [
    { id: "list", icon: Users, label: "Patients" },
    { id: "add", icon: Plus, label: "Add" },
    { id: "stats", icon: BarChart3, label: "Stats" },
    { id: "settings", icon: Settings, label: "Settings" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onViewChange(item.id as any)}
              className={`flex flex-col items-center gap-1 p-2 h-auto ${isActive ? "text-blue-600" : "text-gray-600"}`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-600"}`} />
              <span className={`text-xs ${isActive ? "text-blue-600 font-medium" : "text-gray-600"}`}>
                {item.label}
              </span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
