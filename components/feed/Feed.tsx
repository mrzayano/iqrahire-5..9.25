"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  Bookmark, Lightbulb, User } from "lucide-react"
import { UnderDevelopment } from "@/components/shared/UnderDevelopment"
import { useIsMobile } from "@/hooks/use-mobile"
import { FeedCard } from "./FeedCard"

// Mock posts data


export default function Feed() {
  const isMobile = useIsMobile()


  return (
    <div className="container py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Posts Feed */}
        <div className="md:col-span-2 space-y-6">
          {/* Create Post Card */}

          {/* {isMobile && (
            <></>
          ) ? (
            null
          ) : <Card className="shadow-none">
            <CardContent className="pt-6 ">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Share your thoughts or ask a question..."
                    className="mb-4"
                  />
                  <div className="flex justify-end">
                    <Button disabled={!postContent.trim()} >
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>} */}


          {/* Arabic Verse */}
          <div className="p-4 bg-primary/10 rounded-md text-center ">
            <p className="text-lg font-semibold mb-2 arabic-text font-arabic"> ﷽</p>
            <p className="text-sm text-muted-foreground">In the name of Allah, the Most Gracious, the Most Merciful</p>
          </div>
          {isMobile ? (
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="text-lg">Daily Wisdom</CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 pl-4 italic">
                  &quot;The best among you are those who have the best character.&quot;
                  <footer className="text-right text-sm text-muted-foreground mt-2">— Prophet Muhammad ﷺ</footer>
                </blockquote>
              </CardContent>
            </Card>
          ) : (
            null
          )}

          {/* Posts Feed */}
         <FeedCard/>
        </div>
        {isMobile ? (
              null
            ) : (
          <div className="space-y-6">
            {/* Daily Wisdom Card */}
           
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Daily Wisdom</CardTitle>
                </CardHeader>
                <CardContent>
                  <blockquote className="border-l-4 pl-4 italic">
                    &quot;The best among you are those who have the best character.&quot;
                    <footer className="text-right text-sm text-muted-foreground mt-2">— Prophet Muhammad ﷺ</footer>
                  </blockquote>
                </CardContent>
              </Card>
          

            {/* Job Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Job Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* {[
                {
                  title: "Senior Software Engineer",
                  company: "Ethical Tech Solutions",
                  location: "Remote",
                  daysAgo: 2,
                },
                {
                  title: "Marketing Specialist",
                  company: "Halal Brands Inc.",
                  location: "Dubai, UAE",
                  daysAgo: 7,
                },
                {
                  title: "Financial Analyst",
                  company: "Islamic Finance Group",
                  location: "London, UK",
                  daysAgo: 3,
                },
              ].map((job, index) => (
                <div key={index} className="border-b last:border-b-0 pb-3 last:pb-0">
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{job.location}</span>
                    <span>{job.daysAgo} days ago</span>
                  </div>
                </div>
              ))}
              <Button asChild variant="ghost" size="sm" className="w-full">
                <a href="/jobs">View All Jobs</a>
              </Button> */}
                <UnderDevelopment title="Jobs" icon={<Bookmark />} small />
              </CardContent>
            </Card>

            {/* People You May Know */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">People You May Know</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* {[
                {
                  name: "Omar Farooq",
                  title: "Product Manager at TechStart",
                  avatar: "https://i.pravatar.cc/150?u=omar",
                },
                {
                  name: "Aisha Malik",
                  title: "UX Designer at CreativeWorks",
                  avatar: "https://i.pravatar.cc/150?u=aisha",
                },
                {
                  name: "Ibrahim Hassan",
                  title: "Data Scientist at AnalyticsPro",
                  avatar: "https://i.pravatar.cc/150?u=ibrahim",
                },
              ].map((person, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Avatar>
                    <AvatarImage src={person.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{person.name}</h3>
                    <p className="text-xs text-muted-foreground">{person.title}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Connect
                  </Button>
                </div>
              ))} */}
                <UnderDevelopment title="People" icon={<User />} small />
              </CardContent>
            </Card>

            {/* Learning Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommended Learning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* {["Ethical Leadership in the Workplace", "Islamic Finance Fundamentals", "Balancing Work and Faith"].map(
                (course, index) => (
                  <div key={index} className="border-b last:border-b-0 pb-3 last:pb-0">
                    <h3 className="font-medium text-sm">{course}</h3>
                    <div className="h-1 bg-muted rounded-full mt-2">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ),
              )}
              <Button asChild variant="ghost" size="sm" className="w-full">
                <a href="/learning">Explore Courses</a>
              </Button> */}
                <UnderDevelopment title="Learning" icon={<Lightbulb />} small />
              </CardContent>
            </Card>
          </div>
  )}
        {/* Right Column - Sidebar */}

      </div>

    </div>
  )
}
