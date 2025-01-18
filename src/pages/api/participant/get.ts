import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from "@/lib/mongodb";
import ParticipantData from '@/models/participantDataModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase();
      const email = req.query.email as string;
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
      const participations = await ParticipantData.find({ email }).exec();
      res.status(200).json(participations);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
