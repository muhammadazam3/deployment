"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ConfirmationModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  action: any
}

export default function ConfirmationModal({ isOpen, onOpenChange, onConfirm, action }: ConfirmationModalProps) {
  const renderActionDetails = () => {
    if (!action) return null

    switch (action.type) {
      case "deploy":
        return (
          <>
            You are about to deploy: <span className="font-bold">{action.command}</span>
          </>
        )
      case "merge-pr":
        return (
          <>
            You are about to merge pull request: <span className="font-bold">#{action.prId}</span>
          </>
        )
      case "merge-branch":
        return (
          <>
            You are about to merge branch: <span className="font-bold">{action.sourceBranch}</span> into{" "}
            <span className="font-bold">{action.targetBranch}</span>
          </>
        )
      default:
        return "Are you sure you want to proceed?"
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>{renderActionDetails()}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
