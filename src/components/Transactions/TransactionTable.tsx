import React from "react";
import { ITransaction } from "../../types";

type Props = {
  data: ITransaction[];
};

const TransactionTable = ({ data }: Props) => {
  return (
    <div className="container">
      <div className="w-full overflow-x-auto bg-white border rounded-2xl p-8">
        <div className="flex items-center font-bold">
          <div className="p-3 text-left w-2/3 sm:w-1/2">Transaction Hash</div>
          <div className="p-3 text-left">Amount</div>
        </div>
        {data.map((txn) => (
          <div className="flex mb-2" key={txn.transactionIndex}>
            <div className="w-4/5 sm:w-1/2 font-medium bg-light-gray py-3 p-4 rounded-tl-md rounded-bl-md truncate">
              {txn.blockHash}
            </div>
            <div className="w-36 sm:w-48 font-medium bg-light-gray py-3 p-4 rounded-tr-md rounded-br-md truncate">
              {txn.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;
