export interface JobLocation {
  city: string
  country: string
}

export type Salary = {
  from?: string
  to?: string
  currency: string
  period: "yearly" | "monthly" | "weekly" | "hourly"
}

export interface Job {
  id: number
  slug: string
  title: string
  company: string
  logo_url: string
  location: JobLocation
  work_mode: "remote" | "onsite" | "hybrid"
  job_type: string
  experience_level: string
  salary: Salary | null
  applicationUrl: string | null
  applicationMethod: "Easy Apply" | "External"
  description: string
  responsibilities: string[]
  qualifications: string[]
  benefits: string[]
  skills: string[]
  tags: string[]
  industry: string
  created_at: string
  updated_at: string
  posted_by_user_id: string
  org_id: string
  view_count: number
  apply_count: number
  is_published: boolean
  company_logo: string
  // These properties are not in the original data but used in the UI
  // They will be added by the adapter function
  isSaved?: boolean
  status?: "Applied" | "Interviewed" | "Accepted" | "Rejected"
  postedDays?: number
  appliedDate?: string
}

export interface FilterState {
  searchQuery: string
  savedOnly: boolean
  remoteOnly: boolean
  selectedCountries: string[]
  selectedCities: string[]
  selectedJobTypes: string[]
  selectedExperienceLevels: string[]
  selectedSkills: string[]
  selectedIndustries: string[]
  selectedApplicationTypes: string[]
  datePosted: string
  salaryRange: [number, number]
}

export interface JobTabsProps {
  allJobs: Job[]
  savedJobs: Job[]
  appliedJobs: Job[]
  interviewedJobs: Job[]
  acceptedJobs: Job[]
  rejectedJobs: Job[]
}

export interface JobsListProps {
  jobs: Job[]
  isLoading?: boolean
}

export interface JobsFilterSidebarProps {
  countries: string[]
  cities: string[]
  selectedCountries: string[]
  selectedCities: string[]
  remoteOnly: boolean
  datePosted: string
  jobType: string[]
  experienceLevel: string[]
  salaryRange: [number, number]
  minSalary: number
  maxSalary: number
  skills: string[]
  selectedSkills: string[]
  industries: string[]
  selectedIndustries: string[]
  applicationTypes: string[]
  selectedApplicationTypes: string[]
  onCountryChange: (country: string) => void
  onCityChange: (city: string) => void
  onRemoteChange: (checked: boolean) => void
  onDatePostedChange: (value: string) => void
  onJobTypeChange: (type: string) => void
  onExperienceLevelChange: (level: string) => void
  onSalaryRangeChange: (range: [number, number]) => void
  onSkillChange: (skill: string) => void
  onIndustryChange: (industry: string) => void
  onApplicationTypeChange: (type: string) => void
  onResetFilters: () => void
  onApplyFilters: () => void
}
