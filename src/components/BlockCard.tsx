import { Block, BlockUtils } from "../block";
import * as Solid from "solid-js";

type Props = {
  index: number;
  block: Block;
  previousBlock?: Block;
  onMineClick: (block: Block, blockIndex: number) => void;
  onBlockUpdate: (block: Block, blockIndex: number) => void;
};

export default function BlockCard(props: Props) {
  const [currentHash, setCurrentHash] = Solid.createSignal<string>();

  const computeCurrentHash = async () => {
    const hash = await BlockUtils.computeBlockHash(props.block);
    setCurrentHash(hash);
  };

  Solid.createEffect(() => {
    computeCurrentHash();
  });

  const isValidBlock = Solid.createMemo(
    () =>
      Boolean(currentHash()) &&
      Boolean(props.block.hash) &&
      currentHash() === props.block.hash
  );

  return (
    <div
      class={`
      ${isValidBlock() ? "bg-green-500/20" : "bg-red-500/20"}
      flex flex-col gap-2 border p-2
    `}
    >
      <p>#{props.block.blockNumber}</p>
      <p>Nonce: {props.block.nonce}</p>
      <p>Data: {props.block.data}</p>
      <p>Previous Hash: {props.block.previousBlockHash}</p>
      <p>Hash: {props.block.hash}</p>

      <button
        class="border p-2"
        onClick={() => props.onMineClick(props.block, props.index)}
      >
        Mine
      </button>
    </div>
  );
}
