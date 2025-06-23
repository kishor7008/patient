"use client"

import { X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface InstallPromptProps {
  onClose: () => void
}

export default function InstallPrompt({ onClose }: InstallPromptProps) {
  const handleInstall = () => {
    // This would trigger the actual install prompt
    // The beforeinstallprompt event handler would handle this
    onClose()
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <Card className="bg-blue-600 text-white border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5" />
              <div>
                <p className="font-medium">Install Patient Manager</p>
                <p className="text-sm opacity-90">Add to your home screen for quick access</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleInstall} size="sm" variant="secondary">
                Install
              </Button>
              <Button onClick={onClose} size="sm" variant="ghost" className="text-white hover:bg-blue-700">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
