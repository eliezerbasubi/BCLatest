import React from "react";
import VEthereum from "../../assets/vectors/VEthereum";
import VSpinner from "../../assets/vectors/VSpinner";
import { useBlockchain } from "../../contexts/blockchainProvider";
import FloatingLabelItem from "../FloatingLabelItem";
import PausableButton from "../PausableButton";
import Web3NotSupport from "../Web3NotSupport";

const HeroSection = () => {
  const {
    currentBlock,
    loading,
    isWeb3Supported,
    isRequestPaused,
    onToggleRequest,
  } = useBlockchain();

  return (
    <div className="flex items-center justify-between flex-wrap md:flex-nowrap gap-4 space-y-6">
      <div className="max-w-[500px]">
        <h2 className="font-medium text-2xl sm:text-3xl lg:text-4xl">
          Stay connected
          <br /> with the latest block in the blockchain
        </h2>

        <p className="mt-4">
          Explore every little detail about the blockchain network you are
          interested in.
        </p>

        <div className="mt-24">
          <PausableButton paused={isRequestPaused} onClick={onToggleRequest} />
        </div>
      </div>

      <div className="bg-white text-black p-8 border rounded-3xl shadow-md min-w-[250px] sm:min-w-[450px] min-h-[494px]">
        {(loading && (
          <div className="flex flex-col items-center justify-center w-full min-w-[250px] sm:min-w-[450px] min-h-[494px]">
            <VSpinner />
          </div>
        )) ||
          null}

        {(!isWeb3Supported && <Web3NotSupport className="min-h-[494px]" />) ||
          null}

        {!loading && isWeb3Supported && (
          <>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <VEthereum className="w-12 h-10" />
                <p className="text-2xl font-medium">Ethereum</p>
              </div>

              <p className="text-sm font-medium text-[rgba(60,60,67,.6)]">
                Blockchain
              </p>
            </div>
            <FloatingLabelItem
              label="Block Number"
              item={currentBlock.blockNumber}
            />
            <div className="flex justify-end">
              <a
                href="#transactions"
                className="text-xs text-blue-500 font-medium mb-1"
              >
                View all ({currentBlock.numberOfTransactions}) transactions
              </a>
            </div>
            <FloatingLabelItem
              label="Number of Transactions"
              item={currentBlock.numberOfTransactions}
            />
            <FloatingLabelItem label="Miner" item={currentBlock.miner} />
            <FloatingLabelItem
              label="Total Difficulty"
              item={currentBlock.totalDifficulty}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
