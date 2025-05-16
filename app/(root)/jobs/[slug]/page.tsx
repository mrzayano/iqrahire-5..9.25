"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Building, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Share2, 
  Bookmark, 
  BookmarkCheck,
  CheckCircle,
  ExternalLink,
  
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Job } from "@/types/job";

// Mock job data to simulate loading job details
const mockJobs = [
  {
    id: 1,
    slug:"backend-engineer-zakat-platform",
    title: "Senior Software Engineer",
    company: "Ethical Tech Solutions",
    location: {
      city: "Remote",
      country: "Global",
    },
    salary: "$120k - $150k",
    description: "We're looking for a Senior Software Engineer with experience in React, Node.js, and TypeScript to join our growing team. You'll be working on our main products and helping to shape the future of our platform.",
    postedDays: 2,
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
    isSaved: false,
    isRemote: true,
    type: "Full-Time",
    experienceLevel: "Senior",
    responsibilities: [
      "Design, develop, and maintain high-quality software",
      "Work collaboratively with product managers and designers to implement new features",
      "Mentor junior developers and provide code reviews",
      "Optimize application performance and scalability",
      "Participate in agile development processes"
    ],
    qualifications: [
      "5+ years of experience in software development",
      "Strong expertise in React, Node.js, and TypeScript",
      "Experience with cloud platforms like AWS",
      "Strong problem-solving skills and attention to detail",
      "Excellent communication and collaboration abilities"
    ],
    benefits: [
      "Competitive salary and equity options",
      "Remote-first work environment",
      "Flexible working hours",
      "Healthcare benefits",
      "Annual learning and development budget",
      "Regular team retreats"
    ],
    applicationMethod: "Easy Apply",
    companyDescription: "Ethical Tech Solutions is a leading provider of ethical technology solutions. We're on a mission to create technology that benefits humanity and respects user privacy. Our team of passionate engineers, designers, and product managers works together to build products that make a positive impact.",
    companyLogo: "https://source.unsplash.com/random/100×100/?logo"
  },
  {
    id: 2,
    title: "Marketing Specialist",
    company: "Halal Brands Inc.",
    location: {
      city: "Dubai",
      country: "UAE",
    },
    salary: "$80k - $100k",
    description: "Join our team as a Marketing Specialist responsible for creating and implementing marketing campaigns for our range of halal products. You'll work closely with our product and sales teams to drive brand awareness and customer acquisition.",
    postedDays: 7,
    skills: ["Digital Marketing", "Social Media", "Content Creation", "SEO", "Analytics"],
    isSaved: true,
    isRemote: false,
    type: "Full-Time",
    experienceLevel: "Mid-Level",
    responsibilities: [
      "Develop and execute marketing strategies across various channels",
      "Create engaging content for our digital platforms",
      "Manage social media accounts and community engagement",
      "Track campaign performance and provide analytics reports",
      "Collaborate with product teams to highlight key features"
    ],
    qualifications: [
      "3+ years of experience in marketing",
      "Bachelor's degree in Marketing or related field",
      "Experience with marketing automation tools",
      "Strong analytical and communication skills",
      "Knowledge of halal industry a plus"
    ],
    benefits: [
      "Competitive salary and performance bonuses",
      "Health and dental insurance",
      "Paid time off",
      "Professional development opportunities",
      "Halal meals provided in office"
    ],
    applicationMethod: "External",
    companyDescription: "Halal Brands Inc. is a leading provider of halal consumer goods. We're committed to providing high-quality, ethical products that meet the needs of Muslim consumers worldwide. Our diverse team works together to create innovative products that respect Islamic values.",
    companyLogo: "https://source.unsplash.com/random/100×100/?brand"
  },
  // ... other mock jobs from your existing data
];

const JobDetailPage = () => {
const { slug } = useParams();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState<Job | null>(null);
  const [isSaved, setIsSaved] = useState(false);


useEffect(() => {
  const loadJob = async () => {
    setIsLoading(true);

    try {
      if (slug) {
        const foundJob = mockJobs.find(j => j.slug === slug);
        if (foundJob) {
          setJob(foundJob);
          setIsSaved(foundJob.isSaved || false);
        }
      }
    } catch (error) {
      console.error("Error loading job details:", error);
      toast.error("Failed to load job details");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  };

  loadJob();
}, [slug]);


  const toggleSaveJob = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Job removed from saved items" : "Job saved successfully");
  };

  const handleApply = () => {
    if (job?.applicationMethod === "Easy Apply") {
      // Navigate to application page
      router.push(`/apply/${job.id}`);
    } else {
      // Open external application link or show modal
      toast.info("Redirecting to external application site...");
      // window.open(job?.externalApplicationUrl, "_blank");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job?.title} at ${job?.company}`,
        text: `Check out this job: ${job?.title} at ${job?.company}`,
        url: window.location.href,
      }).catch((error) => {
        console.error('Error sharing', error);
        toast.error("Couldn't share job");
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success("Job link copied to clipboard");
    }
  };



  if (isLoading) {
    return (
      <div className="container py-8 max-w-4xl mx-auto px-4">
        <div className="mb-4">
          <Skeleton className="h-8 w-40" />
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <Skeleton className="h-10 w-3/4" />
                <div className="flex gap-2 mt-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
              
              <div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-3/4 mt-2" />
              </div>
              
              <div>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-2/3 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container py-8 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>

        <p className="text-muted-foreground mb-6">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Button onClick={() => router.push('/jobs')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto px-4">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="mb-4 px-2" 
        onClick={() => router.push('/jobs')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Jobs
      </Button>
      
      {/* Main content */}
      <Card className="mb-6">
        <CardContent className="p-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{job.title}</h1>
              
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
              
              <div className="flex flex-wrap gap-1.5 mt-3">
                {job.isRemote && (
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    Remote
                  </Badge>
                )}
                {job.job_type && (
                  <Badge variant="secondary" className="bg-secondary/20 border-none">
                    {job.job_type}
                  </Badge>
                )}
                {job.skills?.map((skill, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary border-none">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="md:text-right">
              <div className="text-xl font-semibold text-primary mb-2">{job.salary}</div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col xs:flex-row gap-2 mb-6">
            <Button 
              className="flex-1" 
              size={isMobile ? "sm" : "default"}
              onClick={handleApply}
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
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"} 
                className={cn(isSaved && "text-primary")}
                onClick={toggleSaveJob}
              >
                {isSaved ? <BookmarkCheck className="mr-1 h-4 w-4" /> : <Bookmark className="mr-1 h-4 w-4" />}
                {isSaved ? "Saved" : "Save"}
              </Button>
              <Button 
                variant="outline" 
                size={isMobile ? "icon" : "default"} 
                onClick={handleShare}
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
      
      {/* Sticky apply button for mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-md">
          <Button 
            className="w-full" 
            onClick={handleApply}
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
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;
