"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

import {
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Share2,
  Bookmark,
  BookmarkCheck,
  Building,
  CheckSquare,
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import type { Job, JobsListProps } from "@/types/job"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface EnhancedJobsListProps extends JobsListProps {
  userId?: string
}

export const JobsList = ({ jobs, isLoading = false,  }: EnhancedJobsListProps) => {
  const [savingJob, setSavingJob] = useState<number | null>(null)
  const [applyingJob, setApplyingJob] = useState<number | null>(null)
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null)
  const isMobile = useIsMobile()

  // Check if these are applied jobs by looking at the structure
  const isAppliedJobsList = jobs && jobs.length > 0 && "status" in jobs[0] && jobs[0].status === "Applied"

  const handleJobSave = useCallback(async (job: Job) => {
    setSavingJob(job.id)

    // Simulate API call with a delay
    setTimeout(() => {
      // Show toast message instead of actual save
      toast.success("Feature coming soon! Job saving will be available in a future update.")
      setSavingJob(null)
    }, 500)
  }, [])

  const handleJobApply = useCallback(async (job: Job) => {
    setApplyingJob(job.id)

    // Simulate API call with a delay
    setTimeout(() => {
      // Show toast message instead of actual apply
      toast.success("Feature coming soon! Job application will be available in a future update.")
      setApplyingJob(null)
    }, 500)
  }, [])

  const handleShareJob = useCallback((job: Job) => {
    if (navigator.share) {
      navigator
        .share({
          title: `${job.title} at ${job.company}`,
          text: `Check out this job: ${job.title} at ${job.company}`,
          url: window.location.href,
        })
        .catch((error) => {
          console.log("Error sharing", error)
          toast.error("Couldn't share job")
        })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      toast.success("Job link copied to clipboard")
    }
  }, [])

  const toggleJobExpansion = useCallback((jobId: number) => {
    setExpandedJobId((prevId) => (prevId === jobId ? null : jobId))
  }, [])

  if (isLoading) {
    return <JobSkeletons />
  }

  if (!jobs || jobs.length === 0) {
    return <EmptyJobsState />
  }

  return (
    <div className="space-y-4">
      <AnimatePresence initial={false}>
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isMobile={isMobile}
            isExpanded={expandedJobId === job.id}
            savingJob={savingJob}
            applyingJob={applyingJob}
            onToggleExpand={toggleJobExpansion}
            onSave={handleJobSave}
            onApply={handleJobApply}
            onShare={handleShareJob}
            isAppliedJob={isAppliedJobsList}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Extracted components for better organization

const JobSkeletons = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <Card key={i} className="overflow-hidden">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-2 w-full">
              <div className="flex gap-3">
                <Skeleton className="h-12 w-12 rounded-md flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
              <Skeleton className="h-12 w-full mt-2" />
            </div>
            <div className="flex flex-col items-start md:items-end justify-between gap-4">
              <Skeleton className="h-5 w-24" />
              <div className="flex gap-2 w-full md:w-auto">
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

const EmptyJobsState = () => (
  <div className="text-center py-12">
    <Briefcase className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
    <h3 className="text-lg font-medium mb-2">No jobs found</h3>
    <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
  </div>
)

interface JobCardProps {
  job: Job
  isMobile: boolean
  isExpanded: boolean
  savingJob: number | null
  applyingJob: number | null
  onToggleExpand: (jobId: number) => void
  onSave: (job: Job) => void
  onApply: (job: Job) => void
  onShare: (job: Job) => void
  isAppliedJob?: boolean
}

const JobCard = ({
  job,
  isMobile,
  isExpanded,
  savingJob,
  onToggleExpand,
  onSave,
  onShare,
  isAppliedJob = false,
}: JobCardProps) => {
  const jobSaved = job.isSaved
  const isRemote = job.work_mode === "remote"
  const router = useRouter()

  // Format the applied date if it exists
  const appliedDate = job.created_at ? new Date(job.created_at).toLocaleDateString() : null

  return (
    <motion.div
      key={job.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card
        className={`overflow-hidden ${
          isAppliedJob
            ? "border-l-1 border-l-green-500 bg-green-50/30 hover:border-l-green-600"
            : "hover:border-l-primary/50"
        }`}
        onClick={isMobile ? () => onToggleExpand(job.id) : undefined}
      >
        <CardContent className={` ${isMobile ? "cursor-pointer" : ""}`}>
          {isAppliedJob && (
            <div className="flex items-center gap-2 mb-3 text-green-600 bg-green-100/50 py-1.5 px-3 rounded-md w-fit">
              <CheckSquare className="h-4 w-4" />
              <span className="text-sm font-medium">Applied {appliedDate || "recently"}</span>
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex gap-3">
                {/* Company Logo */}
                <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0 bg-primary/5 border">
                  {job?.company_logo ? (
                    <Image
                      src={job?.company_logo || "/placeholder.svg"}
                      alt={`${job.title} logo`}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `/placeholder.svg?height=48&width=48&text=${job.company.charAt(0)}`
                      }}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-semibold uppercase">
                      {job.title.charAt(0) + job.title.charAt(1)}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-3 flex-wrap mb-1.5 cursor-pointer">
                    <h3 className="text-lg md:text-xl font-bold" onClick={() => router.push(`/jobs/${job.slug}`)}>
                      {job.title}
                    </h3>
                    {isRemote && (
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        Remote
                      </Badge>
                    )}
                    {job.status && !isAppliedJob && <StatusBadge status={job.status} />}
                    {isAppliedJob && (
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Applied
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center text-muted-foreground">
                      <Building className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                      <span className="font-medium text-foreground/80">{job.company}</span>
                    </div>

                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                      <span>
                        {job.location.city}, {job.location.country}
                      </span>
                    </div>

                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                      <span>
                        {isAppliedJob
                          ? `Applied on ${appliedDate || "recently"}`
                          : `Posted ${job.postedDays} ${job.postedDays === 1 ? "day" : "days"} ago`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills tags - show fewer on mobile unless expanded */}
              <div className="flex flex-wrap gap-1.5 mt-1">
                {job.skills.slice(0, isMobile && !isExpanded ? 2 : job.skills.length).map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={
                      isAppliedJob
                        ? "bg-green-100 text-green-700 border-none text-xs"
                        : "bg-primary/10 text-primary border-none text-xs"
                    }
                  >
                    {skill}
                  </Badge>
                ))}
                {isMobile && !isExpanded && job.skills.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{job.skills.length - 2} more
                  </Badge>
                )}
              </div>

              {/* Job description - only show on desktop or when expanded on mobile */}
              {(!isMobile || isExpanded) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="line-clamp-3 text-sm mt-2 text-muted-foreground">{job.description}</p>

                  {/* Only show application date on desktop or when expanded */}
                  {job.appliedDate && !isAppliedJob && (
                    <div className="text-xs mt-3 py-1.5 px-3 bg-muted/50 rounded-md inline-block">
                      Applied {job.appliedDate}
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            <div className="flex flex-col items-start md:items-end justify-between gap-2 md:gap-4 min-w-[140px]">
              <div className="font-medium text-primary">
                {job.salary
                  ? `${job.salary.from ? job.salary.from.toLocaleString() : ""}${
                      job.salary.to ? ` - ${job.salary.to.toLocaleString()}` : ""
                    } ${job.salary.currency} / ${job.salary.period.charAt(0).toUpperCase() + job.salary.period.slice(1)}`
                  : "Salary not specified"}
              </div>

              {/* Action buttons - always visible on desktop, visible when expanded on mobile */}
              <div
                className={`flex gap-2 w-full md:w-auto mt-2 ${!isMobile || isExpanded ? "flex" : "hidden md:flex"}`}
              >
                <div className="flex gap-1">
                  <Button
                    onClick={() => router.push(`/jobs/${job.slug}`)}
                    variant={isAppliedJob ? "outline" : "default"}
                  >
                    View
                  </Button>
                  {!isAppliedJob && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSave(job)
                      }}
                      className={jobSaved ? "text-primary" : ""}
                      disabled={savingJob === job.id}
                    >
                      {savingJob === job.id ? (
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : jobSaved ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      onShare(job)
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile expand/collapse indicator */}
          {isMobile && (
            <div className="text-center mt-3 text-xs text-muted-foreground">
              {isExpanded ? "Tap to collapse" : "Tap for details"}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface StatusBadgeProps {
  status: "Applied" | "Interviewed" | "Accepted" | "Rejected"
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  let variant: "outline" | "secondary" | "default" | "destructive" = "outline"
  let icon = null

  switch (status) {
    case "Applied":
      variant = "outline"
      icon = <Clock className="h-3 w-3" />
      break
    case "Interviewed":
      variant = "secondary"
      icon = <CheckCircle className="h-3 w-3" />
      break
    case "Accepted":
      variant = "default"
      icon = <CheckCircle className="h-3 w-3" />
      break
    case "Rejected":
      variant = "destructive"
      icon = <XCircle className="h-3 w-3" />
      break
  }

  return (
    <Badge variant={variant} className="flex items-center gap-1">
      {icon}
      {status}
    </Badge>
  )
}
