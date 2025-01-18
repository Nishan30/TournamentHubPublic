import { NextApiRequest, NextApiResponse } from 'next';
import { saveParticipantData } from '@/services/mongoDB/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const newParticipantData = req.body;
    await saveParticipantData(newParticipantData);
    return res.status(201).json({ message: 'Participant saved successfully' });
  } catch (error) {
    console.error('Error saving participant:', error);
    return res.status(500).json({ error: 'Failed to save participant' });
  }
}
