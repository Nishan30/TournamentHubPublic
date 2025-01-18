'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CardDetails {
  name: string;
  accountNumber: string;
  bankName: string;
  swiftCode: string;
}

interface CardDetailsProps {
  details: CardDetails;
  onChange: (field: keyof CardDetails, value: string) => void; // Use CardDetails type
}

export const CardDetails = ({ details, onChange }: CardDetailsProps) => (
  <Card>
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={details.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input
          id="accountNumber"
          value={details.accountNumber}
          onChange={(e) => onChange('accountNumber', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="bankName">Bank Name</Label>
        <Input
          id="bankName"
          value={details.bankName}
          onChange={(e) => onChange('bankName', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="swiftCode">SWIFT Code</Label>
        <Input
          id="swiftCode"
          value={details.swiftCode}
          onChange={(e) => onChange('swiftCode', e.target.value)}
        />
      </div>
    </div>
  </Card>
);
