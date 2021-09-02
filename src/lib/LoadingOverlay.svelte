<script lang="ts">
  export let loading: boolean
  export let color: string

  let count = 0
  let ellipsis = ""

  setInterval(() => {
    if (count > 3) {
      count = 0
    }
    ellipsis = "·".repeat(count)
    count += 1
  }, 800)
</script>

<template>
  <div class="overlay" class:hidden={!loading} style="--loading-color: {color}">
    <div class="loading-content" role="progressbar">
      <svg class="loading-icon" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
      </svg>
      <div class="loading-text-container">
        <div class="loading-text">
          Loading
          <div class="ellipsis">{ellipsis}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet">
</svelte:head>

<style>
  .hidden {
    display: none !important;
  }

  .overlay {
    position: fixed;
    inset: 0 0 0 0;
    
    display: grid;
    place-items: center;

    background: rgba(255, 255, 255, 0.4);

    z-index: 999;
  }

  .loading-content {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .loading-icon {
    width: 8rem;
    height: 8rem;

    color: var(--loading-color);

    animation: spin 1s linear infinite;
  }

  .loading-text-container {
    text-align: center;
  }

  .loading-text {
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 300;
    font-family: "Montserrat", sans-serif;
    position: relative;
  }

  .ellipsis {
    position: absolute;
    top: 0;
    left: 100%;
  }
</style>