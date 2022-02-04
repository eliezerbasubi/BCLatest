import Web3 from "web3";

export const getWeb3Service = () => {
  const web3 = new Web3(
    Web3.givenProvider ||
      "https://nodeapi.energi.network/v1/jsonrpc" ||
      "ws://localhost:8545"
  );

  return web3;
};
