import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import BigNumber from "bignumber.js";
import { getChainById, getWeb3Service } from "../helpers";
import { DEFAULT_NETWORK, TIMER_DURATION } from "../helpers/constants";
import { ICurrentBlock, INetwork, ITransaction } from "../types";

type IContext = {
  currentBlock: ICurrentBlock;
  network: INetwork;
  loading?: boolean;
  isWeb3Supported: boolean;
  isRequestPaused?: boolean;
  onToggleRequest?: () => void;
};

const defaultCtxProps: IContext = {
  currentBlock: {},
  network: DEFAULT_NETWORK,
  loading: false,
  isWeb3Supported: true,
  isRequestPaused: false,
};

const BlockchainContext = createContext<IContext>(defaultCtxProps);

export const useBlockchain = () => useContext(BlockchainContext);

const BlockchainProvider: FC = ({ children }): JSX.Element => {
  const [currentBlock, setCurrentBlock] = useState<ICurrentBlock>({});
  const [currentNetwork, setCurrentNetwork] = useState({});

  const [isWeb3Supported, setIsWeb3Supported] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isRequestPaused, setIsRequestPaused] = useState(false);

  const timer = useRef<any>();

  const clearStates = () => {
    setLoading(false);
    setIsWeb3Supported(false);
    setIsRequestPaused(true);

    clearInterval(timer.current);
  };

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
          transaction.value = new BigNumber(
            web3.utils.fromWei(transaction.value, "ether")
          ).toFixed(2);
          transaction.gasPrice = new BigNumber(
            web3.utils.fromWei(transaction.gasPrice, "ether")
          ).toFixed(2);
          return transaction;
        });
    });

    return blockTransactions as ITransaction[];
  };

  const getBlockchainData = useCallback(async () => {
    try {
      const web3Service = getWeb3Service();
      const chainId = await web3Service.eth.net.getId();

      const network = getChainById(chainId);

      if (network) {
        setCurrentNetwork(network);
      }

      const latestBlock = await web3Service.eth.getBlock("latest").catch(() => {
        clearStates();
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
    } catch (error) {
      clearStates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(!currentBlock.miner && !currentBlock.blockNumber);
  }, [currentBlock]);

  useEffect(() => {
    timer.current = setInterval(() => {
      getBlockchainData();
    }, TIMER_DURATION);

    if (isRequestPaused) {
      clearInterval(timer.current);
    }

    return () => {
      clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRequestPaused]);

  const onToggleRequest = () => {
    setIsRequestPaused(!isRequestPaused);
  };

  return (
    <BlockchainContext.Provider
      value={{
        currentBlock,
        loading,
        isWeb3Supported,
        isRequestPaused,
        network: currentNetwork as INetwork,
        onToggleRequest,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainProvider;
