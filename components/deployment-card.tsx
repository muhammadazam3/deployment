import { CheckCircle, AlertCircle, Clock, Zap, Package, Beaker } from "lucide-react"

type DeploymentStatus = "queued" | "building" | "testing" | "deploying" | "success" | "failed"

interface DeploymentCardProps {
  deployment: {
    id: string
    app: string
    status: DeploymentStatus
    timestamp: string
    duration?: string
    environment: "dev" | "staging" | "production"
  }
}

export default function DeploymentCard({ deployment }: DeploymentCardProps) {
  const statusConfig = {
    success: {
      icon: CheckCircle,
      color: "text-accent",
      bg: "bg-accent/10",
      border: "border-accent/30",
      label: "Deployed",
    },
    deploying: {
      icon: Zap,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/30",
      label: "Deploying",
    },
    failed: {
      icon: AlertCircle,
      color: "text-destructive",
      bg: "bg-destructive/10",
      border: "border-destructive/30",
      label: "Failed",
    },
    queued: {
      icon: Clock,
      color: "text-muted-foreground",
      bg: "bg-muted/10",
      border: "border-muted/30",
      label: "Queued",
    },
    building: {
      icon: Package,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      label: "Building",
    },
    testing: {
      icon: Beaker,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      label: "Testing",
    },
  }

  const envConfig = {
    dev: "bg-green-500/20 text-green-500",
    staging: "bg-orange-500/20 text-orange-500",
    production: "bg-red-500/20 text-red-500",
  }

  const config = statusConfig[deployment.status]
  const Icon = config.icon

  return (
    <div className={`p-4 rounded-lg border ${config.bg} ${config.border} transition-all hover:border-opacity-100`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <Icon
            className={`w-5 h-5 ${config.color} mt-0.5 shrink-0 ${
              ["building", "testing", "deploying"].includes(deployment.status) ? "animate-spin" : ""
            }`}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-foreground truncate">{deployment.app}</p>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${envConfig[deployment.environment]}`}
              >
                {deployment.environment}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{deployment.timestamp}</p>
          </div>
        </div>
        <div className="text-right ml-4">
          <p className={`text-xs font-semibold ${config.color} uppercase tracking-wide`}>{config.label}</p>
          {deployment.duration && <p className="text-xs text-muted-foreground mt-1">{deployment.duration}</p>}
        </div>
      </div>
    </div>
  )
}
