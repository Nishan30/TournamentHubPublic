function shortEthAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function getNetworkName(chainId) {
  // Add more networks as needed
  const networkMap = {
    1: "Ethereum",
    3: "Ropsten",
    4: "Rinkeby",
    5: "Goerli",
    42: "Kovan",
  };
  return networkMap[chainId] || "Unknown Network";
}

export { shortEthAddress, getNetworkName };
