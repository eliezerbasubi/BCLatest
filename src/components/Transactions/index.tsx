import React from "react";
import { useBlockchain } from "../../contexts/blockchainProvider";

const Transactions = () => {
  const { currentBlock } = useBlockchain();

  return (
    <div
      id="transactions"
      className="min-h-screen w-full max-w-[1420px] mx-auto py-12"
    >
      <h3 className="text-center uppercase text-xl md:text-2xl lg:text-3xl font-extrabold">
        Transactions
      </h3>

      <div className="py-4 flex justify-center">
        <div className="bg-white border rounded-2xl p-8">
          <table className="border-collapse border-0">
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
                      {transaction}
                    </div>
                  </td>
                  <td className="pb-3 border-0">
                    <div className="font-medium bg-light-gray py-3 p-4 rounded-tr-md rounded-br-md">
                      1000
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
