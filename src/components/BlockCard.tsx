import { Block, BlockUtils } from "../block";
import * as Solid from "solid-js";

type Props = {
  index: number;
  block: Block;
  previousBlock?: Block;
  onMineClick: (block: Block, blockIndex: number) => void;
  onBlockUpdate: (block: Partial<Block>, blockIndex: number) => void;
};

export default function BlockCard(props: Props) {
  const isValidBlock = Solid.createMemo(
    () =>
      Boolean(props.block.currentHash) &&
      Boolean(props.block.minedHash) &&
      props.block.currentHash === props.block.minedHash
  );

  return (
    <div
      class={`
      ${isValidBlock() ? "bg-green-500/20" : "bg-red-500/20"}
      flex flex-col gap-2 border p-2
    `}
    >
      <p>#{props.block.blockNumber}</p>
      <div class="flex gap-2">
        <p>Nonce: </p>
        <input
          type="number"
          class="bg-zinc-800"
          value={props.block.nonce?.toString() || ""}
          onChange={(event) =>
            props.onBlockUpdate(
              { nonce: parseInt(event.target.value) },
              props.index
            )
          }
        />
      </div>
      <div class="flex gap-2">
        <p>Data:</p>
        <textarea
          class="bg-zinc-800"
          value={props.block.data?.toString() || ""}
          onChange={(event) =>
            props.onBlockUpdate({ data: event.target.value }, props.index)
          }
        />
      </div>
      <p>Previous Hash: {props.previousBlock?.currentHash}</p>
      <p>Mined Hash: {props.block.minedHash}</p>
      <p>Current Hash: {props.block.currentHash}</p>

      <button
        class="border p-2"
        onClick={() => props.onMineClick(props.block, props.index)}
      >
        Mine
      </button>
    </div>
  );
}
