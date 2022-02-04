import React from "react";
import VSpinner from "../../assets/vectors/VSpinner";
import { useBlockchain } from "../../contexts/blockchainProvider";

const Transactions = () => {
  const { currentBlock, loading, isWeb3Supported } = useBlockchain();

  if (!isWeb3Supported || !currentBlock.transactions?.length) return null;

  return (
    <div id="transactions" className="bg-[#E5E5E5] px-4">
      <div className="min-h-screen w-full max-w-[1420px] mx-auto py-12">
        <h3 className="text-center uppercase text-xl md:text-2xl lg:text-3xl font-extrabold">
          Transactions - #{currentBlock.blockNumber}
        </h3>

        <div className="container mx-auto">
          <div className="py-4 w-full flex justify-center mt-8">
            {(loading && <VSpinner />) || null}
            {!loading && (
              <div className="flex justify-center bg-white border rounded-2xl p-8 w-full overflow-x-auto">
                <table className="table-auto border-0">
                  <thead>
                    <tr>
                      <th className="py-3">Transaction Hash</th>
                      <th className="py-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBlock.transactions?.map((transaction, index) => (
                      <tr key={index.toFixed()}>
                        <td className="pb-3 border-0">
                          <div className="font-medium bg-light-gray py-3 p-4 rounded-tl-md rounded-bl-md">
                            {transaction.blockHash}
                          </div>
                        </td>
                        <td className="pb-3 border-0">
                          <div className="font-medium bg-light-gray py-3 p-4 rounded-tr-md rounded-br-md">
                            {transaction.value}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
