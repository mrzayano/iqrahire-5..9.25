"use client"
import ApplyPage from '@/components/jobs/apply/ApplyPage'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
    const { slug } = useParams<{ slug: string }>()

  return (
    <div><ApplyPage slug={slug}/></div>
  )
}

export default Page