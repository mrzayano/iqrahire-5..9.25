// File: app/jobs/[slug]/page.tsx
"use client"

import { JobDetail } from "@/components/jobs/innerpage/JobDetail"
import { useParams } from "next/navigation"

const Page = () => {
  const { slug } = useParams<{ slug: string }>()
  return <JobDetail slug={slug} />
}

export default Page
