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
  isWeb3Supported: boolean;
};

const defaultCtxProps: IContext = {
  currentBlock: {},
  loading: false,
  isWeb3Supported: true,
};

const BlockchainContext = createContext<IContext>(defaultCtxProps);

export const useBlockchain = () => useContext(BlockchainContext);

const BlockchainProvider: FC = ({ children }): JSX.Element => {
  const [currentBlock, setCurrentBlock] = useState<ICurrentBlock>({});
  // const [loading, setLoading] = useState(false);
  const [isWeb3Supported, setIsWeb3Supported] = useState(true);

  const getBlockchainData = useCallback(async () => {
    const web3Service = getWeb3Service();

    // setLoading(true);

    const latestBlock = await web3Service.eth.getBlock("latest").catch(() => {
      setIsWeb3Supported(false);
    });

    if (latestBlock?.number === currentBlock.blockNumber) {
      return;
    }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      getBlockchainData();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BlockchainContext.Provider value={{ currentBlock, isWeb3Supported }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainProvider;
