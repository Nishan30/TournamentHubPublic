import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from "@/lib/mongodb";
import MatchModel from '@/models/matchesModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  const { tournamentId, matchId } = req.query;

  if (!tournamentId && !matchId) {
    return res.status(400).json({ error: 'No query parameter provided' });
  }

  try {
    let matches;

    if (matchId) {
      matches = await MatchModel.findById(matchId).populate('participants');
      if (!matches) {
        return res.status(404).json({ error: 'Match not found' });
      }
    } else if (tournamentId) {
      matches = await MatchModel.find({ tournamentId }).populate('participants');
    } else {
      return res.status(400).json({ error: 'Invalid query parameter' });
    }

    res.status(200).json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Error fetching matches' });
  }
}
