"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { JobsList } from "@/components/jobs/JobsList"
import { Briefcase, Clock, CheckCircle, XCircle } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import type { JobTabsProps } from "@/types/job"

interface EnhancedJobTabsProps extends JobTabsProps {
  isLoading?: boolean
  userId?: string
}

export const JobTabs = ({
  allJobs,
  appliedJobs,
  acceptedJobs,
  rejectedJobs,
  isLoading = false,
  userId,
}: EnhancedJobTabsProps) => {
  const isMobile = useIsMobile()

  return (
    <Tabs defaultValue="all" className="w-full">
      {/* Non-mobile tabs display at top */}
      {!isMobile ? (
        <TabsList className="mb-6 w-full overflow-x-auto flex whitespace-nowrap sm:justify-start">
          <TabsTrigger value="all" className="px-4">
            <Briefcase className="h-4 w-4 mr-2" />
            All Jobs
            <Badge variant="secondary" className="ml-2 bg-muted">
              {allJobs.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="applied" className="px-4">
            <Clock className="h-4 w-4 mr-2" />
            Applied
            <Badge variant="secondary" className="ml-2 bg-muted">
              {appliedJobs.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="accepted" className="px-4">
            <CheckCircle className="h-4 w-4 mr-2" />
            Accepted
            <Badge variant="secondary" className="ml-2 bg-muted">
              {acceptedJobs.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="rejected" className="px-4">
            <XCircle className="h-4 w-4 mr-2" />
            Rejected
            <Badge variant="secondary" className="ml-2 bg-muted">
              {rejectedJobs.length}
            </Badge>
          </TabsTrigger>
        </TabsList>
      ) : null}

      {/* Tab content for all tabs */}
      <TabsContent value="all">
        <JobsList jobs={allJobs} isLoading={isLoading} userId={userId} />
      </TabsContent>
      <TabsContent value="applied">
        <JobsList jobs={appliedJobs} isLoading={isLoading} userId={userId} />
      </TabsContent>
      <TabsContent value="accepted">
        <JobsList jobs={acceptedJobs} isLoading={isLoading} userId={userId} />
      </TabsContent>
      <TabsContent value="rejected">
        <JobsList jobs={rejectedJobs} isLoading={isLoading} userId={userId} />
      </TabsContent>

      {/* Mobile-only bottom navigation */}
      {isMobile ? (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around items-center p-2 z-40">
          <TabsList className="bg-transparent w-full flex justify-between">
            <TabsTrigger value="all" className="flex-1 flex-col pt-2 pb-1 px-2 h-auto rounded-md">
              <Briefcase className="h-5 w-5 mb-1" />
              <span className="text-xs">All</span>
              <Badge variant="secondary" className="ml-0 mt-1 text-xs bg-muted">
                {allJobs.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="applied" className="flex-1 flex-col pt-2 pb-1 px-2 h-auto rounded-md">
              <Clock className="h-5 w-5 mb-1" />
              <span className="text-xs">Applied</span>
              <Badge variant="secondary" className="ml-0 mt-1 text-xs bg-muted">
                {appliedJobs.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="accepted" className="flex-1 flex-col pt-2 pb-1 px-2 h-auto rounded-md">
              <CheckCircle className="h-5 w-5 mb-1" />
              <span className="text-xs">Accepted</span>
              <Badge variant="secondary" className="ml-0 mt-1 text-xs bg-muted">
                {acceptedJobs.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex-1 flex-col pt-2 pb-1 px-2 h-auto rounded-md">
              <XCircle className="h-5 w-5 mb-1" />
              <span className="text-xs">Rejected</span>
              <Badge variant="secondary" className="ml-0 mt-1 text-xs bg-muted">
                {rejectedJobs.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>
      ) : null}
    </Tabs>
  )
}
