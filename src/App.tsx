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

  const getPreviousBlockByIndex = (index: number) => {
    return index > 0 ? store.blockchain[index - 1] : undefined;
  };

  const onBlockMine = async (blockToMine: Block, minedBlockIndex: number) => {
    const previousBlock = getPreviousBlockByIndex(minedBlockIndex);

    const miningResult = await BlockUtils.mineBlock(
      blockToMine,
      "0".repeat(store.difficulty),
      previousBlock
    );

    setStore("blockchain", minedBlockIndex, {
      nonce: miningResult.nonce,
      minedHash: miningResult.hash,
      currentHash: miningResult.hash,
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
    };

    setStore("blockchain", store.blockchain.length, newBlock);
  };

  const onBlockUpdate = async (
    updatedBlock: Partial<Block>,
    updatedBlockIndex: number
  ) => {
    for (
      let index = updatedBlockIndex;
      index < store.blockchain.length;
      index++
    ) {
      if (index === updatedBlockIndex) {
        setStore("blockchain", index, { ...updatedBlock });
      }

      const previousBlock = getPreviousBlockByIndex(index);

      const updatedCurrentHash = await BlockUtils.computeBlockHash(
        store.blockchain[index],
        previousBlock
      );

      setStore("blockchain", index, {
        currentHash: updatedCurrentHash,
      });
    }
  };

  return (
    <main class="w-full min-h-screen bg-zinc-950 text-zinc-50">
      <button class="border p-2 rounded-md" onClick={onBlockAdd}>
        Add Block
      </button>

      <Solid.For each={store.blockchain}>
        {(block, index) => (
          <BlockCard
            index={index()}
            block={block}
            previousBlock={getPreviousBlockByIndex(index())}
            onMineClick={onBlockMine}
            onBlockUpdate={onBlockUpdate}
          />
        )}
      </Solid.For>
    </main>
  );
};

export default App;
