<script>
  import Grid from "./Grid.svelte"
  import Modal from "./Modal.svelte"
  import { onMount } from "svelte"
  import {
    randomSolution,
    handleKeyUp,
    currentGuess,
    isCorrect,
    turn,
    restartGame,
  } from "../store/wordle"
  import Keypad from "./Keypad.svelte"

  onMount(() => {
    window.addEventListener("keyup", handleKeyUp)
    return () => window.removeEventListener("keyup", handleKeyUp)
  })

  // ending game condition reached
  $: if ($isCorrect || $turn > 5) {
    window.removeEventListener("keyup", handleKeyUp)
  }

  let showModal = false
  $: if ($isCorrect || $turn > 5) {
    setTimeout(() => {
      showModal = true
    }, 2000)
  }

  const restart = () => {
    showModal = false
    restartGame()
  }
</script>

<!-- <svelte:window on:keyup={({ key }) => handleKeyUp(key)} /> -->

<div>
  <p>
    Random solution : <span class="font-semibold">{$randomSolution}</span>
  </p>
  <p>current guess {$currentGuess}</p>
  <Grid />
  <Keypad />
  {#if showModal}
    <Modal on:restart={restart} />
  {/if}
</div>
