import { INetwork } from "../../types";

export const SupportedChains: Record<string, INetwork> = {
  nrg: {
    name: "Energi Mainnet",
    symbol: "NRG",
    currency: "NRG",
    chainID: 39797,
    explorerURL: "https://explorer.energi.network/",
    newRPCUrl: "https://nodeapi.energi.network/v1/jsonrpc",
  },
  eth: {
    name: "Ethereum",
    symbol: "ETH",
    currency: "ETH",
    chainID: 1,
    explorerURL: "https://etherscan.io/",
    newRPCUrl: "ws://localhost:8545",
  },
  bsc: {
    name: "Binance Smart Chain",
    symbol: "BSC",
    currency: "BNB",
    chainID: 97,
    mainNetId: 1,
    explorerURL: "https://testnet.bscscan.com/",
    newRPCUrl: "https://bsc-dataseed.binance.org/",
  },
};

export const DEFAULT_NETWORK = SupportedChains.nrg;
export const TIMER_DURATION = 5000;
