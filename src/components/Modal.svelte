<script>
  import { createEventDispatcher } from "svelte"

  import { turn, isCorrect, randomSolution } from "../store/wordle"

  const dispatch = createEventDispatcher()
  // const restartTheGame = () => {
  //   dispatch("restartTheGame")
  // }
</script>

<div
  class="fixed h-full w-full inset-0 bg-gray-600/20 grid place-items-center transition-all duration-150 ease-in"
>
  <div class="bg-white border shadow-md shadow-purple-900/10 rounded-lg">
    {#if $isCorrect}
      <h2 class="text-xl font-semibold text-purple-800 py-5 px-20">
        Congrats you are badass!!!
      </h2>
      <p class="font-semibold uppercase pb-5">
        {$randomSolution}
      </p>
      <p class="pt-4 border-t border-purple-800/30">
        You the solution in {$turn} turn
      </p>
    {:else}
      <h2 class="text-xl font-semibold text-purple-800 py-5 px-20">
        Sorry, you'll do better next time
      </h2>
      <p class="font-semibold uppercase border-b border-purple-800/30 ">
        {$randomSolution}
      </p>
    {/if}
    <button
      class="py-2 px-4 mt-4 hover:bg-purple-800 border hover:text-white text-purple-800 border-purple-800 cursor-pointer rounded-lg mb-5 uppercase font-semibold"
      on:click={() => dispatch("restart")}>Restart</button
    >
  </div>
</div>
