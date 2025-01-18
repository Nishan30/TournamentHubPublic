"use client"

import React, { ChangeEvent } from "react";
import { Button } from "../ui/button";
import { Heading } from "../Heading";
import { Input } from "../ui/input";

interface PaymentDestProps {
  destination: string;
  setDestination: (address: string) => void;
  onClick: () => void;
}

export const PaymentDest = (props: PaymentDestProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setDestination(event.target.value);
  };

  return (
    <>
      <Heading as="h1">
        Choose a Payment Destination
      </Heading>
      <Input
        id="input-destination"
        value={props.destination}
        onChange={handleChange}
      />
      <div className="submit-row-destination">
        <Button
          onClick={props.onClick}
          disabled={props.destination.length < 1}
        >
          Next
        </Button>
      </div>
    </>
  );
};
