<script>
 import { page } from '$app/stores'
 import { wordSetStore } from '../../stores/wordSet';
 // @ts-ignore
 import languages from '$lib/languages.json'
 wordSetStore.set(languages[$page.params.slug])
</script>

{$page.params.slug}
{`words: ${JSON.stringify($wordSetStore)}`}