<script lang='ts'>
  import List from '../../../components/list.svelte'
  import { wordSetStore } from '../../../stores/wordSet'
  import Results from '../../../components/results.svelte'
  import { page } from '$app/stores'
  let words, maxPageNumber
  async function fetchData() {
    const response = await fetch('../../../languages.json');
    const languageSet = await response.json();
    wordSetStore.set(languageSet[$page.params.slug])
    words = $wordSetStore.data[pageNumber].words.filter(word => word.rank === null)
    maxPageNumber = $wordSetStore.data.length
  }

  $:if ($wordSetStore) {
    words = $wordSetStore.data[pageNumber].words.filter(word => word.rank === null)
  }

  let pageNumber = 0
  let showResults = false
  let ready = false
  let items1, items2, items3, items4 = []

  function handleNext() {
    if (pageNumber === maxPageNumber-1){
      showResults = true
    }
    else {
      pageNumber++
      items1 = []
      items2 = []
      items3 = []
      items4 = []
    }
  }

  function handleReset() {
    wordSetStore.update((currentWordSets) => {
      const updatedWordSets = {...currentWordSets};
      updatedWordSets.data[pageNumber] = {
        set: updatedWordSets.data[pageNumber].set,
        words: updatedWordSets.data[pageNumber].words.map(word =>({
          ...word,
          rank: null
        })),
      };
      return updatedWordSets;
    });
    items1 = []
    items2 = []
    items3 = []
    items4 = []    
  }
  
</script>

{#await fetchData() then}
  {#if !showResults}
  <Results /> 

  <div class="available flex w-full">
    <List items={words} type='available' reset bind:ready />
    <div class="divider divider-horizontal"></div>
    <div class="flex flex-col w-full">
      <List items={items1} type='answer' testValue=3 bind:pageNumber placeholder="Very much"/>   
      <List items={items2} type='answer' testValue=2 bind:pageNumber placeholder="In most cases"/>   
      <List items={items3} type='answer' testValue=1 bind:pageNumber placeholder="A little bit"/>   
      <List items={items4} type='answer' testValue=0 bind:pageNumber placeholder="Not at all"/>
    </div>
  </div>

  <div class="flex justify-center space-x-2 mt-6">
    <button on:click={handleReset} class="btn btn-wide btn-secondary ">Reset</button>
    <button on:click={handleNext} class="btn btn-wide btn-primary {ready ? '': 'btn-disabled'}">Next</button>
  </div>

  {:else}
  <Results /> 
  showResult

  {/if}

{/await}

<style>

</style>