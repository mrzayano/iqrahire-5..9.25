import type { Job, FilterState, Salary } from "@/types/job"

/**
 * Calculate days since a job was posted
 */
export const calculateDaysSincePosting = (createdAt: string): number => {
  const postDate = new Date(createdAt)
  const today = new Date()
  return Math.floor((today.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24))
}

/**
 * Parse salary string to get min and max values
 * Example: "export type Salary = {
  from?: number
  to?: number
  currency: string
  period: "yearly" | "monthly" | "weekly" | "hourly"
}
" -> [70, 90]
 */
export const parseSalaryRange = (salary: Salary | null): [number, number] | null => {
  if (!salary) return null;
  if (typeof salary.from === 'number' && typeof salary.to === 'number') {
    return [salary.from, salary.to];
  }
  return null;
}

/**
 * Check if a job's salary is within the specified range
 */
// export const isSalaryInRange = (job: Job, range: [number, number]): boolean => {
//   const jobSalaryRange = parseSalaryRange(job.salary); // job.salary is now Salary | null
//   if (!jobSalaryRange) return true;
//   return jobSalaryRange[0] <= range[1] && jobSalaryRange[1] >= range[0];
// }

/**
 * Enhance job data with additional properties needed by the UI
 */
export const enhanceJobData = (jobs: Job[]): Job[] => {
  return jobs.map((job) => ({
    ...job,
    postedDays: calculateDaysSincePosting(job.created_at),
    isSaved: false, // Default value, would be set from user data in a real app
    status: undefined, // Default value, would be set from user data in a real app
  }))
}

/**
 * Filter jobs based on all criteria
 */
export const filterJobs = (jobs: Job[], filters: FilterState): Job[] => {
  return jobs.filter((job) => {
    // Search by title, company, or skills
    const matchesSearch =
      filters.searchQuery.trim() === "" ||
      job.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(filters.searchQuery.toLowerCase()))

    // Filter by saved status
    const matchesSaved = !filters.savedOnly || job.isSaved

    // Filter by remote status
    const matchesRemote = !filters.remoteOnly || job.work_mode === "remote"

    // Filter by country
    const matchesCountry = 
      filters.selectedCountries.length === 0 || filters.selectedCountries.includes(job.location.country)

    // Filter by city
    const matchesCity = filters.selectedCities.length === 0 || filters.selectedCities.includes(job.location.city)

    // Filter by job type
    const matchesJobType = filters.selectedJobTypes.length === 0 || filters.selectedJobTypes.includes(job.job_type)

    // Filter by experience level
    const matchesExperienceLevel =
      filters.selectedExperienceLevels.length === 0 || filters.selectedExperienceLevels.includes(job.experience_level)

    // Filter by skills
    const matchesSkills =
      filters.selectedSkills.length === 0 || filters.selectedSkills.some((skill) => job.skills.includes(skill))

    // Filter by date posted
    let matchesDatePosted = true
    if (filters.datePosted && job.postedDays !== undefined) {
      if (filters.datePosted === "Last 24 Hours" && job.postedDays > 1) matchesDatePosted = false
      if (filters.datePosted === "Last 3 Days" && job.postedDays > 3) matchesDatePosted = false
      if (filters.datePosted === "Last 7 Days" && job.postedDays > 7) matchesDatePosted = false
      if (filters.datePosted === "Last 30 Days" && job.postedDays > 30) matchesDatePosted = false
    }

    // Filter by salary range
    // const matchesSalary = isSalaryInRange(job, filters.salaryRange)

    return (
      matchesSearch &&
      matchesSaved &&
      matchesRemote &&
      matchesCountry &&
      matchesCity &&
      matchesJobType &&
      matchesExperienceLevel &&
      matchesSkills &&
      matchesDatePosted 
      // matchesSalary
    )
  })
}
