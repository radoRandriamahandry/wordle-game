<script>
  import { currentGuess, turn, isCorrect } from "../store/wordle"

  export let guesse
  export let index

  // out : from 1 to 0
  // Avoir 0 à 90 :
  // rotate : 0° to 90°
  const flipCard = (node, { duration, delay }) => {
    return {
      duration,
      delay,
      css: (t, u) => {
        return `
          transform: rotateX(${90 * u}deg);
          
        `
      },
    }
  }

  $: currentGuessArray = $currentGuess.split("")
  let borderIsHidden = false
  const hideBorder = (node) => {
    borderIsHidden = true
  }

  $: if ($isCorrect || $turn > 5) {
    borderIsHidden = false
  }
</script>

<!-- create a container -->
<!-- position the row absolute -->
<!-- if turn === index -->
<!-- else blank -->

{#if $turn === index}
  <div class="flex gap-2 justify-center ">
    {#each currentGuessArray as l, i (i)}
      <div class="cell border-gray-800 text-gray-800 animate-scale-up">
        {l}
      </div>
    {/each}
    <!-- to autocomplete the empty cells depending on the currentGuessArray length -->
    {#each Array(5 - currentGuessArray.length) as _, i (i)}
      <div class="cell" />
    {/each}
  </div>
{:else if guesse}
  <div class="flex gap-2 justify-center [perspective:800px] ">
    {#each guesse as l, i (i)}
      <div
        class={`cell ["tansform-style":preserve-3d] ${l.color}`}
        in:flipCard={{ duration: 200, delay: 100 * i }}
      >
        {l.key}
      </div>
    {/each}
  </div>
{:else}
  <div class="flex gap-2 justify-center">
    {#each Array(5) as _, i (i)}
      <div class="cell" />
    {/each}
  </div>
{/if}

<style>
  .cell {
    @apply w-20 h-20 mb-2 border text-4xl font-semibold uppercase flex justify-center items-center;
  }
  .grey {
    @apply bg-gray-600 text-white;
  }
  .yellow {
    @apply bg-yellow-500 text-white;
  }
  .green {
    @apply bg-green-600 text-white;
  }
</style>
