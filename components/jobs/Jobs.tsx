"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { JobPostingButton } from "@/components/jobs/JobPostingButton"
import { JobTabs } from "@/components/jobs/JobTabs"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { toast } from "sonner"
import { JobsFilterSidebar } from "@/components/jobs/JobsFilterSidebar"
import { JobSearchBar } from "@/components/jobs/JobSearchBar"
import { useIsMobile } from "@/hooks/use-mobile"
import type { Job, FilterState } from "@/types/job"
import { filterJobs } from "@/utils/jobs/job-utils"
import { getFilteredJobs } from "@/actions/jobs-filter"
import { GetAppliedJobByUser } from "@/actions/fetch_applied_jobs"

interface JobsProps {
  initialJobs: Job[]
  filterOptions: {
    countries: string[]
    cities: string[]
    jobTypes: string[]
    experienceLevels: string[]
    skills: string[]
    industries: string[]
    applicationTypes: string[]
  }
  userId?: string
}

const Jobs = ({ initialJobs, filterOptions, userId }: JobsProps) => {
  // Filter state
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: "",
    savedOnly: false,
    remoteOnly: false,
    selectedCountries: [],
    selectedCities: [],
    selectedJobTypes: [],
    selectedExperienceLevels: [],
    selectedSkills: [],
    selectedIndustries: [],
    selectedApplicationTypes: [],
    datePosted: "",
    salaryRange: [30, 150],
  })

  const [isLoading, setIsLoading] = useState(false)
  const [jobs] = useState<Job[]>(initialJobs)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs)
  const [savedJobs] = useState<Job[]>([])
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([])
  const [showMobileFilterSheet, setShowMobileFilterSheet] = useState(false)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  // Extract filter options
  const { countries, cities, skills, industries, applicationTypes } = filterOptions

  // Apply filters when filter state changes
  useEffect(() => {
    const applyFilters = async () => {
      try {
        setIsLoading(true)

        if (hasActiveServerFilters(filterState)) {
          // If we have filters that are better handled by the server
          const serverFilteredJobs = await getFilteredJobs(filterState)

          // Apply client-side only filters (like savedOnly)
          const clientFiltered = filterState.savedOnly
            ? serverFilteredJobs.filter((job) => job.isSaved)
            : serverFilteredJobs

          setFilteredJobs(clientFiltered)
        } else {
          // For simple filtering, do it client-side
          const filtered = filterJobs(jobs, filterState)
          setFilteredJobs(filtered)
        }
      } catch (error) {
        console.error("Error applying filters:", error)
        toast.error("Failed to apply filters")
      } finally {
        setIsLoading(false)
      }
    }

    applyFilters()
  }, [filterState, jobs])

  //fetch applied job by current user
    useEffect(() => {
    const appliedJob = async () => {
      try {
        const data = await GetAppliedJobByUser();
        setAppliedJobs(data);
      } catch (error) {
        console.error("Failed to fetch applied jobs:", error)
      }
    };

    appliedJob();
  }, []);

  // Check if we have filters that are better handled by the server
  const hasActiveServerFilters = (filters: FilterState): boolean => {
    return (
      filters.remoteOnly ||
      filters.selectedCountries.length > 0 ||
      filters.selectedCities.length > 0 ||
      filters.selectedJobTypes.length > 0 ||
      filters.selectedExperienceLevels.length > 0 ||
      filters.selectedIndustries.length > 0 ||
      filters.selectedApplicationTypes.length > 0 ||
      filters.datePosted !== ""
    )
  }

  // Filter handlers
  const handleSearchQueryChange = useCallback((value: string) => {
    setFilterState((prev) => ({ ...prev, searchQuery: value }))
  }, [])

  const handleCountryChange = useCallback((country: string) => {
    setFilterState((prev) => ({
      ...prev,
      selectedCountries: prev.selectedCountries.includes(country)
        ? prev.selectedCountries.filter((c) => c !== country)
        : [...prev.selectedCountries, country],
    }))
  }, [])

  const handleCityChange = useCallback((city: string) => {
    setFilterState((prev) => ({
      ...prev,
      selectedCities: prev.selectedCities.includes(city)
        ? prev.selectedCities.filter((c) => c !== city)
        : [...prev.selectedCities, city],
    }))
  }, [])

  const handleRemoteChange = useCallback((checked: boolean) => {
    setFilterState((prev) => ({ ...prev, remoteOnly: checked }))
  }, [])

  const handleJobTypeChange = useCallback((type: string) => {
    setFilterState((prev) => ({
      ...prev,
      selectedJobTypes: prev.selectedJobTypes.includes(type)
        ? prev.selectedJobTypes.filter((t) => t !== type)
        : [...prev.selectedJobTypes, type],
    }))
  }, [])

  const handleExperienceLevelChange = useCallback((level: string) => {
    setFilterState((prev) => ({
      ...prev,
      selectedExperienceLevels: prev.selectedExperienceLevels.includes(level)
        ? prev.selectedExperienceLevels.filter((l) => l !== level)
        : [...prev.selectedExperienceLevels, level],
    }))
  }, [])

  const handleSkillChange = useCallback((skill: string) => {
    setFilterState((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skill)
        ? prev.selectedSkills.filter((s) => s !== skill)
        : [...prev.selectedSkills, skill],
    }))
  }, [])

  const handleIndustryChange = useCallback((industry: string) => {
    setFilterState((prev) => ({
      ...prev,
      selectedIndustries: prev.selectedIndustries.includes(industry)
        ? prev.selectedIndustries.filter((i) => i !== industry)
        : [...prev.selectedIndustries, industry],
    }))
  }, [])

  const handleApplicationTypeChange = useCallback((type: string) => {
    setFilterState((prev) => ({
      ...prev,
      selectedApplicationTypes: prev.selectedApplicationTypes.includes(type)
        ? prev.selectedApplicationTypes.filter((t) => t !== type)
        : [...prev.selectedApplicationTypes, type],
    }))
  }, [])

  const handleDatePostedChange = useCallback((value: string) => {
    setFilterState((prev) => ({ ...prev, datePosted: value }))
  }, [])

  const handleSalaryRangeChange = useCallback((range: [number, number]) => {
    setFilterState((prev) => ({ ...prev, salaryRange: range }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilterState({
      searchQuery: "",
      savedOnly: false,
      remoteOnly: false,
      selectedCountries: [],
      selectedCities: [],
      selectedJobTypes: [],
      selectedExperienceLevels: [],
      selectedSkills: [],
      selectedIndustries: [],
      selectedApplicationTypes: [],
      datePosted: "",
      salaryRange: [30, 150],
    })
    setShowMobileFilterSheet(false)
    toast.success("Filters reset")
  }, [])

  const applyFilters = useCallback(() => {
    setShowMobileFilterSheet(false)
    toast.success("Filters applied")
  }, [])

  const hasActiveFilters = useMemo(() => {
    return (
      filterState.selectedCountries.length > 0 ||
      filterState.selectedCities.length > 0 ||
      filterState.remoteOnly ||
      filterState.savedOnly ||
      filterState.selectedJobTypes.length > 0 ||
      filterState.selectedExperienceLevels.length > 0 ||
      filterState.selectedSkills.length > 0 ||
      filterState.selectedIndustries.length > 0 ||
      filterState.selectedApplicationTypes.length > 0 ||
      filterState.datePosted
    )
  }, [filterState])

  

  
  return (
    <div className="container py-8 max-w-7xl mx-auto" ref={mainContentRef}>
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Find Your Next Opportunity</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Discover career opportunities aligned with your values and skills
          </p>
        </div>

        <JobPostingButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters sidebar - visible on desktop with sticky positioning */}
        <div className="lg:col-span-1 space-y-4 hidden lg:block">
          <div className="sticky top-6">
            <JobsFilterSidebar
              countries={countries}
              cities={cities}
              selectedCountries={filterState.selectedCountries}
              selectedCities={filterState.selectedCities}
              remoteOnly={filterState.remoteOnly}
              datePosted={filterState.datePosted}
              jobType={filterState.selectedJobTypes}
              experienceLevel={filterState.selectedExperienceLevels}
              salaryRange={filterState.salaryRange}
              minSalary={30}
              maxSalary={150}
              skills={skills}
              selectedSkills={filterState.selectedSkills}
              industries={industries}
              selectedIndustries={filterState.selectedIndustries}
              applicationTypes={applicationTypes}
              selectedApplicationTypes={filterState.selectedApplicationTypes}
              onCountryChange={handleCountryChange}
              onCityChange={handleCityChange}
              onRemoteChange={handleRemoteChange}
              onDatePostedChange={handleDatePostedChange}
              onJobTypeChange={handleJobTypeChange}
              onExperienceLevelChange={handleExperienceLevelChange}
              onSalaryRangeChange={handleSalaryRangeChange}
              onSkillChange={handleSkillChange}
              onIndustryChange={handleIndustryChange}
              onApplicationTypeChange={handleApplicationTypeChange}
              onResetFilters={resetFilters}
              onApplyFilters={applyFilters}
            />
          </div>
        </div>

        {/* Jobs listing */}
        <div className="lg:col-span-3">
          {/* Search and mobile filters */}
          <div className="space-y-4 mb-6">
            <JobSearchBar
              searchQuery={filterState.searchQuery}
              setSearchQuery={handleSearchQueryChange}
              onFilterClick={() => setShowMobileFilterSheet(true)}
            />

            {/* Mobile filter sheet */}
            <Sheet open={showMobileFilterSheet} onOpenChange={setShowMobileFilterSheet}>
              <SheetContent className="p-0 overflow-y-auto w-full sm:max-w-md">
                <JobsFilterSidebar
                  countries={countries}
                  cities={cities}
                  selectedCountries={filterState.selectedCountries}
                  selectedCities={filterState.selectedCities}
                  remoteOnly={filterState.remoteOnly}
                  datePosted={filterState.datePosted}
                  jobType={filterState.selectedJobTypes}
                  experienceLevel={filterState.selectedExperienceLevels}
                  salaryRange={filterState.salaryRange}
                  minSalary={30}
                  maxSalary={150}
                  skills={skills}
                  selectedSkills={filterState.selectedSkills}
                  industries={industries}
                  selectedIndustries={filterState.selectedIndustries}
                  applicationTypes={applicationTypes}
                  selectedApplicationTypes={filterState.selectedApplicationTypes}
                  onCountryChange={handleCountryChange}
                  onCityChange={handleCityChange}
                  onRemoteChange={handleRemoteChange}
                  onDatePostedChange={handleDatePostedChange}
                  onJobTypeChange={handleJobTypeChange}
                  onExperienceLevelChange={handleExperienceLevelChange}
                  onSalaryRangeChange={handleSalaryRangeChange}
                  onSkillChange={handleSkillChange}
                  onIndustryChange={handleIndustryChange}
                  onApplicationTypeChange={handleApplicationTypeChange}
                  onResetFilters={resetFilters}
                  onApplyFilters={applyFilters}
                />
              </SheetContent>
            </Sheet>
          </div>

          {/* Active filters display */}
          {hasActiveFilters && (
            <ActiveFiltersDisplay
              filterState={filterState}
              onRemoteChange={handleRemoteChange}
              onSavedChange={(checked) => setFilterState((prev) => ({ ...prev, savedOnly: checked }))}
              onCountryChange={handleCountryChange}
              onCityChange={handleCityChange}
              onDatePostedChange={handleDatePostedChange}
              onJobTypeChange={handleJobTypeChange}
              onExperienceLevelChange={handleExperienceLevelChange}
              onSkillChange={handleSkillChange}
              onIndustryChange={handleIndustryChange}
              onApplicationTypeChange={handleApplicationTypeChange}
              onResetFilters={resetFilters}
            />
          )}

          {/* Job tabs container with padding for mobile bottom nav */}
          <div className={`${isMobile ? "pb-20" : ""}`}>
            <JobTabs
              allJobs={filteredJobs}
              savedJobs={savedJobs}
              appliedJobs={appliedJobs}
              isLoading={isLoading}
              userId={userId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Extracted component for active filters display
interface ActiveFiltersDisplayProps {
  filterState: FilterState
  onRemoteChange: (checked: boolean) => void
  onSavedChange: (checked: boolean) => void
  onCountryChange: (country: string) => void
  onCityChange: (city: string) => void
  onDatePostedChange: (value: string) => void
  onJobTypeChange: (type: string) => void
  onExperienceLevelChange: (level: string) => void
  onSkillChange: (skill: string) => void
  onIndustryChange: (industry: string) => void
  onApplicationTypeChange: (type: string) => void
  onResetFilters: () => void
}

const ActiveFiltersDisplay = ({
  filterState,
  onRemoteChange,
  onSavedChange,
  onCountryChange,
  onCityChange,
  onDatePostedChange,
  onJobTypeChange,
  onExperienceLevelChange,
  onSkillChange,
  onIndustryChange,
  onApplicationTypeChange,
  onResetFilters,
}: ActiveFiltersDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 mb-6 p-3 bg-muted/30 rounded-lg"
    >
      <div className="text-sm text-muted-foreground mr-2 mt-1">Active filters:</div>

      {filterState.remoteOnly && <FilterBadge label="Remote only" onRemove={() => onRemoteChange(false)} />}

      {filterState.savedOnly && <FilterBadge label="Saved jobs" onRemove={() => onSavedChange(false)} />}

      {filterState.selectedCountries.map((country) => (
        <FilterBadge key={country} label={country} onRemove={() => onCountryChange(country)} />
      ))}

      {filterState.selectedCities.map((city) => (
        <FilterBadge key={city} label={city} onRemove={() => onCityChange(city)} />
      ))}

      {filterState.datePosted && <FilterBadge label={filterState.datePosted} onRemove={() => onDatePostedChange("")} />}

      {filterState.selectedJobTypes.map((type) => (
        <FilterBadge key={type} label={type} onRemove={() => onJobTypeChange(type)} />
      ))}

      {filterState.selectedExperienceLevels.map((level) => (
        <FilterBadge key={level} label={level} onRemove={() => onExperienceLevelChange(level)} />
      ))}

      {filterState.selectedSkills.map((skill) => (
        <FilterBadge key={skill} label={skill} onRemove={() => onSkillChange(skill)} />
      ))}

      {filterState.selectedIndustries.map((industry) => (
        <FilterBadge key={industry} label={industry} onRemove={() => onIndustryChange(industry)} />
      ))}

      {filterState.selectedApplicationTypes.map((type) => (
        <FilterBadge key={type} label={type} onRemove={() => onApplicationTypeChange(type)} />
      ))}

      <Button variant="ghost" size="sm" onClick={onResetFilters} className="h-7 ml-auto">
        Clear all
      </Button>
    </motion.div>
  )
}

interface FilterBadgeProps {
  label: string
  onRemove: () => void
}

const FilterBadge = ({ label, onRemove }: FilterBadgeProps) => (
  <Badge variant="secondary" className="flex gap-1 items-center">
    {label}
    <button onClick={onRemove} className="ml-1 hover:bg-muted rounded-full">
      <X className="h-3 w-3" />
    </button>
  </Badge>
)

export default Jobs
