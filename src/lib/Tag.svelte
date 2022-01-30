<script lang="ts">
  import Icon from '@iconify/svelte'

  export let name: string = ''
  export let plus: boolean = false
</script>

<button
  on:click
>
  {#if !plus}
    <Icon icon="ph:hash-fill"/>
    <span>{name}</span>
  {:else}
    <Icon icon="ion:add" height="1.2em"/>
  {/if}
</button>

<style lang="postcss">
  button {
    border: 1px solid color-mod(var(--color-aqua) lightness(30%));
    color: color-mod(var(--color-aqua) lightness(30%));
    border-radius: 9999px;

    padding: 0.1em 0.6em;
    /* background: #00cdf420; */
    transition: background 0.25s ease;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 1.8em;
  }
  
  button:hover {
    background: color-mod(var(--color-aqua) alpha(0.1));
    box-shadow: 0 0 5px 1px color-mod(var(--color-aqua) alpha(0.1));
  }

  button:focus-visible {
    outline: none;
    color: white;
    
    background: color-mod(var(--color-aqua) lightness(30%));
  }

  button:focus-visible > * {
    filter: drop-shadow(0 0 0.5em white);
  }
</style>