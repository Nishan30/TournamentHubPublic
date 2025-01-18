import React from "react";
import { MatchResult } from "./MatchResult";

export interface ParticipantData {
  _id: string;
  name: string;
  email: string;
  teamName: string;
}

export interface ArbiterData {
  _id: string;
  name: string;
  email: string;
  teamName: string;
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
  status: string;
  scores: IScore[];
  arbiterComment: string;
}

interface ResultScoresTableProps {
  matches: Match[];
}

export const ResultScoresTable: React.FC<ResultScoresTableProps> = ({ matches }) => {
  // Filter and sort matches
  const completedMatches = matches
    .filter((match) => match.status === "Complete")
    .sort((a, b) => {
      if (a.round !== b.round) return b.round - a.round;
      return new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime();
    });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Match Results</h2>
      {completedMatches.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {completedMatches.map((match, index) => (
            <MatchResult key={index} match={match} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No completed matches available.</p>
      )}
    </div>
  );
};
