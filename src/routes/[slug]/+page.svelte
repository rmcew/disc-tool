<script lang="ts">
  import { page } from "$app/stores"
	import { onMount } from "svelte";
  import { base } from '$app/paths'
  const lang = $page.params.slug
  onMount(() => {
    const textDir = $page.params.slug === 'ar' ? 'rtl' : 'ltr'
    document.getElementById('main')?.setAttribute('lang', $page.params.slug)
    document.getElementById('main')?.setAttribute('dir', textDir)
  })
</script>


<div class="flex-none flex justify-center mx-5">
  <h1 class="text-3xl md:text-4xl">DISC Assessment Tool</h1>
</div>

<div class="flex-none sm:container sm:mx-auto mx-10">
  <p>
    This is a simple but powerful personality assessment based on the well-known DISC methodology. To complete the assessment, rank groups of words according to how they best match your view of yourself. This should take 10 minutes at most. After completing the assessment, you will receive immediate results. Bring these to the upcoming seminar, at which you will hear a full explanation of each personality type and learn how to be more effective within yours. See you at the seminar!
  </p>
</div>

<div class="flex-1 flex justify-center mt-6">
  <a href='{base}/{lang}/test' class="btn btn-wide"><span>Begin assessment</span></a>
</div>

