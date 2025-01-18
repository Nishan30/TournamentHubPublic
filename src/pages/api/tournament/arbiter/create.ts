import { NextApiRequest, NextApiResponse } from 'next';
import { saveArbriterData } from '@/services/mongoDB/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const arbiterData = req.body;
      await saveArbriterData(arbiterData);
      res.status(200).json({ message: 'Arbiter saved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving arbiter data', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
