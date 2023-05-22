<script>
 import { page } from '$app/stores'
 import { wordSetStore } from '../../stores/wordSet';
</script>

{$page.params.slug}
{`words: ${JSON.stringify($wordSetStore)}`}