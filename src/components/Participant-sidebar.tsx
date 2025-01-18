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
      name: "Team Titans",
      logo: GalleryVerticalEnd,
      plan: "Captain",
    },
    {
      id: "",
      name: "Rapid Strikers",
      logo: AudioWaveform,
      plan: "Player",
    },
    {
      id: "",
      name: "Solo Warrior",
      logo: Command,
      plan: "Individual",
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
          title: "My Dashboard",
          url: "/dashboard/participant/dashboard/overview",
        },
        {
          title: "Messaging",
          url: "/dashboard/participant/dashboard/messaging",
        },
      ],
    },
    {
      title: "Tournaments",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Joined Tournaments",
          url: "/dashboard/participant/tournaments/joinedTournament",
        },
        {
          title: "Explore Tournaments",
          url: "/dashboard/participant/tournaments/exploreTournament",
        },
      ],
    },
    {
      title: "Matches",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "My Matches",
          url: "#",
        },
        {
          title: "Match Schedules",
          url: "#",
        },
      ],
    },
    {
      title: "Achievements",
      url: "/dashboard/participant/achievement",
      icon: Settings2,
    },
    {
      title: "Feedback Form",
      url: "/dashboard/participant/feedbackForm",
      icon: Settings2,
    },
  ],
}

interface ParticipantSidebarProps extends React.ComponentProps<typeof Sidebar> {
  teams: typeof data.teams; // Teams array
  currentActive?: string; // New prop for the active item
}
export function ParticipantSidebar({
  teams, currentActive = "",
  ...props
}: ParticipantSidebarProps) {
  console.log("teams" + teams.length);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* Use the teams from props */}
        <Suspense fallback={<div>Loading...</div>}>
      <TeamSwitcher teams={teams} />
    </Suspense>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} currentActive={currentActive} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
