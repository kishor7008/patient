"use client"

import { ArrowLeft, Menu, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AndroidHeaderProps {
  title: string
  showBack?: boolean
  onBack?: () => void
  onMenu?: () => void
}

export default function AndroidHeader({ title, showBack, onBack, onMenu }: AndroidHeaderProps) {
  return (
    <div className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {showBack ? (
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-blue-700 p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={onMenu} className="text-white hover:bg-blue-700 p-2">
              <Menu className="w-5 h-5" />
            </Button>
          )}
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 p-2">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
