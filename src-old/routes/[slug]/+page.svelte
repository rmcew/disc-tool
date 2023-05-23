<script>
 import { page } from '$app/stores'
 import { wordSetStore } from '../../stores/wordSet';
 import languages from '../languages.json'
 let invalidUrl = false
 if (languages[$page.params.slug]){
     wordSetStore.set(languages[$page.params.slug])
 }
 else {
    invalidUrl = true
 }
</script>


{$page.params.slug}
{languages[$page.params.slug].name}
{JSON.stringify(languages)}
{typeof languages}
{`words: ${JSON.stringify($wordSetStore)}`}