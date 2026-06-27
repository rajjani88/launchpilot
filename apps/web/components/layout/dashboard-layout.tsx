"use client";

import * as React from "react"
import { LayoutDashboard, Users, CreditCard, Settings, ChevronDown, Check } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Example data
const items = [
  {
    title: "Projects",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Team",
    url: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Billing",
    url: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [activeWorkspace, setActiveWorkspace] = React.useState("Acme Corp")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50 dark:bg-zinc-950">
        <Sidebar className="border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-md">
          <SidebarHeader className="border-b border-slate-200 dark:border-zinc-800 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer w-full p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground font-medium">Workspace</span>
                    <span className="text-sm font-semibold">{activeWorkspace}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveWorkspace("Acme Corp")} className="justify-between">
                  Acme Corp
                  {activeWorkspace === "Acme Corp" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveWorkspace("Stark Industries")} className="justify-between">
                  Stark Industries
                  {activeWorkspace === "Stark Industries" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url} className="flex items-center gap-3 px-3 py-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-slate-200 dark:border-zinc-800 p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">john@example.com</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="flex h-14 items-center gap-4 border-b border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md px-6">
            <SidebarTrigger />
            <div className="flex-1" />
            {/* Top right actions could go here */}
          </header>
          <div className="flex-1 overflow-auto p-6 lg:p-8">
            <div className="mx-auto max-w-6xl">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
