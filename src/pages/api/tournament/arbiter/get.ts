import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from "@/lib/mongodb";
import ArbriterData from '@/models/arbriterDataModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase();
      const tournamentId = req.query.tournamentId as string;
      if (!tournamentId) {
        return res.status(400).json({ message: 'Tournament is required' });
      }
      const participations = await ArbriterData.find({ tournamentId }).exec();
      res.status(200).json(participations);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
