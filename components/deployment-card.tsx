import { CheckCircle, AlertCircle, Clock, Zap } from "lucide-react"

interface DeploymentCardProps {
  deployment: {
    id: string
    app: string
    status: "deploying" | "success" | "failed" | "pending"
    timestamp: string
    duration?: string
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
    pending: {
      icon: Clock,
      color: "text-muted-foreground",
      bg: "bg-muted/10",
      border: "border-muted/30",
      label: "Pending",
    },
  }

  const config = statusConfig[deployment.status]
  const Icon = config.icon

  return (
    <div className={`p-4 rounded-lg border ${config.bg} ${config.border} transition-all hover:border-opacity-100`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <Icon
            className={`w-5 h-5 ${config.color} mt-0.5 shrink-0 ${deployment.status === "deploying" ? "animate-spin" : ""}`}
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground truncate">{deployment.app}</p>
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
