import { NextApiRequest, NextApiResponse } from 'next';
import { deleteTournament } from '@/services/mongoDB/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Tournament ID is required and must be a string' });
    }

    await deleteTournament(id);
    return res.status(200).json({ message: `Tournament with ID ${id} deleted successfully` });
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Failed to delete tournament',
      details: error.message,
    });
  }
}
