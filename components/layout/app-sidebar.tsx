
import Image from "next/image";
import { BookOpen, Briefcase, Home, MessageSquare, Users } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { usePathname } from 'next/navigation';  // Use usePathname from next/navigation
import { useEffect, useState } from 'react';


const UsthadIcon = () => (
  <Image
    src={"icons/usthad.svg"} 
    alt={""}  
    width={20}
    height={20}/>
);
// Menu items.
const routes = [
  { url: "/feed", icon: Home, label: "Feed" },
  { url: "/network", icon: Users, label: "Network" },
  { url: "/jobs", icon: Briefcase, label: "Jobs" },
  { url: "/usthad-jobs", icon: UsthadIcon, label: "Usthad Jobs" },
  { url: "/messages", icon: MessageSquare, label: "Messages" },
  { url: "/learning", icon: BookOpen, label: "Learning" },
  // { url: "/dashboard", icon: ChartNoAxesColumnIncreasing, label: "Dashboard" },
];

export function AppSidebar() {
  const { state } = useSidebar(); // Already in your code
  const pathname = usePathname();  // Use usePathname to get the current path

  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once the component has mounted on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return null (or a fallback) if we are not on the client side yet
  if (!isClient) return null;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Logo section */}
        <div className="flex items-center justify-left pt-4 pl-2">
          <Image
            src="/org/logo.png"
            alt="IqraHire Logo"
            width={200}
            height={40}
            className="object-contain transition-all duration-200"
            onClick={() => window.location.href = '/'}
          />
          {state !== 'collapsed' && (
            <span className="text-2xl font-bold text-primary ml-2 transition-opacity duration-200 flex">
              {/* Iqra <span className="text-tertiary">Hire</span> */}
            </span>
          )}
        </div>

        {/* Navigation group */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((item) => {
                const isActive = pathname === item.url;  // Compare with pathname instead of router.pathname
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild className={`${isActive ? "bg-primary/10" : ""} hover:bg-primary/10 hover:text-primary`}>
                      <a
                        href={item.url}
                        className={`flex items-center space-x-2${isActive ? " text-primary" : ""}`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="truncate">{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
