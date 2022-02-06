import React from "react";
import VSpinner from "../../assets/vectors/VSpinner";
import { useBlockchain } from "../../contexts/blockchainProvider";
import TransactionTable from "./TransactionTable";

const Transactions = () => {
  const { currentBlock, network, loading, isWeb3Supported } = useBlockchain();

  if (!isWeb3Supported || !currentBlock.transactions?.length) return null;

  return (
    <div id="transactions" className="bg-[#E5E5E5] px-4">
      <div className="min-h-screen w-full max-w-[1420px] mx-auto py-12">
        <h3 className="text-center uppercase text-xl md:text-2xl lg:text-3xl font-extrabold">
          Transactions - #{currentBlock.blockNumber}
        </h3>

        <div className="py-4 w-full flex justify-center md:mt-8">
          {(loading && <VSpinner />) || null}
          {!loading && (
            <TransactionTable
              data={currentBlock.transactions}
              network={network}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
