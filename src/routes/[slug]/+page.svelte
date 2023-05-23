<script>
  import { page } from '$app/stores'
  import List from '../../components/list.svelte'
  import languages from '../../languages.json';
  import { wordSetStore } from '../../stores/wordSet'

  wordSetStore.set(languages[$page.params.slug])
</script>

<div class="flex justify-center m-5">
  <h1>DISC Assessment Tool</h1>
</div>

<div class="sm:container sm:mx-auto m-10">
  <p>DISC is the most relevant personality test used in the professional environment. Dominant,
  Influential, Stable and Conscientious. It is important to know that no human being has only one
  profile. Each individual is a unique combination of percentages of each. At the end of the test,
  you will find out what your unique combination is!</p>
</div>

<div class="flex justify-center mt-6">
  <a href='/en/test' class="btn btn-wide"><span>Begin assessment</span></a>
</div>

