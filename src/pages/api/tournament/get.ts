import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from "@/lib/mongodb";
import tournamentModel from '@/models/tournamentModel';
import { ObjectId } from 'mongodb'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase(); // Ensure the database connection is established

      const { email, id } = req.query;
      console.log(id);
      if (id) {
        // Handle request by ID
        if (!ObjectId.isValid(id as string)) {
          return res.status(400).json({ message: 'Invalid ID format' });
        }
        const tournament = await tournamentModel.findById(id as string).exec();
        if (!tournament) {
          return res.status(404).json({ message: 'Tournament not found' });
        }
        return res.status(200).json(tournament);
      } else if (email) {
        // Handle request by email
        const tournaments = await tournamentModel.find({ email }).exec();
        return res.status(200).json(tournaments);
      } else {
        return res.status(400).json({ message: 'Email or ID is required' });
      }
    } catch (error) {
      console.error('Error fetching tournaments:', error); // Log error for debugging
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
