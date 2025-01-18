import type { NextApiRequest, NextApiResponse } from 'next';
import { getTournament, updateTournament } from '@/contracts/tournament';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const result = await getTournament(Number(id));
      res.status(200).json({ success: true, result });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  } else if (req.method === 'PATCH') {
    try {
      const updates = req.body;
      const result = await updateTournament(Number(id), updates);
      res.status(200).json({ success: true, result });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
