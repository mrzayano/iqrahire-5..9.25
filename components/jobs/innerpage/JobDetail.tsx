"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Job } from "@/types/job"
import { getJobBySlug } from "@/actions/get-job-by-slug"
import JobDetailContent from "./JobDetailContent"
import JobDetailSkeleton from "./JobDetailSkeleton"

interface Props {
  slug: string
}

export const JobDetail = ({ slug }: Props) => {
  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const jobData = await getJobBySlug(slug)
        if (!jobData) {
          toast.error("Job not found")
        }
        setJob(jobData)
      } catch {
        toast.error("Failed to load job")
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [slug])
  

  if (isLoading) return <JobDetailSkeleton />
  if (!job) return <div className='text-center py-12'>Job not found</div>

  return <JobDetailContent job={job} />
}
