<script>
  import { onMount } from "svelte"
  import Wordle from "./components/Wordle.svelte"
  import { randomSolution, getRandomSolution } from "./store/wordle"
  import "./style/global.css"

  // Fetch all solutions from the database here : data/db.json
  onMount(async () => {
    getRandomSolution()
  })
</script>

<main>
  <h1 class="py-10 mb-4 text-3xl border-b border-gray-200 ">
    Wordle Game (svelte version)
  </h1>
  {#if $randomSolution}
    <Wordle />
  {/if}
</main>

<style>
</style>
