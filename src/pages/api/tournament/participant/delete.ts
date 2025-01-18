import { NextApiRequest, NextApiResponse } from 'next';
import { deleteParticipantData } from '@/services/mongoDB/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { participantId } = req.body;
    if (!participantId) {
      return res.status(400).json({ error: 'Participant ID is required' });
    }

    await deleteParticipantData(participantId);
    return res.status(200).json({ message: 'Participant deleted successfully' });
  } catch (error) {
    console.error('Error deleting participant:', error);
    return res.status(500).json({ error: 'Failed to delete participant' });
  }
}
