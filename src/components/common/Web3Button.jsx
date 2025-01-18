import React from "react";
import { Button } from "../ui/button";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";

function Web3Button({ title, ...otherProps }) {
  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  return (
    <Button
      onClick={() => {
        open();
      }}
    >    
    </Button>
  );
}

export default Web3Button;
