import React, { useCallback, useEffect, useState } from "react";
import { getWeb3Service } from "../helpers";

interface ICurrentAccount {
  blockNumber?: number;
  numberOfTransactions?: number;
  miner?: string;
  totalDifficulty?: number;
}

const App = () => {
  const [currentAccount, setCurrentAccount] = useState<ICurrentAccount>({});

  const getBlockchainData = useCallback(async () => {
    const web3Service = getWeb3Service();
    // const accounts = await web3Service.eth.getAccounts();
    // const account = accounts[0];
    // console.log(account);
    const latestBlock = await web3Service.eth.getBlock("latest");
    if (latestBlock) {
      const { number, transactions, miner, totalDifficulty } = latestBlock;
      setCurrentAccount({
        blockNumber: number,
        numberOfTransactions: transactions.length,
        miner,
        totalDifficulty,
      });
    }
  }, []);

  useEffect(() => {
    getBlockchainData();
  }, [getBlockchainData]);

  return (
    <div className="w-full h-full">
      <h1 className="text-blue-400">NRG LATEST INFO</h1>

      <p>Block Number: {currentAccount.blockNumber}</p>
      <p>Number of Transactions: {currentAccount.numberOfTransactions}</p>
      <p>Miner: {currentAccount.miner}</p>
      <p>Total Difficulty: {currentAccount.totalDifficulty}</p>
    </div>
  );
};

export default App;
