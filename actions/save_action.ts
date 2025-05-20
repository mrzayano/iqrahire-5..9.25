"use server"
import { supabase } from "@/utils/supabase/server"
import { auth } from "@clerk/nextjs/server"
import { enhanceJobData } from "@/utils/jobs/job-utils"
import { transformJobData } from "@/utils/jobs/job-transformer"

export async function saveAction(jobId: number, isSaved: boolean) {
  const { userId } = await auth()
  if (!userId) throw new Error("User not authenticated")

  if (isSaved) {
    await supabase.from("saved_jobs").delete().eq("job_id", jobId).eq("user_id", userId)
  } else {
    await supabase.from("saved_jobs").insert({ job_id: jobId, user_id: userId })
  }

  // Fetch the updated job
  const { data, error } = await supabase.from("jobs").select("*").eq("id", jobId).single()
  if (error || !data) throw new Error("Failed to fetch updated job")

  const transformedJob = await transformJobData(data)
  const [enhancedJob] = enhanceJobData([transformedJob])
  return { ...enhancedJob, isSaved: !isSaved }
}