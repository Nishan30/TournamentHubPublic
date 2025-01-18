'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CryptoDetailsProps {
  showTokenAddress: boolean;
  tokenAddress: string;
  walletAddress: string;
  onTokenAddressChange: (value: string) => void;
  onWalletAddressChange: (value: string) => void;
}

export const CryptoDetails = ({
  showTokenAddress,
  tokenAddress,
  walletAddress,
  onTokenAddressChange,
  onWalletAddressChange,
}: CryptoDetailsProps) => (
  <Card className="p-4">
    <div className="space-y-4">
      {showTokenAddress && (
        <div className="space-y-2">
          <Label htmlFor="tokenAddress">Token Address</Label>
          <Input
            id="tokenAddress"
            placeholder="Enter Stellar token address"
            value={tokenAddress}
            onChange={(e) => onTokenAddressChange(e.target.value)}
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="walletAddress">Wallet Address</Label>
        <Input
          id="walletAddress"
          placeholder="Enter wallet address"
          value={walletAddress}
          onChange={(e) => onWalletAddressChange(e.target.value)}
        />
      </div>
    </div>
  </Card>
);