import { IconX } from "@tabler/icons-solidjs";

type Props = {
  onCloseClick: () => void;
};

const Sidebar = (props: Props) => {
  return (
    <aside class="w-80 shrink-0 bg-zinc-900 border-r-2 border-zinc-800 p-2 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between">
          <h1 class="text-xl">Blockchain Playground</h1>
          <button
            title="Add a new block"
            class={`
          text-zinc-400
          hover:bg-purple-500 hover:text-zinc-200 p-2 rounded-md transition-all 
          `}
            onClick={props.onCloseClick}
          >
            <IconX class="h-6 w-6" />
          </button>
        </div>

        <p class="text-sm text-zinc-300 mt-4">
          This is a basic demo of the bitcoin block chain. You can play around
          with it and learn some basic concepts surrounding blockchains.
        </p>

        <p class="mt-4">Try it yourself!</p>
        <p class="text-sm text-zinc-300 mt-1">
          Add a few blocks, add some data to them, then mine each block, change
          the block data or nonce and watch the chain get validated or
          invalidated as you do!
        </p>

        <p class="mt-4">Interested in learning more?</p>
        <a
          class="text-sm text-blue-500 underline"
          href="https://youtu.be/bBC-nXj3Ng4"
          target="_blank"
        >
          Checkout this amazing explainer by 3Blue1Brown.
        </a>
      </div>

      <a
        class="block text-blue-500 underline"
        href="https://github.com/viconx98"
        target="_blank"
      >
        Made with ❤ by Vihar
      </a>
    </aside>
  );
};

export default Sidebar;
