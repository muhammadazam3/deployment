import { GitPullRequest, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

type PullRequestStatus = "open" | "merged" | "closed"

interface PullRequestCardProps {
  pr: {
    id: number
    title: string
    sourceBranch: string
    targetBranch: string
    status: PullRequestStatus
  }
  onMerge: () => void
}

export default function PullRequestCard({ pr, onMerge }: PullRequestCardProps) {
  const statusConfig = {
    open: { icon: GitPullRequest, color: "text-blue-500", label: "Open" },
    merged: { icon: CheckCircle, color: "text-green-500", label: "Merged" },
    closed: { icon: XCircle, color: "text-red-500", label: "Closed" },
  }

  const config = statusConfig[pr.status]
  const Icon = config.icon

  return (
    <div className="p-4 rounded-lg border bg-muted/20 transition-all hover:border-opacity-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${config.color}`} />
          <div>
            <p className="font-semibold text-foreground">
              #{pr.id} {pr.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {pr.sourceBranch} → {pr.targetBranch}
            </p>
          </div>
        </div>
        {pr.status === "open" && (
          <Button size="sm" onClick={onMerge}>
            Merge
          </Button>
        )}
      </div>
    </div>
  )
}
