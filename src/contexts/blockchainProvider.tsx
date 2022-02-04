import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getWeb3Service } from "../helpers";
import { ICurrentBlock, ITransaction } from "../types";

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
  const [isWeb3Supported, setIsWeb3Supported] = useState(true);
  const [loading, setLoading] = useState(true);

  const getTransactions = async (transactions: string[]) => {
    const web3 = getWeb3Service();
    const txns = await transactions.map(async (tx: string) => {
      // @ts-nocheck
      // @ts-ignore
      const transaction = await web3.getBigGasLimitTransaction(tx);
      return transaction;
    });

    const blockTransactions = await Promise.all(txns).then((txs) => {
      return txs
        .sort((a, b) => +b.value - +a.value)
        .map((transaction) => {
          transaction.value = web3.utils.fromWei(transaction.value, "ether");
          return transaction;
        });
    });

    return blockTransactions as ITransaction[];
  };

  const getBlockchainData = useCallback(async () => {
    const web3Service = getWeb3Service();

    const latestBlock = await web3Service.eth.getBlock("latest").catch(() => {
      setIsWeb3Supported(false);
    });

    if (latestBlock?.number === currentBlock.blockNumber) {
      return;
    }

    if (latestBlock) {
      const { number, transactions, miner, totalDifficulty } = latestBlock;

      const blockTransactions = await getTransactions(transactions);

      setCurrentBlock((block) => ({
        ...block,
        blockNumber: number,
        numberOfTransactions: transactions.length,
        miner,
        totalDifficulty,
        transactions: blockTransactions,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(!currentBlock.miner && !currentBlock.blockNumber);
  }, [currentBlock]);

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
    <BlockchainContext.Provider
      value={{ currentBlock, loading, isWeb3Supported }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainProvider;
