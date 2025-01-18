export interface PaymentDetails {
  entryFee: string;
  paymentTypes: {
    creditCard: boolean;
    xlmToken: boolean;
    stellarToken: boolean;
  };
  stellarTokenAddress?: string;
  walletAddress?: string;
  cardDetails?: {
    name: string;
    accountNumber: string;
    bankName: string;
    swiftCode: string;
  };
}
export interface PaymentSystemProps {
  initialData?: PaymentDetails | null;
  onSubmit: (data: PaymentDetails) => void;
}