
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { JobsList } from "@/components/jobs/JobsList"
import { Briefcase, Clock, } from "lucide-react"
import type { JobTabsProps } from "@/types/job"

interface EnhancedJobTabsProps extends JobTabsProps {
  isLoading?: boolean
  userId?: string
}

export const JobTabs = ({
  allJobs,
  appliedJobs,
  isLoading = false,
  userId,
}: EnhancedJobTabsProps) => {

  return (
    <Tabs defaultValue="all" className="w-full">
      {/* Non-mobile tabs display at top */}
      
        <TabsList className="mb-6 w-full overflow-x-auto flex whitespace-nowrap sm:justify-start">
          <TabsTrigger value="all" className="px-4 shadow-none data-[state=active]:shadow-none ">
            <Briefcase className="h-4 w-4 mr-2" />
            All Jobs
            <Badge variant="outline" className="ml-2 bg-muted ">
              {allJobs.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="applied" className="px-4 data-[state=active]:shadow-none ">
            <Clock className="h-4 w-4 mr-2" />
            Applied
            <Badge variant="outline" className="ml-2 bg-muted">
              {appliedJobs.length}
            </Badge>
          </TabsTrigger>
       

        </TabsList>
      

      {/* Tab content for all tabs */}
      <TabsContent value="all">
        <JobsList jobs={allJobs} isLoading={isLoading} userId={userId} />
      </TabsContent>
      <TabsContent value="applied">
        <JobsList jobs={appliedJobs} isLoading={isLoading} userId={userId} />
      </TabsContent>




    
    </Tabs>
  )
}
