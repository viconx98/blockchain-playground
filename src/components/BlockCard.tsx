import { IconHash, IconPick } from "@tabler/icons-solidjs";
import { Block, BlockUtils } from "../block";
import * as Solid from "solid-js";
import { DEFAULT_PREVIOUS_BLOCK_HASH } from "../const";

type Props = {
  index: number;
  block: Block;
  previousBlock?: Block;
  isBeingMined?: boolean;
  isLastBlock?: boolean;
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
    <div class="flex flex-col md:flex-row shrink-0">
      <div
        class={`
        w-full md:w-fit rounded-md
        flex flex-col border-2 border-zinc-800 
        shadow-xl ${
          isValidBlock() ? "shadow-green-500/10" : "shadow-red-500/10"
        }
        shrink-0
    `}
      >
        <div class="flex flex-col w-full bg-zinc-900/50 px-2 py-4 border-b-2 border-dashed  border-zinc-800 backdrop-blur-[1px]">
          <div class="flex gap-1 border-2 border-zinc-700 w-fit rounded-md overflow-hidden">
            <p class="text-sm bg-zinc-800 p-1 text-zinc-500">SHA-256</p>
            <p class="text-sm p-1 rounded-md text-zinc-400 break-all">
              {props.index === 0
                ? DEFAULT_PREVIOUS_BLOCK_HASH
                : props.previousBlock?.currentHash}
            </p>
          </div>
        </div>

        <div class={"flex flex-col gap-4 p-2 bg-zinc-900"}>
          <div
            class={`
          ${isValidBlock() ? "text-green-500" : "text-red-500"}
          flex justify-between items-center 
          `}
          >
            <p class="text-lg font-semibold">
              #{props.block.blockNumber}
              {" - "}
              <span class={isValidBlock() ? "text-green-500" : "text-red-500"}>
                {isValidBlock() ? "VALID" : "INVALID"}
              </span>
            </p>
            <button
              disabled={props.isBeingMined}
              class="rounded-md p-2 flex items-center gap-2 justify-start hover:bg-zinc-800 disabled:bg-zinc-800 transition-all active:bg-zinc-700 text-zinc-400"
              onClick={() => props.onMineClick(props.block, props.index)}
            >
              <IconPick
                class={`
              h-6 w-6 shrink-0
              ${props.isBeingMined && "animate-bounce"}
              `}
              />
              <span class="w-full">
                {props.isBeingMined ? "Mining..." : "Mine"}
              </span>
            </button>
          </div>
          <div class="flex items-center gap-2">
            <p class="text-sm text-zinc-500 font-semibold">Nonce</p>
            <input
              type="number"
              class="bg-zinc-800 p-2 rounded-md border-2 border-zinc-700 outline-none w-full"
              value={props.block.nonce?.toString() || ""}
              onChange={(event) =>
                props.onBlockUpdate(
                  { nonce: parseInt(event.target.value) },
                  props.index
                )
              }
            />
          </div>
          <textarea
            placeholder="Data"
            class="bg-zinc-800 p-2 rounded-md border-2 border-zinc-700 outline-none w-full placeholder:text-zinc-500"
            value={props.block.data?.toString() || ""}
            onChange={(event) =>
              props.onBlockUpdate({ data: event.target.value }, props.index)
            }
          />

          <div class="flex flex-col w-full rounded-md mt-2 gap-2">
            <div class="flex flex-col gap-2 ">
              <p class="text-xs text-zinc-500 font-semibold">Calculated Hash</p>
            </div>
            <div class="flex gap-1 border-2 border-zinc-700 w-fit rounded-md overflow-hidden w-full">
              <p class="text-sm bg-zinc-800 p-1 text-zinc-500">SHA-256</p>
              <p class="text-sm p-1 rounded-md text-zinc-400 break-all">
                {props.block.minedHash || props.block.currentHash}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Connectors */}
      {!props.isLastBlock && (
        <div class="py-6 hidden md:flex">
          <div class="w-8 h-2 bg-zinc-700 self-end"></div>
          <div class="w-2 h-full bg-zinc-700 rounded-tl-full rounded-br-full"></div>
          <div class="w-8 h-2 bg-zinc-700"></div>
        </div>
      )}

      {!props.isLastBlock && (
        <div class="self-center md:hidden">
          <div class="w-2 h-16 bg-zinc-700 self-end"></div>
        </div>
      )}
    </div>
  );
}
