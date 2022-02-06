import Web3 from "web3";
/* eslint-disable no-param-reassign */
import utils from "web3-utils";
import { formatters } from "web3-core-helpers";
import { ITransaction } from "../types";
import { DEFAULT_NETWORK, SupportedChains } from "./constants";

export const getWeb3Service = () => {
  const web3 = new Web3(Web3.givenProvider || DEFAULT_NETWORK.newRPCUrl);

  web3.extend({
    methods: [
      {
        name: "getBigGasLimitTransaction",
        call: "eth_getTransactionByHash",
        params: 1,
        inputFormatter: [null],
        // @ts-nocheck
        // @ts-ignore
        outputFormatter: bigGasLimitTransactionFormatter,
      },
    ],
  });

  return web3;
};

// ref https://github.com/ChainSafe/web3.js/issues/3936

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
    tx.to = utils.toChecksumAddress(tx.to);
  } else {
    tx.to = null;
  }
  if (tx.from) {
    tx.from = utils.toChecksumAddress(tx.from);
  }
  return tx;
};

export const getChainById = (chainID: number) => {
  return Object.values(SupportedChains).find(
    (chain) => chain.mainNetId === chainID || chain.chainID === chainID
  );
};

export const middleEllipsis = (str: string, len: number) => {
  if (!str) {
    return "";
  }
  if (window.innerWidth < 768) {
    return `${str.substr(0, len)}...${str.substr(
      str.length - len,
      str.length
    )}`;
  }
  return str;
};
