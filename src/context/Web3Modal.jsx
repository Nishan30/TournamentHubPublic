"use client";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

const projectId = "876146f452dafb09775123555c4029a9";

const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const metadata = {
  name: "Sewa",
  description: "Save by Giving",
  url: "https://sewafunds.com",
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
  enableAnalytics: true, 
});

export function Web3ModalProvider({ children }) {
  createWeb3Modal
  return children;
}
