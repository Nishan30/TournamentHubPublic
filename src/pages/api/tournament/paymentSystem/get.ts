import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from "@/lib/mongodb";
import paymentSettingModel from '@/models/paymentSettingModel';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Connect to the database
  await connectToDatabase();

  const { tournamentId } = req.query;

  if (req.method === 'GET') {
    try {
      const paymentSettings = await paymentSettingModel.findOne({ tournamentId });

      if (!paymentSettings) {
        return res.status(404).json({ error: 'Payment settings not found' });
      }

      return res.status(200).json(paymentSettings);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error fetching payment settings' });
    }
  } else {
    // If the request method is not GET, return a method not allowed error
    return res.status(405).json({ error: 'Method not allowed' });
  }
}