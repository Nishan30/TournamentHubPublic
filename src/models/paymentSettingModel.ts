import mongoose from 'mongoose';

export interface IPayment extends Document {
  tournamentId: string;
  entryFee: string;
  paymentTypes: {
    creditCard: boolean;
    xlmToken: boolean;
    stellarToken: boolean;
  };
  stellarTokenAddress?: string;
  walletAddress?: string;
  cardDetails?: {
    name?: string;
    accountNumber?: string;
    bankName?: string;
    swiftCode?: string;
  };
  name?: boolean | null;
  email?: boolean | null;
  questions?: string;
  rules?: string;
  paymentDetails?: boolean | null;
  entryFeeDetails?: boolean | null;
  individual?: boolean | null;
  phoneNumber?: boolean | null;
  formDeadline?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}
const PaymentSettingsSchema = new mongoose.Schema({
  tournamentId: {
    type: String,
    required: true,
    unique: true,
  },
  entryFee: {
    type: String,
    required: true,
  },
  paymentTypes: {
    creditCard: Boolean,
    xlmToken: Boolean,
    stellarToken: Boolean,
  },
  stellarTokenAddress: String,
  walletAddress: String,
  cardDetails: {
    name: String,
    accountNumber: String,
    bankName: String,
    swiftCode: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.PaymentSettings || mongoose.model('PaymentSettings', PaymentSettingsSchema);