'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { EntryFeeInput } from './EntryFeeInput';
import { PaymentTypeSelector } from './PaymentTypeSelector';
import { CryptoDetails } from './CryptoDetails';
import { CardDetails } from './CardDetails';
import type { PaymentSystemProps } from './types';

export const PaymentSystem = ({ initialData, onSubmit }: PaymentSystemProps) => {
  const [entryFee, setEntryFee] = useState('');
  const [selectedPaymentTypes, setSelectedPaymentTypes] = useState({
    creditCard: false,
    xlmToken: false,
    stellarToken: false,
  });
  const [stellarTokenAddress, setStellarTokenAddress] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [cardDetails, setCardDetails] = useState({
    name: '',
    accountNumber: '',
    bankName: '',
    swiftCode: '',
  });

  useEffect(() => {
    if (initialData) {
      setEntryFee(initialData.entryFee);
      setSelectedPaymentTypes(initialData.paymentTypes);
      setStellarTokenAddress(initialData.stellarTokenAddress || '');
      setWalletAddress(initialData.walletAddress || '');
      if (initialData.cardDetails) {
        setCardDetails(initialData.cardDetails);
      }
    }
  }, [initialData]);

  const handlePaymentTypeChange = (type: keyof typeof selectedPaymentTypes, checked: boolean) => {
    setSelectedPaymentTypes((prev) => ({ ...prev, [type]: checked }));
  };

  const handleCardDetailsChange = (field: keyof typeof cardDetails, value: string) => {
    setCardDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const paymentDetails = {
      entryFee,
      paymentTypes: selectedPaymentTypes,
      ...(selectedPaymentTypes.stellarToken && { stellarTokenAddress }),
      ...((selectedPaymentTypes.xlmToken || selectedPaymentTypes.stellarToken) && { walletAddress }),
      ...(selectedPaymentTypes.creditCard && { cardDetails }),
    };
    onSubmit(paymentDetails);
  };

  return (
    <div className="space-y-6 p-6 rounded-lg shadow-sm">
      <EntryFeeInput value={entryFee} onChange={setEntryFee} />
      
      <PaymentTypeSelector
        selectedTypes={selectedPaymentTypes}
        onTypeChange={handlePaymentTypeChange}
      />

      {(selectedPaymentTypes.xlmToken || selectedPaymentTypes.stellarToken) && (
        <CryptoDetails
          showTokenAddress={selectedPaymentTypes.stellarToken}
          tokenAddress={stellarTokenAddress}
          walletAddress={walletAddress}
          onTokenAddressChange={setStellarTokenAddress}
          onWalletAddressChange={setWalletAddress}
        />
      )}

      {selectedPaymentTypes.creditCard && (
        <CardDetails
          details={cardDetails}
          onChange={handleCardDetailsChange}
        />
      )}

      <Button 
      variant="green"
        onClick={handleSubmit}
        className="w-full"
        size="lg"
      >
        Save Payment Settings
      </Button>
    </div>
  );
};