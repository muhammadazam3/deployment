"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import VoiceRecorder from "./voice-recorder"
import DeploymentCard from "./deployment-card"
import CommandLog from "./command-log"
import ConfirmationModal from "./confirmation-modal"

interface Deployment {
  id: string
  app: string
  status: "deploying" | "success" | "failed" | "pending"
  timestamp: string
  duration?: string
}

export function VoiceDeployInterface() {
  const [isListening, setIsListening] = useState(false)
  const [deployments, setDeployments] = useState<Deployment[]>([])
  const [commands, setCommands] = useState<Array<{
    command: string
    timestamp: string
  }>>([])
  const [transcript, setTranscript] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pendingCommand, setPendingCommand] = useState("")

  const handleVoiceCommand = (command: string) => {
    setPendingCommand(command)
    setIsModalOpen(true)
  }

  const handleConfirm = () => {
    const command = pendingCommand
    setTranscript(command)
    setCommands((prev) =>
      [
        {
          command,
          timestamp: new Date().toLocaleTimeString(),
        } as any,
        ...prev,
      ].slice(0, 10),
    )

    // Simulate deployment
    const newDeployment: Deployment = {
      id: Date.now().toString(),
      app: extractAppName(command),
      status: "pending",
      timestamp: "Now",
    }
    setDeployments((prev) => [newDeployment, ...prev])

    // Simulate deployment progress
    setTimeout(() => {
      setDeployments((prev) =>
        prev.map((d) => (d.id === newDeployment.id ? { ...d, status: "deploying", duration: "5s" } : d)),
      )
    }, 500)

    setTimeout(() => {
      setDeployments((prev) =>
        prev.map((d) => (d.id === newDeployment.id ? { ...d, status: "success", duration: "1m 15s" } : d)),
      )
    }, 3000)
  }

  const extractAppName = (command: string): string => {
    const apps = ["api-gateway", "frontend-app", "auth-service", "database", "cache-layer"]
    const foundApp = apps.find((app) => command.toLowerCase().includes(app))
    return foundApp || "app-" + Math.random().toString(36).substr(2, 5)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-card">
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Voice Deploy</h1>
              <p className="text-muted-foreground mt-1">Deploy applications with voice commands</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm text-accent font-medium">System Ready</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Voice Commands</h2>

              <VoiceRecorder
                isListening={isListening}
                onListeningChange={setIsListening}
                onCommand={handleVoiceCommand}
                transcript={transcript}
              />

              {/* Quick Commands */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Quick Commands</p>
                <div className="space-y-2">
                  {["Deploy api-gateway", "Deploy frontend-app", "Deploy all services"].map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => handleVoiceCommand(cmd)}
                      className="w-full px-3 py-2 rounded-lg bg-muted/40 hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all text-sm text-left font-medium border border-border/40 hover:border-border/80"
                    >
                      <Send className="inline w-3 h-3 mr-2" />
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Deployments & Logs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Deployments */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Recent Deployments</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {deployments.map((deployment) => (
                  <DeploymentCard key={deployment.id} deployment={deployment} />
                ))}
              </div>
            </div>

            {/* Command Log */}
            <CommandLog commands={commands} />
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirm={handleConfirm}
        command={pendingCommand}
      />
    </div>
  )
}
