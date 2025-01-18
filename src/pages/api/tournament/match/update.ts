import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongodb";
import MatchModel from "@/models/matchesModel";
import ParticipantData from "@/models/participantDataModel";

export default async function updateMatch(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await connectToDatabase();

  try {
    const { matchId, updateData } = req.body;

    if (!matchId || !updateData) {
      return res.status(400).json({ error: "Match ID and update data are required" });
    }

    // Fetch the current match
    const match = await MatchModel.findById(matchId);

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    // Update the current match with the provided data
    const updatedMatch = await MatchModel.findByIdAndUpdate(
      matchId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedMatch) {
      return res.status(404).json({ error: "Failed to update match" });
    }

    // Determine winner if match type is "single-elimination" and status is "completed"
    if (match.type === "single-elimination" && updatedMatch.status === "Complete") {
      const { scores, participants, nextMatchId } = updatedMatch;

      if (!scores || scores.length !== participants.length) {
        return res.status(400).json({
          error: "Scores data is incomplete or does not match participants.",
        });
      }

      // Find the participant with the highest score
      let maxScore = -Infinity;
      let winnerParticipantId = null;

      for(let i = 0; i < scores.length; i++ ){
        if(scores[i].score > maxScore){
          winnerParticipantId = scores[i].participantId;
          maxScore = scores[i].score;
        }
      }

      if (!winnerParticipantId) {
        return res.status(400).json({ error: "Unable to determine the winner." });
      }

      // Update the next match with the winner
      if (nextMatchId) {
        const nextMatch = await MatchModel.findById(nextMatchId);

        if (!nextMatch) {
          return res.status(404).json({
            error: `Next match with ID ${nextMatchId} not found.`,
          });
        }
        const participant = await ParticipantData.findById(winnerParticipantId);

        const updatedNextMatch = await MatchModel.findByIdAndUpdate(
          nextMatchId,
          {
            $push: { participants: participant },
          },
          { new: true }
        );

        if (!updatedNextMatch) {
          return res.status(500).json({
            error: "Failed to update the next match with the winner participant.",
          });
        }
      }
    }

    res.status(200).json({ success: true, updatedMatch });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to update match", details: error });
  }
}
