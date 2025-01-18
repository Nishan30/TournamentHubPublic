"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarLayoutArbiter } from "@/components/common/sidebarArbiter";
import { useForm } from "react-hook-form";
import { useUser } from "@/context/UserContext";
import { fetchMatchById, updateMatch } from "@/services/tournament/match";
import toast from "react-hot-toast";
import { Controller } from "react-hook-form";

interface ParticipantData {
  _id: string;
  name: string;
  teamName?: string | null;
}

interface IScore {
  participantId: string;
  score: number;
}

interface Match {
  _id: string;
  participants: ParticipantData[];
  round: number;
  matchDate: Date;
  status: string;
  scores: IScore[];
  arbiterComment: string;
}

interface FormData {
  arbiterComment: string;
  scores: { [participantId: string]: number };
  status: string;
  arbiterSignature?: string;
}

interface PageProps {
  params: Promise<{ matchId: string }>;
}

export default function EditMatchPage({ params }: PageProps) {
  const router = useRouter();

  const [match, setMatch] = useState<Match | null>(null);
  const user = useUser();
  const { register, handleSubmit, setValue, control,watch, formState: { errors } } = useForm<FormData>();
  const [matchId, setMatchId] = useState<string>("");
  const watchStatus = watch("status"); // Watch for status changes

  useEffect(() => {
    const fetchData = async () => {
      const matchId = (await params).matchId;
      setMatchId(matchId);

      if (!user.user) {
        router.push(`/signin?accountType=Participant&id=${matchId}`);
      }
    };

    fetchData();

    const fetchMatchData = async () => {
      try {
        const fetchedMatch = await fetchMatchById(matchId);
        if (fetchedMatch) {
          setMatch(fetchedMatch);
          setValue("arbiterComment", fetchedMatch.arbiterComment);
          setValue("status", fetchedMatch.status);

          const scoresObj = fetchedMatch.scores.reduce(
            (acc, score) => ({ ...acc, [score.participantId]: score.score }),
            {}
          );
          setValue("scores", scoresObj);
        }
      } catch (error) {
        console.error("Error fetching match data:", error);
      }
    };

    if (matchId) {
      fetchMatchData();
    }
  }, [matchId, setValue, user.user, router]);

  const onSubmit = async (data: FormData) => {
    try {
      const updatedScores = Object.entries(data.scores).map(([participantId, score]) => ({
        participantId,
        score: Number(score),
      }));

      await updateMatch({
        matchId,
        updateData: { ...data, scores: updatedScores },
      });
      toast.success("Successfully updated the match.");
    } catch (error) {
      console.error("Error updating match:", error);
      toast.error("Error updating match.");
    }
  };

  if (!match) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <aside className="w-1/6 bg-neutral-900 border-r border-neutral-800">
      <SidebarLayoutArbiter activeItem="Assigned Match" />
      </aside>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-neutral-50">Round-{match.round}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h2 className="font-medium text-neutral-200">Participants</h2>
            <ul className="space-y-2 mt-2">
              {match.participants.map((participant) => (
                <li key={participant._id} className="text-neutral-400">
                  Player: <span className="text-neutral-50">{participant.name}</span>
                  {participant.teamName && (
                    <> (Team: <span className="text-neutral-50">{participant.teamName}</span>)</>
                  )}
                  <div className="mt-2">
                    <label
                      className="block text-sm text-neutral-400"
                      htmlFor={`score-${participant._id}`}
                    >
                      Score
                    </label>
                    <Input
                      type="number"
                      id={`score-${participant._id}`}
                      {...register(`scores.${participant._id}`, { required: true })}
                      className="mt-1"
                    />
                    {errors.scores?.[participant._id] && (
                      <span className="text-sm text-red-500">This field is required</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
  <h3 className="font-medium text-neutral-200">Match Status</h3>
  <Controller
    name="status"
    control={control} // Add `control` from useForm
    defaultValue={match.status} // Set initial value
    rules={{ required: true }} // Validation rules
    render={({ field }) => (
      <Select
        value={field.value}
        onValueChange={(value) => field.onChange(value)}
      >
        <SelectTrigger className="mt-1">
          <SelectValue placeholder="Select Match Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Not Started">Not Started</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Complete">Complete</SelectItem>
        </SelectContent>
      </Select>
    )}
  />
  {errors.status && <span className="text-sm text-red-500">This field is required</span>}
</div>

          {watchStatus === "Complete" && (
            <div>
              <h3 className="font-medium text-neutral-200">Arbiter Signature</h3>
              <Input
                type="text"
                {...register("arbiterSignature", { required: true })}
                className="mt-1"
                placeholder="Enter your name as signature"
              />
              {errors.arbiterSignature && (
                <span className="text-sm text-red-500">This field is required when marking as Complete</span>
              )}
            </div>
          )}

          <div>
            <h3 className="font-medium text-neutral-200">Arbiter Comment</h3>
            <Textarea
              id="arbiterComment"
              {...register("arbiterComment", { required: true })}
              className="mt-1"
            />
            {errors.arbiterComment && <span className="text-sm text-red-500">This field is required</span>}
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="mt-4">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
