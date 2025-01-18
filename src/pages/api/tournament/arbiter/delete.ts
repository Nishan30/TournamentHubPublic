import { NextApiRequest, NextApiResponse } from 'next';
import { deleteArbriterData } from '@/services/mongoDB/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const { arbriterId } = req.body;
      if (!arbriterId) {
        return res.status(400).json({ message: 'Arbiter ID is required' });
      }
      await deleteArbriterData(arbriterId);
      res.status(200).json({ message: 'Arbiter deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting arbiter data', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
