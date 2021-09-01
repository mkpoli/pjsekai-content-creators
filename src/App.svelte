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
  <p>
    ※ アイコンをクリックするとチャンネルに飛びます。<br>
    ※ 追加リクエストなどがありましたら、<a href="https://twitter.com/_mkpoli/status/1429708704648105985?s=20">こちらのツイート</a>までお願いします！
  </p>
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
    color: var(--color-text-main);
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

  a {
    transition: .2s;
    text-decoration: none;
    color: #00d7fc;
  }

  a:hover {
    text-decoration: underline;
  }

  a:visited {
    color: #00d7fc;
  }
</style>
