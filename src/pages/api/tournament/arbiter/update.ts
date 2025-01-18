import { NextApiRequest, NextApiResponse } from 'next';
import { updateArbriterData } from '@/services/mongoDB/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { arbriterId, updatedData } = req.body;
      if (!arbriterId || !updatedData) {
        return res.status(400).json({ message: 'Arbiter ID and updated data are required' });
      }
      await updateArbriterData(arbriterId, updatedData);
      res.status(200).json({ message: 'Arbiter updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating arbiter data', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
