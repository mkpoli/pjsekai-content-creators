<script lang="ts">
  import moment from 'moment'
  import youtubeFail from '../assets/youtube_fail.png'

  moment.locale('ja')

  import type { YouTuber } from './data'
  
  export let youtuber: YouTuber | null = null
  export let skeleton: boolean = false

  let failed: boolean = false
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

  /* a:focus .profile-image {
    box-shadow: 0 0 0 3px var(--color-text-main);
  }
   */

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
</style>