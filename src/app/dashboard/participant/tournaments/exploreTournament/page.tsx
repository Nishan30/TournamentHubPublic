"use client";

import { useEffect, useState } from "react";
import { FeatureCard } from "@/components/dashboard/tournamentFeature";
import { Trophy, MapPin, Calendar, Users } from "lucide-react";
import { getPublicTournaments } from "@/services/tournament/tournament";
import { ITournament } from "@/types/tournament";
import { format } from "date-fns";
import { SidebarLayoutParticipant } from "@/components/common/sidebarParticipant";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<ITournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        // Call the helper function to fetch public tournaments
        const data = await getPublicTournaments();
        setTournaments(data);
      } catch (err) {
        setError("Failed to load tournaments");
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const getTournamentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'chess':
        return Trophy;
      case 'basketball':
        return Users;
      default:
        return Trophy;
    }
  };

  const formatTournamentDates = (start: Date, end: Date) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-48"></div>
          <div className="h-4 bg-muted rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-destructive flex flex-col items-center">
          <Trophy className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-lg font-semibold">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 text-sm underline hover:text-destructive/80"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-1/7 border-r border-neutral-800">
        <SidebarLayoutParticipant activeItem="Explore Tournaments" />
      </aside>
      
      <main className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Public Tournaments</h1>
          <p className="text-muted-foreground">
            Discover and join exciting tournaments happening around you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
            <FeatureCard
              key={tournament._id}
              title={tournament.name}
              description={
                <div className="space-y-2">
                  <span className="block line-clamp-2">{tournament.description}</span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{tournament.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatTournamentDates(tournament.startDate, tournament.endDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{tournament.playerCount} players</span>
                  </div>
                </div>
              }
              icon={getTournamentIcon(tournament.tournamentType)}
              url={`/dashboard/participant/tournaments/exploreTournament/${tournament._id}`}
              className="h-full"
            />
          ))}
        </div>

        {tournaments.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Tournaments Found</h3>
            <p className="text-muted-foreground">
              There are currently no public tournaments available.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
