<script>
  import { onMount } from "svelte"
  import { usedKeys } from "../store/wordle"
  let letters = null // [{key: "a", color: "grey"}, {key: "b"}]

  onMount(async () => {
    fetch("http://localhost:8000/letters")
      .then((response) => response.json())
      .then((data) => {
        letters = data
        letters = letters.map((l) => {
          return { ...l, color: "" }
        })
      })
  })
</script>

{#if letters}
  <div class=" max-w-[500px] mt-2 mx-auto">
    {#each letters as letter (letter)}
      {@const color = $usedKeys[letter.key]}
      <div
        class="w-10 h-12 bg-gray-200 inline-block rounded-md leading-[50px] m-[5px] transition-colors duration-300 ease-linear"
        class:grey={color === "grey"}
        class:green={color === "green"}
        class:yellow={color === "yellow"}
      >
        {letter.key}
      </div>
    {/each}
  </div>
{/if}

<style>
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
