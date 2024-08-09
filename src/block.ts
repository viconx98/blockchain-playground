export type Block = {
  blockNumber: number;
  nonce?: number | null;
  data?: string | null;
  previousBlockHash?: string | null;
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

async function computeBlockHash(block: Block) {
  const _data = block.data || "";
  const _number = block.blockNumber.toString();

  const textToHash = _number + block.nonce + _data + block.previousBlockHash;

  const hash = await sha256(textToHash);

  return hash;
}

async function mineBlock(block: Block, prefix: string, initialNonce?: number) {
  let nonce = initialNonce || 1;

  while (true) {
    const _data = block.data || "";
    const _number = block.blockNumber.toString();

    const textToHash = _number + nonce + _data + block.previousBlockHash;

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
