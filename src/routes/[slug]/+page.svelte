<script lang="ts">
  import { page } from "$app/stores"
	import { onMount } from "svelte";
  import { base } from '$app/paths'

  const lang = $page.params.slug
  let promise = fetchData()
  async function fetchData() {
    const response = await fetch(`${base}/languages/${lang}/intro.json`);
    return await response.json();
  }
  onMount(async () => {
    const textDir = $page.params.slug === 'ar' ? 'rtl' : 'ltr'
    document.getElementById('main')?.setAttribute('lang', lang)
    document.getElementById('main')?.setAttribute('dir', textDir)
  })
</script>

{#await promise then introData }
<div class="flex-none flex justify-center mx-5">
  <h1 class="text-3xl md:text-4xl">{introData.heading}</h1>
</div>

<div class="flex-none sm:container sm:mx-auto mx-10">
  <p>
    {introData.introduction}
  </p>
</div>

<div class="flex-1 flex justify-center mt-6">
  <a href='{base}/{lang}/test' class="btn btn-wide"><span>{introData.button}</span></a>
</div>
{/await}