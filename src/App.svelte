<script lang="ts">
  import Card from './lib/Card.svelte'
  import type { YouTuber } from './lib/data';

  const youtubers: YouTuber[] = [{
    name: '社築',
    subscribers: 491000,
    link: 'https://www.youtube.com/channel/UCKMYISTJAQ8xTplUPHiABlA',
    imgUrl: 'https://yt3.ggpht.com/ytc/AKedOLSntkdxKpfXT8hCxMHMRMAof4q-Rpuf6JaqD9Tp=s88-c-k-c0x00ffffff-no-rj',
    date: '2018-05-25T00:13:18Z'
  }]
</script>

<main>
  <h1>プロセカ関係YouTubeチャンネル一覧</h1>
  <div class="cards">
    {#each youtubers as youtuber}  
      <Card youtuber={youtuber} />
    {/each}
  </div>
</main>

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

   /* {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  } */
  main {
    max-width: 800px;
    margin: 0 auto; 
  }

  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* justify-items: center; */
    gap: 0.8em;
  }

  @media screen and (max-width: 900px) {
    .cards {
      grid-template-columns: 1fr;
    }
  }
</style>
