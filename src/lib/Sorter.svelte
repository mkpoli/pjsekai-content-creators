<script lang="ts" context="module">
  import type { YouTuber } from '$lib/data'
  import Icon from '@iconify/svelte';
  export interface SortKey {
    name: string
    algorithm(a: YouTuber, b: YouTuber): number,
    defaultAscending: boolean
  }
</script>

<script lang="ts">
  export let keys: SortKey[]
  export let ascending: Boolean
  // export let current: SortKey
  export let currentID: number
</script>

<div>
  <button on:click={() => { ascending = !ascending }}>
    <Icon icon={ascending ? "bx:bx-sort-up" : "bx:bx-sort-down"}  width="2em" />
  </button>
  <select bind:value={currentID} on:change={() => { ascending = keys[currentID].defaultAscending }}>
    {#each keys as key, id}
      <option value={id} selected={currentID === id}>{key.name}</option>
    {/each}
  </select>
</div>

<style lang="postcss">
  div {
    display: grid;
    grid-template: 1fr / auto 1fr;
    padding: 0;
    background: white;
    border-radius: 5px;
    border: 1px solid #ccc;

    overflow: hidden;

    font-size: 1em;
  }

  div:focus-within {
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.06), 
                0 4px 8px rgba(0,0,0,0.05), 
                0 8px 16px rgba(0,0,0,0.04),
                0 16px 32px rgba(0,0,0,0.03), 
                0 32px 64px rgba(0,0,0,0.02),
                0 0 0 3px var(--color-miku);
    transform: scale(1.03);
  }

  
  button:hover,
  select:hover,
  button:focus,
  select:focus {
    background-color: color-mod(var(--color-miku) alpha(0.15)) ;
  }

  button:focus,
  select:focus {
    /* background-color: color-mod(var(--color-miku) alpha(0.05)) ; */
  }


  button {
    appearance: none;
    background: none;
    border: none;
    padding: 0.2em;
    padding-right: 0.25em;
    border-right: 1px solid #ccc;

    &:focus {
      outline: none;
    }
  }

  select {
    padding: 0.2em 0.4em;
    appearance: none;
    border: none;
    background: none;
    
    font-size: 1.1em;

    &:focus {
      outline: none;
    }
    
    text-align: center;
    & option {
      padding: 1em 0;
    }
  }
</style>