import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from "@/lib/mongodb";
import tournamentModel from '@/models/tournamentModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Connect to the database
      await connectToDatabase();

      // Fetch all public tournaments
      const publicTournaments = await tournamentModel.find({ publicTournament: true }).exec();

      // Return the list of public tournaments
      return res.status(200).json(publicTournaments);
    } catch (error) {
      console.error('Error fetching public tournaments:', error); // Log error for debugging
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // Return an error if the method is not GET
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
