"use server"

import { supabase } from "@/utils/supabase/server";
import { enhanceJobData } from "@/utils/jobs/job-utils"
import type { Job } from "@/types/job"
import { transformJobData } from "@/utils/jobs/job-transformer";

/**
 * Transform Supabase job data to match our application's Job type
 */







/**
 * Get all jobs
 */
export async function getAllJobs(): Promise<Job[]> {
  try {

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching jobs:", error)
      return []
    }
 
    // Transform and enhance the job data
    const transformedJobs = await Promise.all(data.map(transformJobData))
    return enhanceJobData(transformedJobs)
  } catch (error) {
    console.error("Unexpected error fetching jobs:", error)
    return []
  }
}

/**
 * Get job by ID
 */
export async function getJobById(id: number): Promise<Job | null> {
  try {

    const { data, error } = await supabase.from("jobs").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching job:", error)
      return null
    }

    // Transform and enhance the job data
    const transformedJob = await transformJobData(data)
    return enhanceJobData([transformedJob])[0]
  } catch (error) {
    console.error("Unexpected error fetching job:", error)
    return null
  }
}

/**
 * Get user's saved jobs
 */
export async function getSavedJobs(userId: string): Promise<Job[]> {
  try {

    const { data, error } = await supabase
      .from("saved_jobs")
      .select(`
        job_id,
        jobs:job_id (*)
      `)
      .eq("user_id", userId)

    if (error) {
      console.error("Error fetching saved jobs:", error)
      return []
    }

    // Extract job data from the joined query
    const jobsData = data.map((item) => item.jobs)

    // Transform and enhance the job data
    const transformedJobs = await Promise.all(jobsData.map(transformJobData))
    const enhancedJobs = enhanceJobData(transformedJobs)

    // Mark all jobs as saved since they're from the saved_jobs table
    return enhancedJobs.map((job) => ({ ...job, isSaved: true }))
  } catch (error) {
    console.error("Unexpected error fetching saved jobs:", error)
    return []
  }
}
