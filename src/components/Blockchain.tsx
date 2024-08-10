import * as Solid from "solid-js";
import { Block } from "../block";
import BlockCard from "./BlockCard";

type Props = {
  blockchain: Block[];
  difficulty: number;
  blockBeingMined: Block["blockNumber"] | null;
  onBlockMine: (block: Block, blockIndex: number) => void;
  onBlockUpdate: (block: Partial<Block>, blockIndex: number) => void;
};

const Blockchain = (props: Props) => {
  const getPreviousBlockByIndex = (index: number) => {
    return index > 0 ? props.blockchain[index - 1] : undefined;
  };

  return (
    <div class="flex min-h-screen max-h-screen w-full items-center overflow-auto flex-col pt-16 pb-20 px-2 md:pb-0 md:flex-row md:px-16 md:pt-0 custom-scrollbar dotted-background">
      <Solid.For each={props.blockchain}>
        {(block, index) => (
          <BlockCard
            index={index()}
            block={block}
            isBeingMined={block.blockNumber === props.blockBeingMined}
            isLastBlock={index() === props.blockchain.length - 1}
            previousBlock={getPreviousBlockByIndex(index())}
            onMineClick={props.onBlockMine}
            onBlockUpdate={props.onBlockUpdate}
          />
        )}
      </Solid.For>
    </div>
  );
};

export default Blockchain;
