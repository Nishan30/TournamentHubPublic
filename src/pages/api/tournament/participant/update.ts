import { NextApiRequest, NextApiResponse } from 'next';
import { updateParticipantData } from '@/services/mongoDB/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { participantId, ...updatedParticipantData } = req.body;
    if (!participantId) {
      return res.status(400).json({ error: 'Participant ID is required' });
    }

    await updateParticipantData(participantId, updatedParticipantData);
    return res.status(200).json({ message: 'Participant updated successfully' });
  } catch (error) {
    console.error('Error updating participant:', error);
    return res.status(500).json({ error: 'Failed to update participant' });
  }
}
