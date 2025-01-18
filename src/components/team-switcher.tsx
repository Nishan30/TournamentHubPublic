'use client';

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTournament } from "@/context/tournamentContext";
import { useSearchParams } from 'next/navigation';
import { Suspense } from "react";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    id: string;
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const { setActiveTournament,activeTournament } = useTournament();
  const searchParams = useSearchParams();

  const tournamentId = searchParams?.get('id');

  const [activeTeam, setActiveTeam] = React.useState(() => {
    return teams.find((team) => team.id === tournamentId) || activeTournament || teams[0] || null;
  });

  // Ensure `setActiveTournament` syncs with `activeTeam`
  React.useEffect(() => {
    if (activeTeam != null) {
      setActiveTournament(activeTeam);
    }
  }, [activeTeam, setActiveTournament]);

  if (teams.length < 1) {
    return <p>No teams available.</p>;
  }
  else{
    setActiveTournament(activeTournament||teams.find((team) => team.id === tournamentId) || teams[0]);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>    
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {activeTeam?.logo && React.createElement(activeTeam.logo, { className: "size-4" })}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeTeam?.name}</span>
                <span className="truncate text-xs">{activeTeam?.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Tournaments
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => {
                  setActiveTeam(team);
                  setActiveTournament(team);
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {team.logo && React.createElement(team.logo, { className: "size-4 shrink-0" })}
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add Tournament</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
    </Suspense>
  );
}
