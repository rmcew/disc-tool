<script>
 import { page } from '$app/stores'
 import { wordSetStore } from '../../stores/wordSet';
 import languages from '../languages.json'
 wordSetStore.set(languages[$page.params.slug])
</script>

{$page.params.slug}
{languages[$page.params.slug].name}
{JSON.stringify(languages)}
{typeof languages}
{`words: ${JSON.stringify($wordSetStore)}`}