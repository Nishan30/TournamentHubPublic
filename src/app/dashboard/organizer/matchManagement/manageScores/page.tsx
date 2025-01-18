"use client";

import React, { useState, useEffect } from "react";
import { SidebarLayoutOrganizer } from "@/components/common/sidebarOrganizer";
import { StandingsTable } from "@/components/standingTable/StandingsTable";
import { ResultScoresTable } from "@/components/resultTable/ResultScoresTable";
import { fetchMatchesByTournamentId } from "@/services/tournament/match";
import { useTournament } from "@/context/tournamentContext";
import { TournamentBracket } from "@/components/Bracket/TournamentBracket";
import { ITournament, Match } from "@/types/tournament";
import { fetchTournamentData } from "@/services/tournament/tournament";

const ManageScores = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { activeTournament } = useTournament();
  const [tournament, setTournament] = useState<ITournament | null>(null);

  const fetchMatches = async () => {
    setIsLoading(true);
    try {
      const data: Match[] = await fetchMatchesByTournamentId(
        activeTournament?.id as string
      );
      setMatches(data);
      const tournamentData = await fetchTournamentData(
        activeTournament?.id as string
      );
      if(tournamentData)setTournament(tournamentData);   
    } catch (err) {
      console.error(err);
      setError("Failed to fetch matches or tournament data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTournament?.id) {
      fetchMatches();
    }
  }, [activeTournament?.id]);

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <aside className="w-1/7 bg-neutral-900 border-r border-neutral-800">
        <SidebarLayoutOrganizer activeItem="Manage Scores" />
      </aside>
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold tracking-tight text-white">Manage Scores</h1>
        <p className="text-muted-foreground mb-8">
          Manage and view tournament scores.
        </p>

        {isLoading ? (
          <p className="text-white">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {tournament?.tournamentType === "single-elimination" && (
              <div className="mt-8">
                <TournamentBracket matches={matches} />
              </div>
            )}

            {tournament?.tournamentType === "league" && (
              <div className="mt-8">
                <StandingsTable matches={matches} />
              </div>
            )}

            <div className="mt-8">
              <ResultScoresTable matches={matches} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageScores;
