import Web3 from "web3";
/* eslint-disable no-param-reassign */
import utils from "web3-utils";
import { formatters } from "web3-core-helpers";
import { ITransaction } from "../types";

export const getWeb3Service = () => {
  const web3 = new Web3(
    Web3.givenProvider ||
      "https://nodeapi.energi.network/v1/jsonrpc" ||
      "ws://localhost:8545"
  );

  // web3.extend({
  //   methods: [
  //     {
  //       name: "getBigGasLimitTransaction",
  //       call: "eth_getTransactionByHash",
  //       params: 1,
  //       inputFormatter: [null],
  //       outputFormatter: bigGasLimitTransactionFormatter,
  //     },
  //   ],
  // });

  return web3;
};

const bigGasLimitTransactionFormatter = (tx: ITransaction) => {
  if (tx.blockNumber !== null) {
    tx.blockNumber = utils.hexToNumber(tx.blockNumber);
  }
  if (tx.transactionIndex !== null) {
    tx.transactionIndex = utils.hexToNumber(tx.transactionIndex);
  }
  tx.nonce = utils.hexToNumber(tx.nonce);
  tx.gas = formatters.outputBigNumberFormatter(tx.gas);
  tx.gasPrice = formatters.outputBigNumberFormatter(tx.gasPrice as number);
  tx.value = formatters.outputBigNumberFormatter(tx.value as number);
  if (tx.to && utils.isAddress(tx.to)) {
    // tx.to could be `0x0` or `null` while contract creation
    tx.to = utils.toChecksumAddress(tx.to);
  } else {
    tx.to = null; // set to `null` if invalid address
  }
  if (tx.from) {
    tx.from = utils.toChecksumAddress(tx.from);
  }
  return tx;
};

export default bigGasLimitTransactionFormatter;