import React from "react";
import { middleEllipsis } from "../../helpers";
import { INetwork, ITransaction } from "../../types";

type Props = {
  data: ITransaction[];
  network?: INetwork;
};

const TransactionTable = ({ data, network }: Props) => {
  return (
    <div className="container mx-auto">
      <div className="w-full overflow-auto bg-transparent md:bg-white border rounded-2xl p-8 px-4 sm:px-8 lg:px-24 max-h-screen md:max-h-[calc(100vh-120px)]">
        <div>
          <div className="hidden md:flex items-center font-bold">
            <div className="p-3 text-left min-w-[3rem] md:w-20">ID</div>
            <div className="p-3 text-left w-full md:w-1/2 lg:w-2/3">
              Transaction Hash
            </div>
            <div className="p-3 text-left w-36 sm:w-48">Amount</div>
            <div className="p-3 text-left w-36 sm:w-48">Tx Fee</div>
          </div>
          {data.map((txn, index) => (
            <div
              className="flex flex-wrap md:flex-nowrap mb-2 border md:border-none shadow-sm md:shadow-none bg-white md:bg-light-gray rounded-xl md:rounded-md py-3 md:py-0 px-1 md:px-0"
              key={`${txn.transactionIndex}_${index.toFixed()}`}
            >
              <div className="py-2 md:py-3 p-4 min-w-[3rem] md:w-20 w-full">
                <p className="text-xs md:hidden mr-3">Transaction ID </p>
                <p className="font-medium">{txn.transactionIndex}</p>
              </div>
              <div className="w-full md:w-1/2 lg:w-2/3 py-2 md:py-3 p-4 rounded-tl-md rounded-bl-md truncate">
                <p className="text-xs md:hidden">Transaction Hash</p>
                <a
                  href={`${network?.explorerURL}/tx/${txn.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 font-medium"
                >
                  {middleEllipsis(txn.hash, 8)}
                </a>
              </div>
              <div className="w-36 sm:w-48 py-2 md:py-3 p-4 rounded-tr-md rounded-br-md truncate">
                <p className="text-xs md:hidden">Amount</p>
                <div className="font-medium">
                  {txn.value}
                  <span className="ml-1">{network?.currency}</span>
                </div>
              </div>
              <div className="w-36 sm:w-48 py-2 md:py-3 p-4 rounded-tr-md rounded-br-md truncate">
                <p className="text-xs md:hidden">Tx Fee</p>
                <div className="font-medium">
                  {txn.gasPrice}
                  <span className="ml-1">{network?.currency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
