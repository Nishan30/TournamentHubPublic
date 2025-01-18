'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EntryFeeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const EntryFeeInput = ({ value, onChange }: EntryFeeInputProps) => (
  <div className="space-y-2">
    <Label htmlFor="entryFee">Tournament Entry Fee</Label>
    <div className="relative">
      <Input
        id="entryFee"
        type="number"
        placeholder="Enter amount"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
    </div>
  </div>
);