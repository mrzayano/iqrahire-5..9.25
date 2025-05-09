"use client"

import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import RootLayout from "@/components/layout/RootLayout"
import { CreatePostDialog } from "@/components/feed/CreatePost"

export default function Layout({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <RootLayout onOpenCreatePost={() => setIsCreatePostOpen(true)}>
            {children}
          </RootLayout>
        </div>
      </div>
      <CreatePostDialog
        isOpen={isCreatePostOpen}
        onOpenChange={setIsCreatePostOpen}
      />
    </SidebarProvider>
  )
}
