"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { Suspense } from "react"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Nishan",
    email: "nishan@example.com",
    avatar: "/avatars/nishan.jpg",
  },
  teams: [
    {
      id: "",
      name: "Tournament Oversight",
      logo: GalleryVerticalEnd,
      plan: "Lead Arbiter",
    },
    {
      id: "",
      name: "Regional Qualifiers",
      logo: AudioWaveform,
      plan: "Arbiter",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "#",
        },
        {
          title: "Notifications",
          url: "#",
        },
      ],
    },
    {
      title: "Tournaments",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Assigned Matches",
          url: "/dashboard/participant/dashboard/assignedMatch",
        },
        {
          title: "Explore Tournaments",
          url: "/dashboard/participant/dashboard/exploreTournament",
        },
      ],
    },
    {
      title: "Matches",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Manage Matches",
          url: "#",
        },
        {
          title: "Review Results",
          url: "#",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: PieChart,
      items: [
        {
          title: "Generate Reports",
          url: "#",
        },
        {
          title: "Submitted Reports",
          url: "#",
        },
      ],
    },
    {
      title: "Profile",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "View Profile",
          url: "#",
        },
        {
          title: "Edit Profile",
          url: "#",
        },
      ],
    },
  ],
}

interface ArbiterSidebarProps extends React.ComponentProps<typeof Sidebar> {
  teams: typeof data.teams; // Teams array
  currentActive?: string; // New prop for the active item
}

export function ArbiterSidebar({
  teams,currentActive = "",
  ...props
}: ArbiterSidebarProps) {
  console.log("teams" + teams.length);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Suspense fallback={<div>Loading...</div>}>
      <TeamSwitcher teams={teams} />
    </Suspense>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} currentActive={currentActive}/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
