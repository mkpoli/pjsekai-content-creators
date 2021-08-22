<script lang="ts">
  export let loading: boolean
  export let color: string
</script>

<template>
  <div class="overlay" class:hidden={!loading} style="--loading-color: {color}">
    <div class="loading-content" role="progressbar">
      <svg class="loading-icon" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
      </svg>
      <p class="loading-text">Loading</p>
    </div>
  </div>
</template>

<style>
  .hidden {
    display: none !important;
  }

  .overlay {
    position: fixed;
    inset: 0 0 0 0;
    
    display: grid;
    place-items: center;

    background: rgba(255, 255, 255, 0.9);

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

  @keyframes ellipsis {
    to {
      width: 1em;
    }
  }

  .loading-text:after {
    content: '…';
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    width: 0;
    animation: ellipsis steps(4,end) 900ms infinite;
  }
</style>