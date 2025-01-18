import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

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
  status:string;
  scores: IScore[]; 
  arbiterComment: string;
}


interface MatchResultProps {
  match: Match;
}

export const MatchResult: React.FC<MatchResultProps> = ({ match }) => {
  const getWinner = () => {
    const scores = match.scores;
    if (scores[0].score > scores[1].score){

      if(scores[0].participantId == match.participants[0]._id){
        return 0
      }
      else{
        return 1
      }
    } 
    if (scores[0].score < scores[1].score) {
      if(scores[0].participantId == match.participants[0]._id){
        return 1
      }
      else{
        return 0
      }
    }
    return -1; // Draw
  };

  const winner = getWinner();

  return (
    <Card className="mb-6 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3">
        <div className="flex justify-between items-center text-white">
          <span className="text-sm font-medium">Round {match.round}</span>
          <span className="text-sm">
            {new Date(match.matchDate).toLocaleDateString()}
          </span>
        </div>
      </div>
      <CardContent className="pt-6">
        <div className="grid grid-cols-3 gap-4 items-center mb-4">
          <div className={`text-right ${winner === 0 ? "font-bold" : ""}`}>
            <span className="text-lg">{match.participants[0].name}</span>
            <div className="text-sm text-muted-foreground">
              {match.participants[0].teamName}
            </div>
          </div>
          <div className="text-center">
          <div className="text-2xl font-bold">
            {match.participants[0]._id === match.scores[0].participantId 
              ? match.scores[0].score 
              : match.scores[1].score}
            {' - '}
            {match.participants[1]._id === match.scores[1].participantId 
              ? match.scores[1].score 
              : match.scores[0].score}
          </div>

            <Badge 
              variant={match.status === "Complete" ? "default" : "secondary"}
              className="mt-1"
            >
              {match.status}
            </Badge>
          </div>
          <div className={`text-left ${winner === 1 ? "font-bold" : ""}`}>
            <span className="text-lg">{match.participants[1].name}</span>
            <div className="text-sm text-muted-foreground">
              {match.participants[1].teamName}
            </div>
          </div>
        </div>
        {winner !== -1 && (
          <div className="flex items-center justify-center gap-2 text-sm text-yellow-600 mb-3">
            <Trophy size={16} />
            <span>Winner: {match.participants[winner].name}</span>
          </div>
        )}
        {match.arbiterComment && (
          <div className="text-sm text-muted-foreground border-t pt-3 mt-3">
            {match.arbiterComment}
          </div>
        )}
      </CardContent>
    </Card>
  );
};