<script lang="ts">
  import moment from 'moment'
  import youtubeFail from '../assets/youtube_fail.png'
  import Icon from '@iconify/svelte'

  moment.locale('ja')

  import { tick } from 'svelte'

  import type { YouTuber } from './data'
  
  export let youtuber: YouTuber | null = null
  export let skeleton: boolean = false

  let failed: boolean = false
  let editing = false
  let inputTag = ''
  let tagInput: HTMLInputElement
</script>

<div class="card">
  {#if !skeleton}
    <h3>{youtuber.name}</h3>
    <div class="info">
      <a href={youtuber.link}>
        {#if !failed}
          <img
            class="profile-image"
            src={youtuber.profilePictureUrl}
            alt={`${youtuber.name}のアイコン`}
            on:error={() => {failed = true}}
            on:load={() => {failed = false}}
          >
        {:else}
          <img
            class="profile-image failed"
            src={youtubeFail}
            alt={`${youtuber.name}のアイコン（取得失敗）`}
          >
        {/if}
      </a>
      <div class="stat">
        <p>登録者数  {youtuber.subscribers || '（非表示）'}</p>
        <p>創設時間  {moment(youtuber.creationDate).format('ll')}</p>
      </div>
    </div>
    <div class="tags">
      {#each [...youtuber.tags].sort((a, b) => b.count - a.count) as { name }}
        <button tabindex="0"><Icon icon="ph:hash-fill"/><span>{name}</span></button>
      {/each}
      {#if !editing}
        <button
          class="plus"
          tabindex="0"
          on:click={async () => { editing = true; await tick(); tagInput.focus() }}
        >
          <Icon icon="ion:add" height="1.2em"/>
        </button>
      {:else}
        <input
          type="text"
          placeholder="Enterキーで確定する"
          bind:value={inputTag}
          bind:this={tagInput}
          on:blur={() => { editing = false }}
          on:keydown={(e) => {
            if (e.key === 'Enter') {
              if (inputTag) {
                const existingTag = youtuber.tags.find(({ name }) => name === inputTag)
                if (!existingTag) {
                  youtuber.tags.push({ name: inputTag, count: 1 })
                } else {
                  existingTag.count += 1
                }
                youtuber.tags = youtuber.tags
                inputTag = ''
              }
              editing = false
            }
          }}
        />
      {/if}
    </div>
  {:else}
    <h3 class="skeleton skeleton-text"> </h3>
    <div class="info">
      <div class="skeleton profile-image"></div>
      <div class="stat">
        <p class="skeleton skeleton-text"></p>
        <p class="skeleton skeleton-text"></p>
      </div>
    </div>
  {/if}
</div>
<style lang="postcss">
  :root {
    --color-gray: lch(84.999% 1.194 288.585);
    --color-gray-white: lch(95% 1.194 288.585);
  }

  .card {
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 0.75em;

    background: white;
    border-radius: 5px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.06), 
                0 4px 8px rgba(0,0,0,0.05), 
                0 8px 16px rgba(0,0,0,0.04),
                0 16px 32px rgba(0,0,0,0.03), 
                0 32px 64px rgba(0,0,0,0.02);

    padding: 1em 2em;

    position: relative;
  }

  .card:focus-within {
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.06), 
                0 4px 8px rgba(0,0,0,0.05), 
                0 8px 16px rgba(0,0,0,0.04),
                0 16px 32px rgba(0,0,0,0.03), 
                0 32px 64px rgba(0,0,0,0.02),
                0 0 0 3px var(--color-miku);
    transform: scale(1.035);
    transition: all 0.2s ease;
  }

  .info {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1em;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & p {
      margin: 0;
      margin-bottom: 0.5em;
    }
  }

  h3 {
    display: block;
    margin: 0;
  }

  .profile-image {
    height: 72px;
    width: 72px;
    border-radius: 100%;
    border: 1px solid #ccc;
  }

  .profile-image.failed {
    border-radius: 1em;
  }

  a:focus {
    outline: none;
  }

  /* Skeleton Loading Effect */
  @keyframes skeleton-loading {
    0% {
      background-color: var(--color-gray);
    }
    100% {
      background-color: var(--color-gray-white);
    }
  }

  @keyframes skeleton-shimmer {
    0% {
      background-position: -500px 0;
    }
    100% {
      background-position: 500px 0;
    }
  }

  .skeleton {
    opacity: 0.6;
    background: lch(84.999% 1.194 288.585);
    animation: skeleton-loading 1.5s linear infinite alternate;
    overflow: hidden;
    position: relative;
  }

  .skeleton::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    /* background-image: linear-gradient(to right, #d9d9d9 0%, rgba(0, 0, 0, 0.05) 20%, #d9d9d9 40%, #d9d9d9 100%); */
    background-image: linear-gradient(122deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 60%, rgba(0,0,0,0) 100%);
    background-repeat: no-repeat;
    background-size: 500px 500px;
    animation: skeleton-shimmer 5s linear infinite;
  }

  .skeleton.profile-image {
    height: 73px;
    width: 73px;
    border: none;
    /* border: 1px solid transparent; */
  }

  .skeleton-text {
    width: 100%;
    height: 1em;
    border-radius: 9999px;
  }
  
  p.skeleton {
    width: 12em;
    height: 1.4em;
  }

  .stat p.skeleton {
    /* margin: 1em 0; */
    margin-bottom: 1em;
  }

  .stat p.skeleton:nth-child(1) {
    margin-top: 0.5em;
  }
  
  h3.skeleton {
    height: 1.2em;
    margin-bottom: 0.5em;
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

  .tags button {
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
  
  .tags button:hover {
    background: color-mod(var(--color-aqua) alpha(0.1));
    box-shadow: 0 0 5px 1px color-mod(var(--color-aqua) alpha(0.1));
  }

  .tags button:focus-visible {
    outline: none;
    color: white;
    
    background: color-mod(var(--color-aqua) lightness(30%));
  }

  .tags button:focus-visible > * {
    filter: drop-shadow(0 0 0.5em white);
  }
</style>