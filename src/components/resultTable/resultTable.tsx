// import React, { useState } from "react";
// import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// export interface ParticipantData {
//   _id: string
//   name: string;
//   email: string;
//   teamName:string;
// }
// export interface ArbiterData {
//   _id: string
//   name: string;
//   email: string;
//   teamName:string;
// }

// interface IScore {
//   participantId: string; 
//   score: number; 
// }

// interface Match {
//   _id: string;
//   participants: ParticipantData[];
//   arbiter: ArbiterData;
//   teamName: string[];
//   round: number;
//   matchDate: Date;
//   tournamentId: string;
//   status:string;
//   scores: IScore[]; 
//   arbiterComment: string;
// }

// interface ResultScoresTableProps {
//   matches: Match[];
// }

// const ResultScoresTable: React.FC<ResultScoresTableProps> = ({ matches }) => {
//   const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
//   const [scores, setScores] = useState<IScore[]>([]);
//   const [comments, setComments] = useState("");


//   return (
//     <div className="bg-neutral-900 p-6 rounded shadow-lg">
//       <h2 className="text-xl font-bold text-white mb-4">Match Results</h2>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Match ID</TableCell>
//             <TableCell>Participants</TableCell>
//             <TableCell>Scores</TableCell>
//             <TableCell>Comments</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {matches.map((match) => (
//             <TableRow key={match._id}>
//               <TableCell>{match._id}</TableCell>
//               <TableCell>
//                 {match.participants.map((p) => p.name).join(", ")}
//               </TableCell>
//               <TableCell>
//                 {match.scores.map((s) => `${s.participantId}: ${s.score}`).join(", ")}
//               </TableCell>
//               <TableCell>{match.arbiterComment}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default ResultScoresTable;
