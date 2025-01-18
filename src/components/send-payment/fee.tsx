"use client"

import React, { ChangeEvent } from "react";
import { Button } from "../ui/button";
import { Heading } from "../Heading";
import { Input } from "../ui/input";

interface FeeProps {
  fee: string;
  memo: string;
  onClick: () => void;
  setFee: (fee: string) => void;
  setMemo: (memo: string) => void;
}

export const Fee = (props: FeeProps) => {
  const handleFeeChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setFee(event.target.value);
  };
  const handleMemoChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setMemo(event.target.value);
  };

  return (
    <>
      <Heading as="h1">
        Payment Settings
      </Heading>
      <Input
        id="input-fee"
        value={props.fee}
        onChange={handleFeeChange}
      />
      <Input
        id="input-memo"
        value={props.memo}
        onChange={handleMemoChange}
      />
      <div className="submit-row-fee">
        <Button
          onClick={props.onClick}
        >
          Next
        </Button>
      </div>
    </>
  );
};
