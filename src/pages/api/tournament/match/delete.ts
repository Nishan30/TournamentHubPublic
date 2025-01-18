import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongodb';
import MatchModel from '@/models/matchesModel';

export default async function deleteMatch(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await connectToDatabase();

  try {
    const { matchId } = req.body; // Match ID to identify the match

    if (!matchId) {
      return res.status(400).json({ error: 'Match ID is required' });
    }

    const deletedMatch = await MatchModel.findByIdAndDelete(matchId);

    if (!deletedMatch) {
      return res.status(404).json({ error: 'Match not found' });
    }

    res.status(200).json({ success: true, message: 'Match deleted successfully', deletedMatch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete match', details: error });
  }
}
