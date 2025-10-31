import { MessageSquare } from "lucide-react"

interface CommandLogProps {
  commands: Array<{
    command: string
    timestamp: string
  }>
}

export default function CommandLog({ commands }: CommandLogProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Command History</h2>
      <div className="bg-card border border-border/40 rounded-lg p-4">
        {commands.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <MessageSquare className="w-8 h-8 text-muted-foreground/40 mb-2" />
            <p className="text-sm text-muted-foreground">No commands yet. Start by speaking a voice command.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {commands.map((cmd, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <div className="w-2 h-2 bg-accent rounded-full mt-1.5 shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{cmd.command}</p>
                  <p className="text-xs text-muted-foreground">{cmd.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
