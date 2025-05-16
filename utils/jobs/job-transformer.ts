import { Job } from "@/types/job"

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