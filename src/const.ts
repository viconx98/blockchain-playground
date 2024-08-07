import { Block } from "./block";

export const INITIAL_PREVIOUS_BLOCK_HASH =
  "0000000000000000000000000000000000000000000000000000000000000000";

export const INITIAL_BLOCKCHAIN: Block[] = [
  {
    blockNumber: 1,
    nonce: 91472,
    data: "Hello world!",
    previousBlockHash: INITIAL_PREVIOUS_BLOCK_HASH,
    hash: "000035f43e283a68c5f9f9823e997af8a85ce902b1c9699f46f709cbd08ed232",
  },
];
