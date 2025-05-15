"use server"

import { supabase } from "@/utils/supabase/server"
import { transformJobData } from "./jobs"
import type { FilterState, Salary } from "@/types/job"

/**
 * Get unique filter options for all filter categories
 */
export async function getFilterOptions() {
  try {

    const { data, error } = await supabase    
      .from("jobs")
      .select("location, skills, job_type, experience_level, industry, application_method")
      .eq("is_published", true)

    if (error) {
      console.error("Error fetching filter options:", error)
      return {
        countries: [],
        cities: [],
        skills: [],
        jobTypes: [],
        experienceLevels: [],
        industries: [],
        applicationTypes: [],
      }
    }

    // Extract unique values
    const countries = Array.from(
      new Set(data.map((job) => (job.location && job.location.country ? job.location.country : ""))),
    ).filter(Boolean)

    const cities = Array.from(
      new Set(data.map((job) => (job.location && job.location.city ? job.location.city : ""))),
    ).filter(Boolean)

    const jobTypes = Array.from(new Set(data.map((job) => job.job_type))).filter(Boolean)
    const experienceLevels = Array.from(new Set(data.map((job) => job.experience_level))).filter(Boolean)
    const applicationTypes = Array.from(new Set(data.map((job) => job.application_method))).filter(Boolean)

    // Extract industries (might be stored as arrays or JSON strings)
    const allIndustries = data
      .flatMap((job) => {
        if (typeof job.industry === "string") {
          return [job.industry]
        }
        return []
      })
      .filter(Boolean)

    const industries = Array.from(new Set(allIndustries))

    // Extract skills (might be stored as arrays or JSON strings)
    const allSkills = data
      .flatMap((job) => {
        if (Array.isArray(job.skills)) {
          return job.skills
        }
        try {
          return JSON.parse(job.skills || "[]")
        } catch {
          return []
        }
      })
      .filter(Boolean)

    const skills = Array.from(new Set(allSkills))

    return {
      countries,
      cities,
      jobTypes,
      experienceLevels,
      skills,
      industries,
      applicationTypes,
    }
  } catch (error) {
    console.error("Unexpected error fetching filter options:", error)
    return {
      countries: [],
      cities: [],
      jobTypes: [],
      experienceLevels: [],
      skills: [],
      industries: [],
      applicationTypes: [],
    }
  }
}

/**
 * Get filtered jobs based on filter state
 */
export async function getFilteredJobs(filters: FilterState) {
  try {

    // Start with a base query
    let query = supabase.from("jobs").select("*").eq("is_published", true)

    // Apply filters
    if (filters.remoteOnly) {
      query = query.eq("work_mode", "remote")
    }

    // For location filters, we need to use Postgres JSON operators
// Safe fallback using `contains`
if (filters.selectedCountries.length > 0) {
  query = query.in("location->>country", filters.selectedCountries);
}


if (filters.selectedCities.length > 0) {
  query = query.in("location->>city", filters.selectedCities);
}

    if (filters.selectedJobTypes.length > 0) {
      query = query.in("job_type", filters.selectedJobTypes)
    }

    if (filters.selectedExperienceLevels.length > 0) {
      console.log("hey exp:", filters.selectedExperienceLevels);
      
      query = query.in("experience_level", filters.selectedExperienceLevels)
    }

    if (filters.selectedApplicationTypes.length > 0) {
      query = query.in("application_method", filters.selectedApplicationTypes)
    }

    // Industry filter - this is more complex as it might be stored as a string
if (
  filters.selectedIndustries.length > 0 &&
  !filters.selectedIndustries.includes("all")
) {
  query = query.in("industry", filters.selectedIndustries);
}


    // Date posted filter
    if (filters.datePosted) {
      const now = new Date()
      let daysAgo

      switch (filters.datePosted) {
        case "Last 24 Hours":
          daysAgo = 1
          break
        case "Last 3 Days":
          daysAgo = 3
          break
        case "Last 7 Days":
          daysAgo = 7
          break
        case "Last 30 Days":
          daysAgo = 30
          break
        default:
          daysAgo = null
      }

      if (daysAgo) {
        const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000).toISOString()
        query = query.gte("created_at", cutoffDate)
      }
    }

    // Execute the query
    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching filtered jobs:", error)
      return []
    }

    // Transform the data
    const transformedJobs = await Promise.all(data.map(transformJobData))

    // Apply client-side filters that are harder to do in SQL
    return transformedJobs.filter((job) => {
      // Search query filter
      const matchesSearch =
        !filters.searchQuery ||
        job.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        job.skills.some((skill) => skill.toLowerCase().includes(filters.searchQuery.toLowerCase()))

      // Skills filter
      const matchesSkills =
        filters.selectedSkills.length === 0 || filters.selectedSkills.some((skill) => job.skills.includes(skill))

      // Salary range filter
     const matchesSalary = isSalaryInRange(job.salary, filters.salaryRange)


      return matchesSearch && matchesSkills && matchesSalary
    })
  } catch (error) {
    console.error("Unexpected error fetching filtered jobs:", error)
    return []
  }
}

/**
 * Helper function to check if a job's salary is within range
 */
function isSalaryInRange(salary: Salary | null, range: [number, number]): boolean {
  if (!salary) return true // no salary info, treat as match

  const from = salary.from ?? 0
  const to = salary.to ?? from

  // Check if salary range overlaps with filter range
  return to >= range[0] && from <= range[1]
}

 