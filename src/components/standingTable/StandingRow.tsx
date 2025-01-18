import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Medal } from "lucide-react";
import type { Standing } from "@/types/tournament";

interface StandingRowProps {
  standing: Standing;
  position: number;
}

const getMedalColor = (position: number): string => {
  switch (position) {
    case 0: return "text-yellow-400";
    case 1: return "text-gray-400";
    case 2: return "text-amber-600";
    default: return "hidden";
  }
};

export const StandingRow: React.FC<StandingRowProps> = ({ standing, position }) => (
  <TableRow className="hover:bg-muted/50">
    <TableCell className="font-medium">
      <div className="flex items-center gap-2">
        {position + 1}
        <Medal className={getMedalColor(position)} size={16} />
      </div>
    </TableCell>
    <TableCell>
      <div>
        <div className="font-medium">{standing.name}</div>
        <div className="text-sm text-muted-foreground">{standing.teamName}</div>
      </div>
    </TableCell>
    <TableCell className="text-center">{standing.played}</TableCell>
    <TableCell className="text-center">{standing.won}</TableCell>
    <TableCell className="text-center">{standing.drawn}</TableCell>
    <TableCell className="text-center">{standing.lost}</TableCell>
    <TableCell className="text-center">{standing.goalsFor}</TableCell>
    <TableCell className="text-center">{standing.goalsAgainst}</TableCell>
    <TableCell className="text-center">{standing.goalDifference}</TableCell>
    <TableCell className="text-center font-bold">{standing.points}</TableCell>
  </TableRow>
);