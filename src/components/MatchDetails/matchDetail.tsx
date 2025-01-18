import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Edit2 } from "lucide-react";

import { UrlCard } from "../UrlCard/urlCard";

export interface ParticipantData {
  _id: string;
  name: string;
  email: string;
  teamName?: string | null; // Optional for handling null values
}
export interface ArbiterData {
  _id: string;
  name: string;
  email: string;
  teamName?: string | null; // Optional for handling null values
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

interface MatchDetailsProps {
  match: Match;
  onClose: () => void;
  onEdit: () => void;
}

export function MatchDetails({ match, onClose, onEdit }: MatchDetailsProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-neutral-900 text-neutral-50 p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Match Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-6">
          {/* Main Flex Row */}
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
            {/* Participants Section */}
            <div className="flex-1">
              <h3 className="font-medium text-neutral-200">Participants</h3>
              <ul className="mt-2 space-y-2">
                {match.participants.map((participant, index) => (
                  <li
                    key={participant._id}
                    className="text-sm text-neutral-400"
                  >
                    Player {index + 1}:{" "}
                    <span className="text-neutral-200">{participant.name}</span>
                    {participant.teamName && (
                      <> (Team: <span className="text-neutral-200">{participant.teamName}</span>)</>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Match Information Section */}
            <div className="flex-1">
              <h3 className="font-medium text-neutral-200">Match Information</h3>
              <div className="mt-2 text-sm space-y-2 text-neutral-400">
                <div>
                  <span className="font-semibold text-neutral-200">Round:</span> {match.round}
                </div>
                <div>
                  <span className="font-semibold text-neutral-200">Date:</span>{" "}
                  {format(new Date(match.matchDate), "PPP")}
                </div>
                {match.status !== "Not Started" && match.scores != null && (
                  <div>
                    <span className="font-semibold text-neutral-200">Score:</span>{" "}
                    {match.scores[0].score} - {match.scores[1].score}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Arbiter Section */}
          <div>
            <h3 className="font-medium text-neutral-200">Arbiter</h3>
            <div className="mt-2 text-sm text-neutral-400">
              {match.arbiter.name}
              {match.arbiter.teamName && (
                <> (Team: <span className="text-neutral-200">{match.arbiter.teamName}</span>)</>
              )}
            </div>
          </div>

          {/* Comments Section */}
          {match.arbiterComment && (
            <div>
              <h3 className="font-medium text-neutral-200">Comments</h3>
              <div className="mt-2 text-sm text-neutral-400">
                {match.arbiterComment}
              </div>
            </div>
          )}

          {/* URL Cards Section */}
          <div>
            <UrlCard
              title="Participant Match URL"
              description="Share this URL with participants to allow them to register for the tournament."
              url={`${window.location.origin}/dashboard/participant/tournaments/exploreTournament/${match.tournamentId}`}
            />
            <UrlCard
              title="Arbiter Match URL"
              description="Share this URL to view detailed match information."
              url={`${window.location.origin}/dashboard/arbiter/tournaments/assignedMatch/${match._id}`}
            />
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex justify-end mt-6">
          <Button
            variant="green"
            className="px-4 py-2 text-sm"
            onClick={onEdit}
          >
            <Edit2 className="inline-block mr-2 h-4 w-4" />
            Edit Match
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
