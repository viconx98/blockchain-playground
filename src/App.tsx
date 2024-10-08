import * as Solid from "solid-js";
import { createStore } from "solid-js/store";
import { INITIAL_BLOCKCHAIN } from "./const";
import BlockCard from "./components/BlockCard";
import { Block, BlockUtils } from "./block";
import Controls from "./components/Controls";
import Blockchain from "./components/Blockchain";
import Sidebar from "./components/Sidebar";
import { IconMenu2 } from "@tabler/icons-solidjs";

type Store = {
  difficulty: number;
  blockchain: Block[];
  isSidebarOpen: boolean;
  blockBeingMined: Block["blockNumber"] | null;
};

const App: Solid.Component = () => {
  const [store, setStore] = createStore<Store>({
    difficulty: 4,
    blockchain: INITIAL_BLOCKCHAIN,
    isSidebarOpen: true,
    blockBeingMined: null,
  });

  const getPreviousBlockByIndex = (index: number) => {
    return index > 0 ? store.blockchain[index - 1] : undefined;
  };

  const onBlockMine = async (blockToMine: Block, minedBlockIndex: number) => {
    if (store.blockBeingMined) {
      alert("You can only mine one block at a time!");
      return;
    }

    const previousBlock = getPreviousBlockByIndex(minedBlockIndex);

    setStore("blockBeingMined", blockToMine.blockNumber);

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

    setStore("blockBeingMined", null);
  };

  const onBlockAdd = async () => {
    const lastBlock = store.blockchain.at(-1);

    if (!lastBlock?.minedHash) {
      alert("Please mine the last block before adding a new one!");
      return;
    }

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
    <main class="relative min-w-full min-h-screen bg-zinc-950 text-zinc-50 font-poppins flex ">
      {store.isSidebarOpen ? (
        <Sidebar onCloseClick={() => setStore("isSidebarOpen", false)} />
      ) : (
        <button
          title="Add a new block"
          class={`
            fixed top-2 left-2
            flex items-center gap-2
          text-zinc-400
          hover:bg-purple-500 hover:text-zinc-200 p-2 rounded-md transition-all 
          `}
          onClick={() => setStore("isSidebarOpen", true)}
        >
          <IconMenu2 class="h-6 w-6" />
        </button>
      )}

      <Blockchain
        blockchain={store.blockchain}
        difficulty={store.difficulty}
        blockBeingMined={store.blockBeingMined}
        onBlockMine={onBlockMine}
        onBlockUpdate={onBlockUpdate}
      />
      <Controls
        difficulty={store.difficulty}
        showTip={store.blockchain.length > 1}
        onNewBlockClick={onBlockAdd}
        onDifficultyChange={(difficulty) => {
          if (difficulty > 5) {
            alert("Harder difficulty will result in longer mine times!");
          }
          setStore("difficulty", difficulty);
          setStore("blockchain", []);
        }}
      />
    </main>
  );
};

export default App;
