<script>
  import { flip } from "svelte/animate"
  import { quintOut } from "svelte/easing"

  let list = [1, 2, 3]
</script>

{#each list as n (n)}
  <div animate:flip={{ delay: 1000, duration: 1000, easing: quintOut }}>
    {n}
  </div>
{/each}
