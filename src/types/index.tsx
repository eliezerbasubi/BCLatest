export interface ICurrentBlock {
  blockNumber?: number;
  numberOfTransactions?: number;
  miner?: string;
  totalDifficulty?: number;
  transactions?: string[];
}
