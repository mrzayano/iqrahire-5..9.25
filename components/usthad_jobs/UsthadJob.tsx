"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Building, Clock } from "lucide-react"
import UsthadFilter from "./UsthadFilter"
import UsthadJobForm from "./UsthadJobForm"
import UsthadSuccessModal from "./UsthadSuccessModal"
import { getUsthadJobs } from "@/actions/fetch_usthad_jobs"

type Job = {
  id: string
  initials: string
  title: string
  institution: string
  location: string
  postedTime: string
  remote: boolean
  skills: string[]
  description: string
  salary: string
}

type FilterKeys = "location" | "experience" | "subject" | "institutions" | "masjids"

interface JobCardProps {
  job: Job
  onApply: (job: Job) => void
}

const JobCard = ({ job, onApply }: JobCardProps) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300">
    <div className="flex items-start gap-4">
      <div className="bg-green-50 rounded-lg p-3 text-green-600 font-semibold text-lg min-w-[60px] h-[60px] flex items-center justify-center">
        {job.initials}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{job.title}</h3>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{job.institution}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>{job.postedTime}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            {job.remote && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Remote</Badge>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.map((skill) => (
            <Badge key={skill} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100">
              {skill}
            </Badge>
          ))}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{job.description}</p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-green-600 font-semibold text-lg">{job.salary}</div>
          <Button className="bg-green-600 hover:bg-green-700 text-white h-10 px-6" onClick={() => onApply(job)}>
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  </div>
)

const UsthadJob = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedFilters, setSelectedFilters] = useState<Record<FilterKeys, string[]>>({
    location: [],
    experience: [],
    subject: [],
    institutions: [],
    masjids: [],
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [showJobForm, setShowJobForm] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    async function fetchJobs() {
      const data = await getUsthadJobs()
      setJobs(data ?? [])
    }
    fetchJobs()
  }, [])

  const handleFilterChange = (category: FilterKeys, value: string) => {
    setSelectedFilters((prev) => {
      const isSelected = prev[category].includes(value)
      return {
        ...prev,
        [category]: isSelected ? prev[category].filter((item) => item !== value) : [...prev[category], value],
      }
    })
  }

  const handleApply = (job: Job) => {
    setSelectedJob(job)

    // Check if user data already exists in localStorage
    const savedData = localStorage.getItem("usthadJobFormData")
    if (savedData) {
      // If data exists, skip form and show success modal directly
      setShowSuccessModal(true)
    } else {
      // If no data, show the form
      setShowJobForm(true)
    }
  }

  const handleFormSubmit = () => {
    setShowJobForm(false)
    setShowSuccessModal(true)
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
    setSelectedJob(null)
  }

  const filteredJobs = jobs.filter((job) => {
    const locationMatch =
      selectedFilters.location.length === 0 || selectedFilters.location.some((loc) => job.location.includes(loc))

    const subjectMatch =
      selectedFilters.subject.length === 0 || job.skills.some((skill) => selectedFilters.subject.includes(skill))

    const institutionMatch =
      selectedFilters.institutions.length === 0 || selectedFilters.institutions.includes(job.institution)

    const searchMatch =
      searchTerm.trim() === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    return locationMatch && subjectMatch && institutionMatch && searchMatch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Usthadh Jobs</h1>
          <p className="text-gray-600">Find your perfect teaching opportunity in Islamic education</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <UsthadFilter selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Search Bar */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search jobs by title, institution, or skills..."
                  className="pl-12 h-12 text-base border-gray-200 focus:border-green-500 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                    activeTab === "all"
                      ? "border-green-600 bg-green-50 text-green-600"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <Building className="h-4 w-4" />
                  <span className="font-medium">All Jobs</span>
                  <Badge variant="outline" className="ml-1 bg-white">
                    {filteredJobs.length}
                  </Badge>
                </button>
              </div>

              <div className="text-sm text-gray-600">
                Showing {filteredJobs.length} of {jobs.length} jobs
              </div>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => <JobCard key={job.id} job={job} onApply={handleApply} />)
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search criteria or filters to find more opportunities.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Modals */}
      {showJobForm && selectedJob && (
        <UsthadJobForm
          isOpen={showJobForm}
          onClose={() => setShowJobForm(false)}
          onSubmit={handleFormSubmit}
          jobTitle={selectedJob.title}
        />
      )}

      {showSuccessModal && selectedJob && (
        <UsthadSuccessModal isOpen={showSuccessModal} onClose={handleCloseSuccessModal} jobTitle={selectedJob.title} />
      )}
    </div>
  )
}

export default UsthadJob
