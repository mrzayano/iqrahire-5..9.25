"use client"

import { type ReactNode } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Bell, Plus, MessageSquare, LineChart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useIsMobile } from "@/hooks/use-mobile"
import { UnderDevelopment } from "@/components/shared/UnderDevelopment"
import { SignOutButton, useUser } from "@clerk/nextjs"
import { SidebarTrigger } from "../ui/sidebar"
import { MobileBottomNav } from "./mobile-bottom-nav"

interface RootLayoutProps {
  children: ReactNode
  onOpenCreatePost: () => void
}

const RootLayout = ({ children, onOpenCreatePost }: RootLayoutProps) => {
  const isMobile = useIsMobile()
  const {  user } = useUser()
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-sm shadow-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          {/* Left: Logo + Menu */}
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Link href="/" className="text-2xl font-bold text-primary">IqraHire</Link>
          </div>

          {/* Center: Search */}
          <div className="hidden md:block flex-1 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search" className="pl-10 bg-muted/50 border-none" />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {!isMobile && (
              <>
                <Button className="rounded-full" onClick={onOpenCreatePost}>
                  <Plus className="h-5 w-5 md:mr-1" />
                  <span className="hidden sm:inline-block">Create</span>
                </Button>

                <Link href="/messages">
                  <Button variant="ghost" size="icon" className="relative rounded-full">
                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-[10px] text-white flex items-center justify-center rounded-full">3</div>
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </Link>
              </>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-[10px] text-white flex items-center justify-center rounded-full">5</div>
                  <Bell className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <UnderDevelopment title="Mini Chart" icon={<LineChart />} size="small" />
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src={user?.imageUrl || ""} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">View profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <SignOutButton>Log Out</SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>
      <MobileBottomNav onOpenCreatePost={onOpenCreatePost} />
    </div>
  )
}

export default RootLayout
