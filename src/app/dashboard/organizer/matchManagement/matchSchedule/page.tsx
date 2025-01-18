"use client";

import { useState, useEffect } from "react";
import { TournamentCalendar } from "@/components/calendar/tournament-calendar";
import { SidebarLayoutOrganizer } from "@/components/common/sidebarOrganizer";
import { useTournament } from "@/context/tournamentContext";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import { Input } from "@/components/ui/input";
import { DateRange } from "react-day-picker";
import toast from "react-hot-toast";

interface ITournament {
  _id: string;
  name: string;
  organizerName: string;
  email: string;
  description: string;
  rules: string;
  location: string;
  playerCount: string;
  leagueTournament: boolean;
  tournamentType:string
  hasPlayerList: boolean;
  needsArbriter: boolean;
  isIndividual: boolean;
  paymentSystem: boolean;
  startDate: Date;
  endDate: Date;
}
export interface ParticipantData {
  _id: string
  name: string;
  email: string;
  teamName:string;
}
export interface ArbiterData {
  _id: string
  name: string;
  email: string;
  teamName:string;
}

interface IScore {
  participantId: string; 
  score: number; 
}
interface Match {
  _id: string;
  participants: ParticipantData[];
  arbiter: ArbiterData;
  teamName: string[];
  round: number;
  matchDate: Date;
  tournamentId: string;
  type:string;
  status: string;
  scores: IScore[]; 
  arbiterComment: string;
}

function MatchSchedule() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tournament, setTournament] = useState<ITournament>();
  const { activeTournament } = useTournament();
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  // Input States for group tournaments
  const [groupSize, setGroupSize] = useState(1);
  const [matchesPerDay, setMatchesPerDay] = useState(3);
  const [rounds, setRounds] = useState(1);


  useEffect(() => {
    async function fetchMatches(tournamentId: string) {
      if (!tournamentId) return;

      try {
        setIsLoading(true);
        const response = await fetch(`/api/tournament/match/get?tournamentId=${tournamentId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch participants");
        }
        const data = await response.json();

        const formattedData: Match[] = data.map((match: any) => ({
          _id: match._id,
          participants: match.participants,
          arbiter: match.arbiter,
          teamName: match.teamName,
          round: match.round,
          matchDate: match.matchDate,
          tournamentId: match.tournamentId,
          player1Score: match.player1Score,
          player2Score: match.player2Score,
          arbiterComment: match.arbiterComment,
        }));
        setMatches([]);
        setMatches(formattedData);
      } catch (err) {
        console.error("Error fetching participants:", err);
        setError("Failed to load participants. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchTournament() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/tournament/get?id=${activeTournament?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch tournament details.");
        }
        const data: ITournament = await response.json();
        setTournament(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching tournament details. Please try again later.");
      } finally {
      }
    }

    if (activeTournament) {
      fetchTournament();
      if(matches.length < 1){
        fetchMatches(activeTournament.id);
      }
      else{
        setIsLoading(false);
      }
      

      // Set initial date range from the tournament data
      if (tournament?.startDate && tournament?.endDate) {
        setDateRange({
          from: new Date(tournament?.startDate),
          to: new Date(tournament?.endDate),
        });
      }
    }
  }, [activeTournament]);

  const handleSetupMatches = async () => {
    console.log("settingMatch" + activeTournament);
    if (!activeTournament) {
      setError("No active tournament found.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/tournament/match/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tournamentId: `${tournament?._id}`,
          groupSize: 1,
          matchesPerDay: matchesPerDay,
          rounds:rounds
        }),
      });

      const data = await response.json();
      console.log(data);
      if (!data.success) {
        // Handle validation errors
        if (data.error.message) {
          if(data.error.message == "MatchModel validation failed: arbiter: Path `arbiter` is required."){
            toast.error("Please make sure that you have atleast one arbiter for this tournament.");
          }
          else{
            toast.error(data.error.message.toString());
          }
          
        } else {
          toast.error(data.error.toString());
        }
      }

      const matchData: Match[] = data.matches;
      console.log("Matches" + matchData);
      setMatches(matchData);
      setError(null);
    } catch (err) {
      console.error("Error setting up matches:", err);
      setError("Failed to set up matches. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      {/* Sidebar Section */}
      <aside className="w-1/7 bg-neutral-900 border-r border-neutral-800">
        <SidebarLayoutOrganizer activeItem="Match Schedule" />
      </aside>
  
      {/* Main Content Section */}
      <div className="flex-1 p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Match Schedule</h1>
          <p className="text-muted-foreground">
            Manage tournament participants and view the tournament schedule.
          </p>
        </div>
  
        {/* Input Fields for Group Size and Matches Per Day */}
        {matches.length === 0 && !isLoading && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {tournament?.tournamentType === "combination" && (
              <div>
                <label className="block text-sm text-white mb-2">Group Size</label>
                <Input
                  type="number"
                  value={groupSize}
                  onChange={(e) => setGroupSize(Number(e.target.value))}
                  min={1}
                />
              </div>
            )}
            {(tournament?.tournamentType === "swiss" ||
              tournament?.tournamentType === "custom-scoring") && (
              <div>
                <label className="block text-sm text-white mb-2">Rounds</label>
                <Input
                  type="number"
                  value={rounds}
                  onChange={(e) => setRounds(Number(e.target.value))}
                  min={1}
                />
              </div>
            )}
            <div>
              <label className="block text-sm text-white mb-2">Matches Per Day</label>
              <Input
                type="number"
                value={matchesPerDay}
                onChange={(e) => setMatchesPerDay(Number(e.target.value))}
                min={1}
              />
            </div>
          </div>
        )}
  
        {/* Setup Matches Button */}
        {matches.length === 0 && !isLoading && (
          <div className="mb-6">
            <button
              onClick={handleSetupMatches}
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Setting up..." : "Setup Matches"}
            </button>
          </div>
        )}
  
        {/* Calendar and Matches */}
        <div className="flex gap-8">
          {/* Tournament Calendar */}
          <div className="flex-1">
            <TournamentCalendar matches={matches} />
          </div>
        </div>
      </div>
    </div>
  );
}  

export default MatchSchedule;
