import { NextApiRequest, NextApiResponse } from 'next';
import { saveTournament } from '@/services/mongoDB/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const {
      name,
      organizerName,
      email,
      description,
      rules,
      location,
      playerCount,
      tournamentType,
      hasPlayerList,
      needsArbriter,
      isIndividual,
      paymentSystem,
      startDate,
      endDate,
    } = req.body;

    if (!name || !organizerName || !email) {
      return res.status(400).json({ error: 'Name, organizerName, and email are required' });
    }

    const savedTournamentId = await saveTournament(
      name,
      organizerName,
      email,
      description || null,
      rules || null,
      location || null,
      playerCount || null,
      tournamentType || null,
      hasPlayerList ?? null,
      needsArbriter ?? null,
      isIndividual ?? null,
      paymentSystem ?? null,
      startDate ? new Date(startDate) : null,
      endDate ? new Date(endDate) : null
    );

    return res.status(201).json({
      message: 'Tournament saved successfully',
      tournamentId: savedTournamentId,
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Failed to save tournament',
      details: error.message,
    });
  }
}
