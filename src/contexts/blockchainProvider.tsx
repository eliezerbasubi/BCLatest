import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getWeb3Service } from "../helpers";
import { ICurrentBlock } from "../types";

type IContext = {
  currentBlock: ICurrentBlock;
  loading?: boolean;
};

const defaultCtxProps: IContext = {
  currentBlock: {},
  loading: false,
};

const BlockchainContext = createContext<IContext>(defaultCtxProps);

export const useBlockchain = () => useContext(BlockchainContext);

const BlockchainProvider: FC = ({ children }): JSX.Element => {
  const [currentBlock, setCurrentBlock] = useState<ICurrentBlock>({});
  const [loading, setLoading] = useState(false);

  const getBlockchainData = useCallback(async () => {
    const web3Service = getWeb3Service();

    setLoading(true);

    const latestBlock = await web3Service.eth.getBlock("latest");

    setLoading(false);

    if (latestBlock) {
      const { number, transactions, miner, totalDifficulty } = latestBlock;

      setCurrentBlock({
        blockNumber: number,
        numberOfTransactions: transactions.length,
        miner,
        totalDifficulty,
        transactions,
      });
    }
  }, []);

  useEffect(() => {
    getBlockchainData();
  }, [getBlockchainData]);

  return (
    <BlockchainContext.Provider value={{ currentBlock, loading }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainProvider;
