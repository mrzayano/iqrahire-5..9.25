"use server"

import { supabase } from "@/utils/supabase/server";
import { enhanceJobData } from "@/utils/jobs/job-utils"
import type { Job } from "@/types/job"

/**
 * Transform Supabase job data to match our application's Job type
 */




// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformJobData = async (job: any): Promise<Job> => {

  return {
    id: job.id,
    slug: job.slug,
    title: job.title,
    company: job.company,
    logo_url: job.logo_url,
    location: job.location || { city: "", country: "" },
    work_mode: job.work_mode,
    job_type: job.job_type,
    experience_level: job.experience_level,
    salary: job.salary,
    applicationUrl: job.application_url,
    applicationMethod: job.application_method,
    description: job.description,
    responsibilities: Array.isArray(job.responsibilities)
      ? job.responsibilities
      : JSON.parse(job.responsibilities || "[]"),
    qualifications: Array.isArray(job.qualifications)
      ? job.qualifications
      : JSON.parse(job.qualifications || "[]"),
    benefits: Array.isArray(job.benefits)
      ? job.benefits
      : JSON.parse(job.benefits || "[]"),
    skills: Array.isArray(job.skills) ? job.skills : JSON.parse(job.skills || "[]"),
    tags: Array.isArray(job.tags) ? job.tags : JSON.parse(job.tags || "[]"),
    industry: job.industry || "",
    created_at: job.created_at,
    updated_at: job.updated_at,
    posted_by_user_id: job.posted_by_user_id,
    org_id: job.org_id,
    view_count: job.view_count,
    apply_count: job.apply_count,
    is_published: job.is_published,
  }
}


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
