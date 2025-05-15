"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

export const JobPostingButton = () => {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handlePostJobClick = () => {
    setIsDialogOpen(true)
  }

  const handleCreateOrgClick = () => {
    router.push("/org/create")
    setIsDialogOpen(false)
  }

  return (
    <>
      <Button onClick={handlePostJobClick}>
        <Plus className="h-5 w-5 mr-2" />
        Create Org Account
      </Button>


      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Organization Not Eligible</DialogTitle>
            <DialogDescription>
              Your current organization type doesn&apos;t support job posting. Only business and company organizations
              can post jobs.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button onClick={handleCreateOrgClick}>Create a Business Organization</Button>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
