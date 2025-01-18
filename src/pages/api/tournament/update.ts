import { NextApiRequest, NextApiResponse } from 'next';
import { updateTournament } from '@/services/mongoDB/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { id, ...updatedData } = req.body;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Tournament ID is required and must be a string' });
    }

    await updateTournament(id, updatedData);

    return res.status(200).json({
      message: `Tournament with ID ${id} updated successfully`,
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Failed to update tournament',
      details: error.message,
    });
  }
}
