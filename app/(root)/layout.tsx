"use client"

import {  useState } from "react"
import type { ReactNode } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import RootLayout from "@/components/layout/RootLayout"
import { CreatePostDialog } from "@/components/feed/CreatePostDialog"

export default function Layout({ children }: { children: ReactNode }) {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

 

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen">
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
