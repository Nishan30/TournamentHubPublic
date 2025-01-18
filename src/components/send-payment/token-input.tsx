"use client"

import React, { ChangeEvent } from "react";
import { Button } from "../ui/button";
import { Heading } from "../Heading";
import { Input } from "../ui/input";

interface TokenInputProps {
  onClick: (value: string) => void;
}

export const TokenInput = (props: TokenInputProps) => {
  const [value, setValue] = React.useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const onClick = () => {
    props.onClick(value);
  };
  return (
    <>
      <Heading as="h1">
        Choose Token To Send
      </Heading>
      <Input
        id="input-token-id"
        value={value}
        onChange={handleChange}
      />
      <div className="submit-row">
        <Button
          onClick={onClick}
          disabled={value.length < 1}
        >
          Next
        </Button>
      </div>
    </>
  );
};
