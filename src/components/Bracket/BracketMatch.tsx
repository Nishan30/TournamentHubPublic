import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type Match, type ParticipantData } from "@/types/tournament";

interface BracketMatchProps {
  match: Match;
  isLastRound: boolean;
}

const getWinner = (match: Match): ParticipantData | null => {
  if (match.status !== "Complete") return null;

  const sortedScores = [...match.scores].sort((a, b) => b.score - a.score);
  if (sortedScores.length === 0) return null;

  const winner = match.participants.find((p) => p._id === sortedScores[0].participantId);
  return winner || null;
};

export const BracketMatch: React.FC<BracketMatchProps> = ({
  match,
  isLastRound,
}) => {
  const winner = getWinner(match);

  const participants =
    match.participants.length === 2
      ? match.participants
      : match.participants.length === 1
      ? [
          match.participants[0],
          { _id: "placeholder2", name: "TBD" },
        ]
      : [
          { _id: "placeholder1", name: "TBD" },
          { _id: "placeholder2", name: "TBD" },
        ];

  return (
    <Card
      className={cn(
        "p-4 w-64 bg-card border-2 transition-all duration-200",
        match.status === "Complete" 
          ? "border-green-500/20 shadow-lg shadow-green-500/10" 
          : "border-border hover:border-primary/50"
      )}
    >
      {participants.map((participant, index) => (
        <div
          key={participant._id}
          className={cn(
            "p-2 rounded transition-colors",
            winner?._id === participant._id 
              ? "bg-green-500/10" 
              : "bg-muted/20 hover:bg-muted/30",
            index === 0 ? "mb-2" : ""
          )}
        >
          <p className="text-sm font-medium flex items-center justify-between">
            <span>{participant.name}</span>
            {winner?._id === participant._id && (
              <span className="text-green-500">👑</span>
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            Score: {match.scores.find((s) => s.participantId === participant._id)?.score || 0}
          </p>
        </div>
      ))}
    </Card>
  );
};