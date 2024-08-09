import * as Solid from "solid-js";
import { Block } from "../block";
import BlockCard from "./BlockCard";

type Props = {
  blockchain: Block[];
  difficulty: number;
  onBlockMine: (block: Block, blockIndex: number) => void;
  onBlockUpdate: (block: Partial<Block>, blockIndex: number) => void;
};

const Blockchain = (props: Props) => {
  const getPreviousBlockByIndex = (index: number) => {
    return index > 0 ? props.blockchain[index - 1] : undefined;
  };

  return (
    <div class="flex h-screen items-center overflow-x-scroll">
      <Solid.For each={props.blockchain}>
        {(block, index) => (
          <BlockCard
            index={index()}
            block={block}
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
