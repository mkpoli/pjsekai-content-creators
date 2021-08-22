<script lang="ts">
  import moment from 'moment'
  moment.locale('ja')

  import type { YouTuber } from './data'
  
  export let youtuber: YouTuber
</script>

<div class="card">
  <h3>{youtuber.name}</h3>
  <div class="info">
    <a href={youtuber.link}>
      <img src={youtuber.imgUrl} alt={`${youtuber.name}のアイコン`}>
    </a>
    <div class="stat">
      <p>登録者数  {youtuber.subscribers || '（非表示）'}</p>
      <p>創設時間  {moment(youtuber.date).format('ll')}</p>
    </div>
  </div>
</div>

<style>
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
    /* margin: 1em; */
  }

  .info {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1em;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
  }

  p {
    margin: 0;
  }

  h3 {
    display: block;
    margin: 0;
  }

  img {
    height: 72px;
    width: 72px;
    border-radius: 100%;
    border: 1px solid #ccc;
  }
</style>