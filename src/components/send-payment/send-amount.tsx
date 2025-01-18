"use client"

import React, { ChangeEvent } from "react";
import BigNumber from "bignumber.js";
import { Button } from "../ui/button";
import { Heading } from "../Heading";
import { Input } from "../ui/input";
import { formatTokenAmount } from "../../helpers/format";

interface SendAmountProps {
  amount: string;
  decimals: number;
  balance: string;
  onClick: () => void;
  setAmount: (amount: string) => void;
  tokenSymbol: string;
}

export const SendAmount = (props: SendAmountProps) => {
  // User needs to have enough tokens to transfer the amount they have provided
  const canFulfillPayment = new BigNumber(props.amount).isLessThanOrEqualTo(
    new BigNumber(props.balance),
  );
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setAmount(event.target.value);
  };

  return (
    <>
      <Heading as="h1">
        Available Balance
      </Heading>
      <Heading as="h2">
        {formatTokenAmount(new BigNumber(props.balance), props.decimals)}{" "}
        {props.tokenSymbol}
      </Heading>
      <Input
        id="input-amount"
        value={props.amount}
        onChange={handleChange}
      />
      <div className="submit-row-send">
        <Button
          onClick={props.onClick}
          disabled={props.amount.length < 1 || !canFulfillPayment}
        >
          Next
        </Button>
      </div>
    </>
  );
};
