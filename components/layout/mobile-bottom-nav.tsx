"use client"

import { Rss, Users, MessageSquare, User, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"

type NavItem = {
  icon: React.FC<{ className?: string }>
  label: string
  href?: string
  action?: () => void
  isCenter?: boolean
}

interface MobileBottomNavProps {
  onOpenCreatePost: () => void
}

export function MobileBottomNav({ onOpenCreatePost }: MobileBottomNavProps) {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { icon: Rss, label: "Feed", href: "/" },
    { icon: Users, label: "Network", href: "/network" },
    { icon: Plus, label: "Create", action: onOpenCreatePost, isCenter: true },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: User, label: "Profile", href: "/profile" }
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t h-16 px-4">
      <div className="flex items-center justify-around h-full">
        {navItems.map((item, index) => {
          const isActive = item.href === pathname
          const Icon = item.icon

          const commonClasses = cn(
            "flex flex-col items-center justify-center text-xs",
            item.isCenter
              ? "bg-primary text-white rounded-full h-12 w-12 shadow-lg"
              : isActive
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )

          return item.href ? (
            <Link key={index} href={item.href} className="flex flex-col items-center">
              <div className={commonClasses}>
                <Icon className="h-5 w-5" />
                {!item.isCenter && <span className="text-xs mt-1">{item.label}</span>}
              </div>
            </Link>
          ) : (
            <button
              key={index}
              onClick={item.action}
              className={commonClasses}
            >
              <Icon className="h-5 w-5" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
