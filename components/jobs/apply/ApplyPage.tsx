import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";

interface Props {
  slug: string
}

const ApplyPage = ({ slug }: Props) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null as File | null,
    coverLetter: ""
  });

  useEffect(() => {
    // In a real app, you'd fetch the job details here
    const loadJob = async () => {
      try {
        // Simulate fetching job details
        // For now, we'll extract the job title from the URL
        if (slug) {
          const parts = slug.split('-');
          parts.pop(); // Remove the ID part
          const title = parts.join(' ').replace(/-/g, ' ');
          setJobTitle(title.charAt(0).toUpperCase() + title.slice(1));
          setJobCompany("Simulated Company");
        }
        
        // Pre-fill user data if logged in
        // In a real app, you'd get this from context or state management
        setFormData(prev => ({
          ...prev,
          fullName: "Jane Doe", // Mock data
          email: "jane.doe@example.com" // Mock data
        }));
        
      } catch (error) {
        console.error("Error loading job details:", error);
        toast.error("Failed to load job application");
      }
    };
    
    loadJob();
  }, [slug]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.resume) {
      toast.error("Please fill all required fields and upload your resume");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real app, you'd submit the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Application submitted successfully!");
      router.push("/jobs");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8 max-w-2xl mx-auto px-4 pb-20">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="mb-4 px-2" 
        onClick={() => router.push(`/jobs/${slug}`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Job Details
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            Apply for {jobTitle}
            {jobCompany && <span className="block text-lg font-normal text-muted-foreground mt-1">at {jobCompany}</span>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input 
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="resume">Resume/CV *</Label>
                <div className="mt-1">
                  <Label 
                    htmlFor="resume-upload" 
                    className="flex justify-center border-2 border-dashed border-muted rounded-md p-6 cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground mt-2">
                        <span className="font-semibold text-primary">Upload a file</span> or drag and drop
                      </div>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOCX, TXT up to 5MB
                      </p>
                    </div>
                    <Input 
                      id="resume-upload"
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                      className="sr-only"
                      accept=".pdf,.doc,.docx,.txt"
                    />
                  </Label>
                  {formData.resume && (
                    <p className="text-sm mt-2 text-muted-foreground">
                      Selected file: {formData.resume.name}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                <Textarea 
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Write a brief cover letter or any additional information you'd like to share"
                  className="mt-1 min-h-[150px]"
                />
              </div>
            </div>
            
            <div className={`${isMobile ? 'fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-md' : ''}`}>
              <Button 
                type="submit" 
                className={`${isMobile ? 'w-full' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplyPage;
