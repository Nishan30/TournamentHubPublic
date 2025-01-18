import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader
} from "@/components/ui/table";
import { StandingRow } from "./StandingRow";
import { calculateStandings } from "@/utils/standings";

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

interface StandingsTableProps {
  matches: Match[];
}

export const StandingsTable: React.FC<StandingsTableProps> = ({ matches }) => {
  const standings = calculateStandings(matches);

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Tournament Standings</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableCell className="font-medium">Pos</TableCell>
              <TableCell className="font-medium">Team</TableCell>
              <TableCell className="font-medium text-center">P</TableCell>
              <TableCell className="font-medium text-center">W</TableCell>
              <TableCell className="font-medium text-center">D</TableCell>
              <TableCell className="font-medium text-center">L</TableCell>
              <TableCell className="font-medium text-center">GF</TableCell>
              <TableCell className="font-medium text-center">GA</TableCell>
              <TableCell className="font-medium text-center">GD</TableCell>
              <TableCell className="font-medium text-center">Pts</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings.map((standing, index) => (
              <StandingRow 
                key={standing.name} 
                standing={standing} 
                position={index} 
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};