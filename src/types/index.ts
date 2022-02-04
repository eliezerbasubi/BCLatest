import utils from "web3-utils";
export interface ITransaction {
  blockHash: string;
  blockNumber: utils.Hex | null;
  transactionIndex: utils.Hex | null;
  nonce: utils.Hex;
  gas: number;
  gasPrice: number | string;
  value: number | string;
  to: string | null;
  from: string;
}

export interface ICurrentBlock {
  blockNumber?: number;
  numberOfTransactions?: number;
  miner?: string;
  totalDifficulty?: number;
  transactions?: ITransaction[];
}