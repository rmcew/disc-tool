<script lang="ts">
	import { onMount } from 'svelte/internal';
  import { base } from '$app/paths'
  let languages
  async function fetchData() {
      const response = await fetch(`${base}/languages/list.json`);
      languages = await response.json();
    }
    onMount(async () => {
      await fetchData()
    }) 
</script>

{#await fetchData() then}
  <div class="flex flex-row flex-wrap justify-center">
    {#each Object.entries(languages) as [lang, values]}
    <a href='{base}/{lang}' class="btn md:btn-md lg:btn-lg basis-1/4"><span lang={lang}>{values.name}</span></a>
    {/each}
  </div>
{/await}


<style>
  .btn {
    background-color: #46709f;
    margin: .3rem;
  }
</style>