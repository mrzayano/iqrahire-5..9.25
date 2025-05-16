"use client"

import Link from "next/link"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"

export default function NotFound() {
  useEffect(() => {
    console.log("404 Error: User attempted to access non-existent route")
  }, [])

  const { isSignedIn } = useUser();


  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <div className="mb-6">
            <p className="text-xl text-foreground mb-2">Page Not Found</p>
            <p className="text-muted-foreground">We couldn&apos;t find the page you were looking for.</p>
          </div>
        </div>

        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            {isSignedIn? (
              <Link href="/jobs">Go to Jobs</Link>
            ):(
              <Link href="/">Return Home</Link>

            )}
            
          </Button>
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="ml-2 text-muted-foreground">
              Need help?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact Support
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
