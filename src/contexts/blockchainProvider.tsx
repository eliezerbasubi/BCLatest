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

  const getTransactions = async (transactions: string[]) => {
    const txns = await transactions.map(async (tx: string) => {
      const transaction = await getWeb3Service().eth.getTransaction(tx);
      return transaction;
    });

    const blockTransactions = await Promise.all(txns).then((txs) => {
      return txs
        .sort((a, b) => +b.value - +a.value)
        .map((transaction) => {
          transaction.value = getWeb3Service().utils.fromWei(
            transaction.value,
            "ether"
          );
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

      try {
        const blockTransactions = await getTransactions(transactions);

        setCurrentBlock((block) => ({
          ...block,
          transactions: blockTransactions,
        }));
      } catch (error) {
        console.log(error);
      }

      setCurrentBlock((block) => ({
        ...block,
        blockNumber: number,
        numberOfTransactions: transactions.length,
        miner,
        totalDifficulty,
      }));
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