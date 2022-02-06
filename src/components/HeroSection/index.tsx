import React, { useCallback } from "react";
import VEthereum from "../../assets/vectors/VEthereum";
import VSpinner from "../../assets/vectors/VSpinner";
import { useBlockchain } from "../../contexts/blockchainProvider";
import FloatingLabelItem from "../FloatingLabelItem";
import PausableButton from "../PausableButton";
import Web3NotSupport from "../Web3NotSupport";

const HeroSection = () => {
  const {
    loading,
    network,
    currentBlock,
    isWeb3Supported,
    isRequestPaused,
    onToggleRequest,
  } = useBlockchain();

  const getHintText = useCallback(() => {
    if (isRequestPaused) {
      return "No incoming block is allowed to be displayed.";
    }
    return "Incoming block will be displayed.";
  }, [isRequestPaused]);

  return (
    <div className="flex items-center justify-between flex-wrap md:flex-nowrap gap-4 space-y-6">
      <div className="max-w-[500px] h-full">
        <h2 className="font-medium text-2xl sm:text-3xl lg:text-4xl">
          Stay connected
          <br /> with the latest block on the blockchain
        </h2>

        <ul className="my-5 list-disc ml-8">
          <li>
            Explore every detail of the currently created block on the network
          </li>
          <li className="mt-4">
            Pause and resume block requests to inspect transactions within a
            block.
          </li>
        </ul>

        <div className="mt-24">
          <PausableButton paused={isRequestPaused} onClick={onToggleRequest} />
        </div>

        <div className="mt-6 text-xs">{getHintText()}</div>
      </div>

      <div className="bg-white text-black p-8 px-4 sm:px-8 border rounded-3xl shadow-md min-w-full sm:min-w-[50%] min-h-[494px]">
        {(loading && (
          <div className="flex flex-col items-center justify-center w-full min-w-full sm:min-w-[50%] min-h-[494px]">
            <VSpinner />
          </div>
        )) ||
          null}

        {(!isWeb3Supported && <Web3NotSupport className="min-h-[494px]" />) ||
          null}

        {!loading && isWeb3Supported && (
          <>
            <div className="flex items-center justify-between flex-wrap mb-3">
              <div className="flex items-center">
                <VEthereum className="w-12 h-10 hidden" />
                <p className="text-xl font-medium truncate">{network.name}</p>
              </div>

              <div className="hidden md:flex items-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    isRequestPaused
                      ? "border-gray-400 bg-gray-200"
                      : "bg-green-500 border-green-500"
                  }`}
                />
                <p className="ml-2 text-sm font-medium text-[rgba(60,60,67,.6)]">
                  {isRequestPaused ? "Paused" : "Running"}
                </p>
              </div>
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
