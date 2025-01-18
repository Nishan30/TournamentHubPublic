// import React from "react";
// import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

// export interface ParticipantData {
//     _id: string
//     name: string;
//     email: string;
//     teamName:string;
//   }
//   export interface ArbiterData {
//     _id: string
//     name: string;
//     email: string;
//     teamName:string;
//   }
  
//   interface IScore {
//     participantId: string; 
//     score: number; 
//   }
//   interface Match {
//     _id: string;
//     participants: ParticipantData[];
//     arbiter: ArbiterData;
//     teamName: string[];
//     round: number;
//     matchDate: Date;
//     tournamentId: string;
//     status: string;
//     scores: IScore[]; 
//     arbiterComment: string;
//   }

// interface StandingsTableProps {
//   matches: Match[];
// }

// const StandingsTable: React.FC<StandingsTableProps> = ({ matches }) => {
//   const calculateStandings = () => {
//     const scoresMap: Record<string, number> = {};

//     matches.forEach((match) => {
//       match.scores.forEach(({ participantId, score }) => {
//         scoresMap[participantId] = (scoresMap[participantId] || 0) + score;
//       });
//     });

//     return Object.entries(scoresMap).map(([participantId, score]) => ({
//       participantId,
//       totalScore: score,
//     }));
//   };

//   const standings = calculateStandings();

//   return (
//     <div className="bg-neutral-900 p-6 rounded shadow-lg">
//       <h2 className="text-xl font-bold text-white mb-4">Tournament Standings</h2>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Participant ID</TableCell>
//             <TableCell>Total Score</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {standings.map(({ participantId, totalScore }) => (
//             <TableRow key={participantId}>
//               <TableCell>{participantId}</TableCell>
//               <TableCell>{totalScore}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default StandingsTable;
