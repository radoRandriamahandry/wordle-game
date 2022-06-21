<script>
  import { guesses } from "../store/wordle"
  import Row from "./Row.svelte"
</script>

<div class="mt-2">
  {#each $guesses as guesse, index (index)}
    <Row {guesse} {index} />
  {/each}
</div>
