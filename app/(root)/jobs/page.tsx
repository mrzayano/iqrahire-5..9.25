import Jobs from "@/components/jobs/Jobs"
import { getAllJobs } from "@/actions/jobs"
import { getFilterOptions } from "@/actions/jobs-filter"

export default async function JobsPage() {
  // Fetch initial data
  const [jobs, filterOptions,] = await Promise.all([getAllJobs(), getFilterOptions(),])

  return <Jobs initialJobs={jobs} filterOptions={filterOptions}  />
}
