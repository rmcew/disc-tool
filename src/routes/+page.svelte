


<script lang="ts">
 import languages from '../languages.json';
 import {wordSetStore} from '../stores/wordSet.ts'
</script>


<div class="flex flex-row justify-around">
  {#each Object.entries(languages) as [lang, values]}
  <a href='/en' class="btn md:btn-md lg:btn-lg basis-1/4"><span lang={lang}>{values.name}</span></a>
  {/each}
</div>

<style>
  .btn {
    background-color: #46709f
  }
  .container {
    padding-top: 10vh;
	}
</style>