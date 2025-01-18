"use client"

import { Button } from "../ui/button";// Assuming your custom Button is styled with ShadCN
import { Heading } from "../Heading";  // Assuming Heading is custom styled with ShadCN
import { Select,SelectTrigger,SelectGroup,SelectItem, SelectContent, SelectValue } from "../ui/select";

interface ConnectWalletProps {
  selectedNetwork: string;
  pubKey: string | null;
  onClick: () => void;
}

export const ConnectWallet = (props: ConnectWalletProps) => {
  const text = props.pubKey ? "Next" : "Connect Freighter";

  return (
    <div className="space-y-6 p-6">
      <Heading as="h1" className="text-2xl font-bold text-center">
        Send a Soroban Payment
      </Heading>

      <div className="space-y-2">
        <label htmlFor="network" className="block text-sm font-medium text-gray-700">
          Network
        </label>
        <Select
        value={props.selectedNetwork}
      >
        <SelectTrigger className="mt-1">
          <SelectValue placeholder="Select Match Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="TESTNET">TESTNET</SelectItem>
          <SelectItem value="MAINMET">MAINNET</SelectItem>
        </SelectContent>
      </Select>
      </div>

      <div className="flex justify-center mt-6">
        <Button
          onClick={props.onClick}
        >
          {text}
        </Button>
      </div>
    </div>
  );
};
