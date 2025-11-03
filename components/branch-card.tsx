import { GitBranch } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BranchCardProps {
  branch: {
    name: string
    lastCommit: string
  }
}

export default function BranchCard({ branch }: BranchCardProps) {
  return (
    <div className="p-4 rounded-lg border bg-muted/20 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GitBranch className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="font-semibold text-foreground">{branch.name}</p>
            <p className="text-xs text-muted-foreground">
              Last commit: <span className="font-mono">{branch.lastCommit}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
