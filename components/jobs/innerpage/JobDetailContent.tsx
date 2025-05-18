"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { Job } from "@/types/job"
import JobDetailSections from "./JobDetailSections"
import { useState } from "react"
import { apply_jobs } from "@/actions/job_application"
interface Props {
  job: Job
  isMobile: boolean
}

const JobDetailContent = ({ job, isMobile }: Props) => {
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(job.isSaved ?? false)

  const handleSave = () => {
    setIsSaved((prev) => !prev)
    toast.success(!isSaved ? "Job saved!" : "Removed from saved")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} at ${job.company}`,
        url: window.location.href,
      }).catch(() => toast.error("Could not share job"))
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Copied to clipboard")
    }
  }

  const handleApply = async () => {
    if (job.applicationMethod === "Easy Apply") {
      const res = await apply_jobs(job.id)
      if (res.success) {
        toast.success("Applied successfully!")
      } else {
        toast.error(res.message || "Failed to apply for the job.")
      }
    } else {
      toast.info("Redirecting...")
      window.open(job.applicationUrl || "", "_blank")
    }
  }


  return (
    <div className='container max-w-4xl mx-auto px-4 py-8'>
      <Button variant='ghost' onClick={() => router.push("/jobs")} className='mb-4'>
        <ArrowLeft className='mr-2 h-4 w-4' /> Back to Jobs
      </Button>

      <JobDetailSections
        job={job}
        isMobile={isMobile}
        isSaved={isSaved}
        onSave={handleSave}
        onShare={handleShare}
        onApply={handleApply}
      />
    </div>
  )
}

export default JobDetailContent
