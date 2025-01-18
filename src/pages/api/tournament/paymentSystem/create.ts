import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from "@/lib/mongodb";
import paymentSettingModel from '@/models/paymentSettingModel';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Connect to the database
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const { tournamentId, entryFee, paymentTypes, stellarTokenAddress, walletAddress, cardDetails } = req.body;
      console.log(req.body);

      // Check if payment settings already exist for the given tournamentId
      const existingPaymentSettings = await paymentSettingModel.findOne({ tournamentId });

      if (existingPaymentSettings) {
        // Update the existing document
        existingPaymentSettings.entryFee = entryFee;
        existingPaymentSettings.paymentTypes = paymentTypes;
        existingPaymentSettings.stellarTokenAddress = stellarTokenAddress;
        existingPaymentSettings.walletAddress = walletAddress;
        existingPaymentSettings.cardDetails = cardDetails;
        existingPaymentSettings.updatedAt = new Date();

        await existingPaymentSettings.save();
        return res.status(200).json({ message: 'Payment settings updated successfully' });
      }

      // If payment settings don't exist, create a new document
      const paymentSettings = new paymentSettingModel({
        tournamentId,
        entryFee,
        paymentTypes,
        stellarTokenAddress,
        walletAddress,
        cardDetails,
      });

      await paymentSettings.save();
      return res.status(201).json({ message: 'Payment settings saved successfully' });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error saving/updating payment settings' });
    }
  } else {
    // If the request method is not POST, return a method not allowed error
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
