import * as Solid from "solid-js";
import { createStore } from "solid-js/store";
import { INITIAL_BLOCKCHAIN } from "./const";
import BlockCard from "./components/BlockCard";
import { Block, BlockUtils } from "./block";

const App: Solid.Component = () => {
  const [store, setStore] = createStore({
    difficulty: 4,
    blockchain: INITIAL_BLOCKCHAIN,
  });

  const onBlockMine = async (blockToMine: Block) => {
    const blockArrayIndex = store.blockchain.findIndex(
      (b) => b.blockNumber === blockToMine.blockNumber
    );

    if (blockArrayIndex === -1) {
      console.error("Block doesn't exist.");
      return;
    }

    const miningResult = await BlockUtils.mineBlock(
      blockToMine,
      "0".repeat(store.difficulty)
    );

    setStore("blockchain", blockArrayIndex, {
      nonce: miningResult.nonce,
      hash: miningResult.hash,
    });
  };

  const onBlockAdd = async () => {
    const lastBlock = store.blockchain.at(-1);

    if (!lastBlock) {
      console.error("Invalid state. Blockchain array is empty.");
      return;
    }

    const newBlock: Block = {
      blockNumber: lastBlock.blockNumber + 1,
      previousBlockHash: lastBlock.hash,
    };

    setStore("blockchain", store.blockchain.length, newBlock);
  };

  const onBlockUpdate = async (updatedBlock: Block) => {};

  return (
    <main class="w-full min-h-screen bg-zinc-950 text-zinc-50">
      <button class="border p-2 rounded-md" onClick={onBlockAdd}>
        Add Block
      </button>

      <Solid.For each={store.blockchain}>
        {(block) => (
          <BlockCard
            block={block}
            onMineClick={onBlockMine}
            onBlockUpdate={onBlockUpdate}
          />
        )}
      </Solid.For>
    </main>
  );
};

export default App;
