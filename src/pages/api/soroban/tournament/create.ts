import type { NextApiRequest, NextApiResponse } from 'next';
import { createTournament } from '@/contracts/tournament';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const details = req.body;
      const result = await createTournament(details);
      res.status(200).json({ success: true, result });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
