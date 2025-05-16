"use server"

import { supabase } from "@/utils/supabase/server"
import { Job } from "@/types/job"
import { transformJobData } from "@/utils/jobs/job-transformer"
import { enhanceJobData } from "@/utils/jobs/job-utils"

export async function getJobBySlug(slug: string): Promise<Job | null> {
  const { data, error } = await supabase.from("jobs").select("*").eq("slug", slug).single()

  if (error || !data) {
    console.error("Error fetching job by slug", error)
    return null
  }

  const transformed = await transformJobData(data)
  const [enhanced] = enhanceJobData([transformed])

  return enhanced
}
