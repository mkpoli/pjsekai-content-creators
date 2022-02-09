<script lang="ts">
  import Card from '$lib/Card.svelte'
  import Footer from '$lib/Footer.svelte'
  import LoadingOverlay from '$lib/LoadingOverlay.svelte'
  import Sorter from '$lib/Sorter.svelte'
  import Tag from '$lib/Tag.svelte'
  import type { SortKey } from '$lib/Sorter.svelte'
  import type { YouTuber } from '$lib/data'
  import { getYouTubers } from '$lib/data'
  import { persist, localStorage } from "@macfja/svelte-persistent-store"
  import { writable } from "svelte/store"
  import { tagFilters } from '$lib/filter'

  let ascending = persist(writable(false), localStorage(), 'sort-ascending')
  let currentKeyID = persist(writable(0), localStorage(), 'sort-current-key-id')

  let loading = true
  let youtubers: YouTuber[] = []
  // let ascending: Boolean = false
  const SORT_KEYS: SortKey[] = [
    {
      name: '登録者数順',
      algorithm(a: YouTuber, b: YouTuber) {
        return a.subscribers - b.subscribers
      },
      defaultAscending: false
    },
    {
      name: '視聴回数順',
      algorithm(a: YouTuber, b: YouTuber) {
        return a.viewCount - b.viewCount
      },
      defaultAscending: false
    },
    {
      name: 'タイトル順',
      algorithm(a: YouTuber, b: YouTuber) {
        return a.name.localeCompare(b.name)
      },
      defaultAscending: true
    },
    {
      name: '創設時間順',
      algorithm(a: YouTuber, b: YouTuber) {
        return Date.parse(a.creationDate) - Date.parse(b.creationDate)
      },
      defaultAscending: true
    }
  ]
  $: sorted = [...youtubers]
    .sort((a, b) => SORT_KEYS[$currentKeyID]?.algorithm(a, b) * ($ascending ? 1 : -1))
    .filter(({ tags }) => $tagFilters.every(tag => tags.find(({ name }) => name === tag)))
  getYouTubers().then((result) => {
    youtubers = result
    loading = false
  })
</script>

<main>
  <h1>プロセカ関係YouTubeチャンネル一覧</h1>
  <p>
    ※ アイコンをクリックするとチャンネルに飛びます。<br>
    ※ 追加や<abbr title="「掲載しないでほしい」">不掲載</abbr>のリクエスト等がありましたら、<a href="https://twitter.com/_mkpoli/status/1429708704648105985?s=20">こちらのツイート</a>までお願いします！
  </p>
  <div class="header">
    <span>{youtubers?.length ?? 0} チャンネル</span>
    <div class="spacer"></div>
    <div class="tags">
      {#each $tagFilters as tag, i}
        <Tag
          name={tag}
          on:click={() => { $tagFilters = $tagFilters.filter((t) => t !== tag) }}/>
      {/each}
    </div>
    <div class="spacer"></div>
    <Sorter keys={SORT_KEYS} bind:currentID={$currentKeyID} bind:ascending={$ascending} />
  </div>
  <div class="cards">
    {#if loading}
      {#each Array(7) as _, i}
        <Card skeleton/>
      {/each}
    {:else}
      {#each sorted as youtuber}  
        <Card youtuber={youtuber} />
      {/each}
    {/if}
  </div>
</main>
<LoadingOverlay loading={loading} color="#00fedf"/>
<Footer/>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="crossorigin">
  <link href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@400;700;800;900&display=swap" rel="stylesheet">
</svelte:head>

<style>
  main {
    max-width: 800px;
    margin: 0 auto; 
  }

  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
  }

  @media screen and (max-width: 900px) {
    .cards {
      grid-template-columns: 1fr;
    }
  }


  .header {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: stretch;
    padding: 1em;
  }

  .tags {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 0.25em;
    gap: 0.5em 0.5em;

    font-size: 0.9em;
  }
</style>
