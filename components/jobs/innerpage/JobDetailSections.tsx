import { GetAppliedJobByUser } from "@/actions/fetch_applied_jobs"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Job } from "@/types/job"
import { Share2, CheckCircle, ExternalLink, Building, MapPin, Calendar, Briefcase } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Props {
  job: Job
  isMobile: boolean
  onShare: () => void
  onApply: () => void
}

const JobDetailSections = ({ job, onShare, onApply }: Props) => {


  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const jobs = await GetAppliedJobByUser();
      setAppliedJobs(jobs);
      console.log(jobs, "apple");
    };

    fetchAppliedJobs();
  }, []);

  console.log(appliedJobs, "sd");


  const isMobile = useIsMobile();
  return (
    <Card>
      <CardContent className='p-6 space-y-6'>
        <div className='flex flex-col md:flex-row justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-bold'>{job.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-1.5 flex-shrink-0" />
                <span className="font-medium text-foreground/80">{job.company}</span>
              </div>

              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
                <span>
                  {job.location.city}, {job.location.country}
                </span>
              </div>

              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5 flex-shrink-0" />
                <span>
                  Posted {job.postedDays} {job.postedDays === 1 ? "day" : "days"} ago
                </span>
              </div>

              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1.5 flex-shrink-0" />
                <span>{job.experience_level}</span>
              </div>
            </div>
            <div className='flex gap-2 mt-2 flex-wrap'>
              {job.skills.map(skill => (
                <Badge key={skill} variant='outline' className="bg-primary-foreground">{skill}</Badge>
              ))}
            </div>
          </div>
          <div className='text-xl font-semibold text-primary'>
            {job.salary
              ? `${job.salary.currency}${job.salary.from} - ${job.salary.currency}${job.salary.to}`
              : 'Not disclosed'}
          </div>
        </div>



        {/* Action buttons */}
        {/* Action buttons */}
        <div className="flex flex-col xs:flex-row gap-2 mb-6">
          {job.applicationMethod === "Easy Apply" &&
            appliedJobs?.some((appliedJob) => appliedJob.job_id === job.id) ? (
            <Button
              className="flex-1 bg-green-500 hover:bg-green-600 text-white cursor-not-allowed disabled:opacity-100"
              size={isMobile ? "sm" : "default"}
              disabled
            >
              <CheckCircle className="mr-1 h-4 w-4" />
              Applied
            </Button>
          ) : (
            <Button
              className="flex-1"
              size={isMobile ? "sm" : "default"}
              onClick={onApply}
            >
              {job.applicationMethod === "Easy Apply" ? (
                <>
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Easy Apply
                </>
              ) : (
                <>
                  <ExternalLink className="mr-1 h-4 w-4" />
                  Apply Now
                </>
              )}
            </Button>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              size={isMobile ? "icon" : "default"}
              onClick={onShare}
            >
              {!isMobile && "Share"}
              <Share2 className={cn("h-4 w-4", !isMobile && "ml-1")} />
            </Button>
          </div>
        </div>





        {/* Job Details Sections */}
        <div className="space-y-6">
          {/* Description */}
          <Card>
            <CardHeader
              className="cursor-pointer flex justify-between items-center"
            >
              <CardTitle className="text-xl font-semibold">Job Description</CardTitle>

            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{job.description}</p>
            </CardContent>

          </Card>

          {/* Responsibilities */}
          {job.responsibilities && (
            <Card>
              <CardHeader
                className="cursor-pointer flex justify-between items-center"
              >
                <CardTitle className="text-xl font-semibold">Responsibilities</CardTitle>

              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Qualifications */}
          {job.qualifications && (
            <Card>
              <CardHeader
                className="cursor-pointer flex justify-between items-center"
              >
                <CardTitle className="text-xl font-semibold">Qualifications</CardTitle>

              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {job.qualifications.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Benefits */}
          {job.benefits && (
            <Card>
              <CardHeader
                className="cursor-pointer flex justify-between items-center"
              >
                <CardTitle className="text-xl font-semibold">Benefits & Perks</CardTitle>

              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {job.benefits.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </CardContent>

            </Card>
          )}

          {/* Company Info */}
          {job.description && (
            <Card>
              <CardHeader
                className="cursor-pointer flex justify-between items-center"
              >
                <CardTitle className="text-xl font-semibold">About {job.company}</CardTitle>

              </CardHeader>
              <CardContent>
                <div className="mb-4 w-16 h-16 overflow-hidden rounded-md">
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={"https://images.unsplash.com/photo-1633419461186-7d40a38105ec?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                      alt={`${job.company} logo`}
                      className="object-cover w-full h-full"
                      width={100}
                      height={100}
                    />
                  </AspectRatio>
                </div>

                <p className="text-muted-foreground">{job.description}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  )
}


export default JobDetailSections
