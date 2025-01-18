import type { NextApiRequest, NextApiResponse } from 'next';
import { saveWaitlistEntry } from '@/services/mongoDB/mongodb';

interface WaitlistRequest extends NextApiRequest {
  body: {
    email: string;
    name: string;
  };
}

export default async function handler(req: WaitlistRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, name } = req.body;

    // Validate the data
    if (!email || !name) {
      return res.status(400).json({ message: 'Please provide both email and name' });
    }

    try {
      await saveWaitlistEntry(name, email);
      // Success response
      return res.status(200).json({ message: "Successfully added to the waitlist" });
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
