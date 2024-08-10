import { IconPlus } from "@tabler/icons-solidjs";
import { Block, BlockUtils } from "../block";
import * as Solid from "solid-js";

type Props = {
  difficulty: number;
  onNewBlockClick: () => void;
  onDifficultyChange: (newDifficulty: number) => void;
};

export default function Controls(props: Props) {
  return (
    <div class="fixed bottom-0 w-full flex items-center justify-center">
      <div
        class={`
          h-12 mb-4 w-fit 
          flex
          bg-zinc-900 text-zinc-400
          border-zinc-800 rounded-md border-2
        `}
      >
        <button
          title="Add a new block"
          class={`
            flex items-center gap-2
          text-zinc-400
          hover:bg-purple-500 hover:text-zinc-200 p-2 rounded-md transition-all 
          `}
          onClick={props.onNewBlockClick}
        >
          <IconPlus class="h-6 w-6  " />
          <p class="text-sm font-semibold">New Block</p>
        </button>

        {/* <div class="h-10 w-[2px] self-center bg-zinc-700 mx-1" />

        <div class="flex flex-col gap-1 items-start justify-center px-2">
          <div class="flex items-center justify-between w-full">
            <p class="text-xs">Difficulty</p>
            <p class="text-xs text-zinc-50">{props.difficulty}</p>
          </div>

          <input
            type="range"
            class="accent-purple-500"
            value={props.difficulty}
            min={4}
            max={10}
            step={1}
            onChange={(event) =>
              props.onDifficultyChange(event.target.valueAsNumber)
            }
          />
        </div> */}
      </div>
    </div>
  );
}
