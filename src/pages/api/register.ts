import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongodb';
import userModel from '@/models/userModel';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  await connectToDatabase();

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({ email, password: hashedPassword });

  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
}
