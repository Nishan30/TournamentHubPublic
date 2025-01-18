'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CreditCard, Wallet, Coins } from 'lucide-react';

// Define a type for selectedTypes
type SelectedTypes = {
  creditCard: boolean;
  xlmToken: boolean;
  stellarToken: boolean;
};

interface PaymentTypeSelectorProps {
  selectedTypes: SelectedTypes;
  onTypeChange: (type: keyof SelectedTypes, checked: boolean) => void;
}

export const PaymentTypeSelector = ({
  selectedTypes,
  onTypeChange,
}: PaymentTypeSelectorProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Available Payment Methods</h3>
    <div className="space-y-4">
      {/* Credit/Debit Card */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="creditCard"
          checked={selectedTypes.creditCard}
          onCheckedChange={(checked) =>
            onTypeChange('creditCard', checked as boolean)
          }
        />
        <Label htmlFor="creditCard" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" /> Credit/Debit Card
        </Label>
      </div>

      {/* XLM Tokens */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="xlmToken"
          checked={selectedTypes.xlmToken}
          onCheckedChange={(checked) =>
            onTypeChange('xlmToken', checked as boolean)
          }
        />
        <Label htmlFor="xlmToken" className="flex items-center gap-2">
          <Coins className="h-4 w-4" /> XLM Tokens
        </Label>
      </div>

      {/* Custom Stellar Token */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="stellarToken"
          checked={selectedTypes.stellarToken}
          onCheckedChange={(checked) =>
            onTypeChange('stellarToken', checked as boolean)
          }
        />
        <Label htmlFor="stellarToken" className="flex items-center gap-2">
          <Wallet className="h-4 w-4" /> Custom Stellar Token
        </Label>
      </div>
    </div>
  </div>
);
