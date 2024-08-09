import { DEFAULT_PREVIOUS_BLOCK_HASH } from "./const";

export type Block = {
  blockNumber: number;
  nonce?: number | null;
  data?: string | null;
  minedHash?: string | null;
  currentHash?: string | null;
};

async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);

  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

async function computeBlockHash(block: Block, previousBlock?: Block | string) {
  const _nonce = block.nonce || "";
  const _data = block.data || "";
  const _number = block.blockNumber.toString();
  const _previousBlockHash =
    typeof previousBlock === "string"
      ? previousBlock
      : previousBlock?.currentHash || DEFAULT_PREVIOUS_BLOCK_HASH;

  const textToHash = _number + _nonce + _data + _previousBlockHash;

  console.log(textToHash);

  const hash = await sha256(textToHash);

  return hash;
}

async function mineBlock(
  block: Block,
  prefix: string,
  previousBlock?: Block | string,
  initialNonce?: number
) {
  const _number = block.blockNumber.toString();
  let nonce = initialNonce || 1;
  const _data = block.data || "";
  const _previousBlockHash =
    typeof previousBlock === "string"
      ? previousBlock
      : previousBlock?.currentHash || "";

  while (true) {
    const textToHash = _number + nonce + _data + _previousBlockHash;

    const hash = await sha256(textToHash);

    if (hash.startsWith(prefix)) {
      return { hash, nonce };
    }

    nonce++;
  }
}

export const BlockUtils = {
  computeBlockHash,
  mineBlock,
};
