<script lang="ts">
  import Card from './lib/Card.svelte'
  import LoadingOverlay from './lib/LoadingOverlay.svelte'

  import type { YouTuber } from './lib/data'
  import { getYouTubers } from './lib/data'

  let loading = true
  let youtubers: YouTuber[] = []

  getYouTubers().then((result) => {
    youtubers = result
    loading = false
  })
</script>

<main>
  <h1>プロセカ関係YouTubeチャンネル一覧</h1>
  <div class="cards">
    {#each youtubers as youtuber}  
      <Card youtuber={youtuber} />
    {/each}
  </div>
</main>
<LoadingOverlay loading={loading} color="#00fedf"></LoadingOverlay>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="crossorigin">
  <link href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@400;900&display=swap" rel="stylesheet">
</svelte:head>

<style>
  :root {
    font-family: "M PLUS 1p", sans-serif;
    color: rgb(68, 68, 102);
  }

  main {
    max-width: 800px;
    margin: 0 auto; 
  }

  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.8em;
  }

  @media screen and (max-width: 900px) {
    .cards {
      grid-template-columns: 1fr;
    }
  }
</style>
