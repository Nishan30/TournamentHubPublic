import React from "react";
import {ThirdwebProvider, ConnectButton, PayEmbed,SupportedTokens } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { arbitrum, ethereum } from "thirdweb/chains";

const client = createThirdwebClient({ clientId: "bda70fe51a4c7c335f33ec3cfff510d9" });
const Home = () => {
  
  return (
    <ThirdwebProvider>
      <PayEmbed 
      client={client} 
      payOptions={{
        prefillBuy: {
          token: {
            address: "0xbEc3eef33eECD66986CF3b2C8C55531a1B67F1F2",
            name: "Stash",
            symbol: "STH",
          },
          chain: arbitrum,
          allowEdits: {
            amount: true, // allow editing buy amount
            token: false, // disable selecting buy token
            chain: false, // disable selecting buy chain
          },
        },
      }}
  />
    </ThirdwebProvider>
  );
};

export default Home;
