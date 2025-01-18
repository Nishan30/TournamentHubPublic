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
import { Suspense } from "react";

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
      name: "Knights United",
      logo: GalleryVerticalEnd,
      plan: "Elite",
    },
    {
      id: "",
      name: "Phoenix Rising",
      logo: AudioWaveform,
      plan: "Pro",
    },
    {
      id: "",
      name: "Shadow Wolves",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard/organizer/dashboard/overview",
        },
        {
          title: "API Keys",
          url: "/dashboard/organizer/dashboard/apikeys",
        },
        {
          title: "Messaging",
          url: "/dashboard/organizer/dashboard/messaging",
        },
      ],
    },
    {
      title: "Participants and Teams",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Participant Management",
          url: "/dashboard/organizer/participantsTeams/participantManagement",
        },
        {
          title: "Team Management",
          url: "/dashboard/organizer/participantsTeams/teamManagement",
        },
      ],
    },
    {
      title: "Match Management",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Match Schedule",
          url: "/dashboard/organizer/matchManagement/matchSchedule",
        },
        {
          title: "Manage Scores",
          url: "/dashboard/organizer/matchManagement/manageScores",
        },
      ],
    },
    {
      title: "Arbiters",
      url: "#",
      icon: PieChart,
      items: [
        {
          title: "Manage Arbiters",
          url: "/dashboard/organizer/arbiters/manageArbiters",
        },
        {
          title: "Assign Arbiters",
          url: "/dashboard/organizer/arbiters/assignArbiters",
        },
      ],
    },
    {
      title: "Payment and Fees",
      url: "#",
      icon: Map,
      items: [
        {
          title: "Payment System",
          url: "/dashboard/organizer/paymentFees/paymentSystem",
        },
        {
          title: "Transaction History",
          url: "/dashboard/organizer/paymentFees/transactionHistory",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Tournament Settings",
          url: "/dashboard/organizer/settings/tournamentSettings",
        },
      ],
    },
    {
      title: "Analytics and Reports",
      url: "#",
      icon: Frame,
      items: [
        {
          title: "Tournament Reports",
          url: "/dashboard/organizer/analyticsReports/tournamentReports",
        },
        {
          title: "Participant Feedbacks",
          url: "/dashboard/organizer/analyticsReports/participantFeedbacks",
        },
      ],
    },
    {
      title: "Help and Support",
      url: "#",
      icon: AudioWaveform,
      items: [
        {
          title: "FAQs",
          url: "/dashboard/organizer/helpSupport/faqs",
        },
        {
          title: "Contact Support",
          url: "/dashboard/organizer/helpSupport/contactSupport",
        },
        {
          title: "AI Bot",
          url: "/dashboard/organizer/helpSupport/aiBot",
        },
      ],
    },
  ],
}

interface TournamentSidebarProps extends React.ComponentProps<typeof Sidebar> {
  teams: typeof data.teams; // Teams array
  currentActive?: string; // New prop for the active item
}

export function TournamentSidebar({
  teams, currentActive = "",
  ...props
}: TournamentSidebarProps) {
  console.log("teams" + teams.length);
  return (
    <Sidebar collapsible="icon" {...props}>
    <Suspense fallback={<div>Loading...</div>}>
      <TeamSwitcher teams={teams} />
    </Suspense>
      <SidebarContent>
        <NavMain items={data.navMain} currentActive={currentActive}/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

