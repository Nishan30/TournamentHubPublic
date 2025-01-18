'use client';

import { TournamentSidebar } from "@/components/Tournament-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";
import { useEffect, useMemo } from "react";
import { LucideIcon } from "lucide-react";
import { GalleryVerticalEnd } from "lucide-react";
import { useTournaments } from "@/context/tournamentsContext";
import { fetchMatchesByTournamentId } from "@/services/tournament/match";

interface SidebarLayoutOrganizerProps {
  activeItem: string;
}

export function SidebarLayoutOrganizer({ activeItem }: SidebarLayoutOrganizerProps) {
  const { user } = useUser(); // Get user data from context
  const { tournaments, isLoading, error, fetchTournaments } = useTournaments();

  // Fetch tournaments only once when the user email is available
  useEffect(() => {
    if (user?.email) {
      fetchTournaments(user.email, 'organizer');
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
        <TournamentSidebar teams={teams} currentActive={activeItem} />
      )}
    </SidebarProvider>
  );
}
