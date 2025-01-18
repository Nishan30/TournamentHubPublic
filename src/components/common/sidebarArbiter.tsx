import { ArbiterSidebar } from "../Arbiter-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React, { useEffect, useMemo, useState } from "react";
import { useUser } from "@/context/UserContext";
import { LucideIcon } from "lucide-react"; 
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
import { useTournaments } from "@/context/tournamentsContext";

interface IArbitration {
  _id: string;
  tournamentId: string;
  startDate?: string;
}

interface ITournament {
  _id: string;
  name: string;
  email: string;
  startDate?: string;
}

interface ITeam {
  id: string;
  name: string;
  logo: LucideIcon; // Correctly use LucideIcon type here
  plan: string;
}

interface SidebarLayoutOrganizerProps {
  activeItem: string;
}

export function SidebarLayoutArbiter({ activeItem }: SidebarLayoutOrganizerProps) {
  const { user } = useUser(); // Get user data from context
    const { tournaments, isLoading, error, fetchTournaments } = useTournaments();
  
    // Fetch tournaments only once when the user email is available
    useEffect(() => {
      if (user?.email) {
        fetchTournaments(user.email, 'arbiter');
      }
    }, [user?.email, fetchTournaments]);
  
    // Memoize the teams to avoid unnecessary recalculations
    const teams = useMemo(
      () =>
        tournaments?.map((tournament) => ({
          id: tournament._id,
          name: tournament.name,
          logo: GalleryVerticalEnd,
          plan: "Free",
        })) || [],
      [tournaments]
    );

  return (
    <SidebarProvider>
          {isLoading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="flex flex-col items-center gap-2">
                <div className="loader" />
                <p>Loading tournaments...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-screen">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <ArbiterSidebar teams={teams} currentActive={activeItem} />
          )}
        </SidebarProvider>
  )
}
