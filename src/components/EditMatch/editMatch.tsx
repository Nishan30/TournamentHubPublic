"use client"

import { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { IParticipantData } from "@/models/participantDataModel";
import { IArbriterData } from "@/models/arbriterDataModel";

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

interface EditMatchDialogProps {
  match: Match;
  onClose: () => void;
  onSave: (updatedMatch: Match) => void;
}

export function EditMatchDialog({ match, onClose, onSave }: EditMatchDialogProps) {
  const [updatedMatch, setUpdatedMatch] = useState<Match>(match);
  const [participants, setParticipants] = useState<ParticipantData[]>([]);
  const [arbiters, setArbiters] = useState<ArbiterData[]>([]);

  // Fetch participants and arbiters using tournamentId
  useEffect(() => {
    async function fetchData() {
      try {
        const participantsResponse = await fetch(
          `/api/tournament/participant/get?tournamentId=${match.tournamentId}`
        );
        const arbitersResponse = await fetch(
          `/api/tournament/arbiter/get?tournamentId=${match.tournamentId}`
        );

        if (participantsResponse.ok) {
          const participantsData = await participantsResponse.json();
          console.log(participantsData);
          setParticipants(participantsData);
        }

        if (arbitersResponse.ok) {
          const arbitersData = await arbitersResponse.json();
          setArbiters(arbitersData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [match.tournamentId]);

  const handleSave = () => {
    onSave(updatedMatch);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-neutral-900 p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Match</h2>

        {/* Arbiter Comment */}
        <div className="mb-4">
          <label className="block text-sm text-white mb-2">Arbiter Comment</label>
          <Input
            type="text"
            value={updatedMatch.arbiterComment}
            onChange={(e) =>
              setUpdatedMatch({ ...updatedMatch, arbiterComment: e.target.value })
            }
          />
        </div>

        {/* Match Date */}
        <div className="mb-4">
          <label className="block text-sm text-white mb-2">Match Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !updatedMatch.matchDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {updatedMatch.matchDate
                  ? format(updatedMatch.matchDate, "PPP")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={updatedMatch.matchDate}
                onSelect={(date) =>
                  setUpdatedMatch({
                    ...updatedMatch,
                    matchDate: date || updatedMatch.matchDate,
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Round */}
        <div className="mb-4">
          <label className="block text-sm text-white mb-2">Round</label>
          <Input
            type="number"
            value={updatedMatch.round}
            onChange={(e) =>
              setUpdatedMatch({ ...updatedMatch, round: Number(e.target.value) })
            }
          />
        </div>

        {/* Team Names */}
        <div className="mb-4">
          <label className="block text-sm text-white mb-2">Team 1 Name</label>
          <Input
            type="text"
            value={updatedMatch.teamName[0] || ""}
            onChange={(e) =>
              setUpdatedMatch({
                ...updatedMatch,
                teamName: [e.target.value, updatedMatch.teamName[1] || ""],
              })
            }
            placeholder="Enter team 1 name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-white mb-2">Team 2 Name</label>
          <Input
            type="text"
            value={updatedMatch.teamName[1] || ""}
            onChange={(e) =>
              setUpdatedMatch({
                ...updatedMatch,
                teamName: [updatedMatch.teamName[0] || "", e.target.value],
              })
            }
            placeholder="Enter team 2 name"
          />
        </div>


        {/* Participants Team 1 */}
        <div className="mb-4">
          <label className="block text-sm text-white mb-2">Team 1 Participant</label>
          <Select
          value={updatedMatch.participants[0]?._id || ""}
          onValueChange={(value) => {
            const selectedParticipant = participants.find((p) => p._id === value);
            if (selectedParticipant) {
              setUpdatedMatch((prev) => ({
                ...prev,
                participants: [selectedParticipant, prev.participants[1]],
              }));
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue>
              {updatedMatch.participants[0]?.name || "Select Participant"}
              </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {participants.map((p) => (
              <SelectItem key={p._id} value={p._id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        </div>

        {/* Participants Team 2 */}
        <div className="mb-4">
          <label className="block text-sm text-white mb-2">Team 2 Participant</label>
          <Select
            value={updatedMatch.participants[1]?._id || ""}
            onValueChange={(value) => {
              console.log("Value received in onValueChange:", value);
              const selectedParticipant = participants.find((p) => p._id === value);
              if (selectedParticipant) {
                setUpdatedMatch((prev) => ({
                  ...prev,
                  participants: [prev.participants[0], selectedParticipant],
                }));
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={updatedMatch.participants[1]?.name || "Select Participant"} />
            </SelectTrigger>
            <SelectContent>
              {participants.map((p) => (
                <SelectItem key={p._id} value={p._id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Arbiter */}
        <div className="mb-4">
          <label className="block text-sm text-white mb-2">Arbiter</label>
          <Select
            value={updatedMatch.arbiter?._id || ""}
            onValueChange={(value) => {
              const selectedArbiter = arbiters.find((a) => a._id === value);
              if (selectedArbiter) {
                setUpdatedMatch((prev) => ({
                  ...prev,
                  arbiter: selectedArbiter,
                }));
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={updatedMatch.arbiter?.name || "Select Arbiter"} />
            </SelectTrigger>
            <SelectContent>
              {arbiters.map((a) => (
                <SelectItem key={a._id} value={a._id}>
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> 

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="green" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
