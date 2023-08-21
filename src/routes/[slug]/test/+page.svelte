<script lang='ts'>
  import List from '../../../components/list.svelte'
  import { wordGroupsStore } from '../../../stores/wordSet'
  import Results from '../../../components/results.svelte'
  import { page } from '$app/stores'
  import { base } from '$app/paths'

  const lang = $page.params.slug
  let resultsLanguagePromise = fetchResultsLanguage()
  async function fetchResultsLanguage() {
    const response = await fetch(`${base}/languages/${lang}/results.json`);
    return await response.json();
  }

  let words, maxPageNumber, options, ready, testLanguage
  async function fetchData() {
    const testLanguageResponse = await fetch(`${base}/languages/${lang}/test.json`)
    testLanguage = await testLanguageResponse.json();
    const response = await fetch(`${base}/languages/${$page.params.slug}/wordGroups.json`)
    const parsed = await response.json();
    wordGroupsStore.set(parsed.wordGroups)
    words = $wordGroupsStore[pageNumber].words.filter(word => word.rank === null)
    maxPageNumber = $wordGroupsStore.length
    options = {
      first: words[0],
      second: words[1],
      third: words[2],
      fourth: words[3]
    }    
  }


  $:if ($wordGroupsStore) {
    words = $wordGroupsStore[pageNumber].words.filter(word => word.rank === null)
  }

  let pageNumber = 0
  let showResults = false
  let items1 = [], items2 = [], items3 = [], items4 = []

  $: ready = !$wordGroupsStore?.[pageNumber]?.words.some(word => word.rank === null)
  $: progress = pageNumber / maxPageNumber * 100

  function handleNext() {
    if (pageNumber === maxPageNumber-1){
      showResults = true
    }
    else {
      pageNumber++
      options = {
        first: $wordGroupsStore[pageNumber].words[0],
        second: $wordGroupsStore[pageNumber].words[1],
        third: $wordGroupsStore[pageNumber].words[2],
        fourth: $wordGroupsStore[pageNumber].words[3]
      }      
      items1 = []
      items2 = []
      items3 = []
      items4 = []
    }
  }

  function handleReset() {
    wordGroupsStore.update((currentWordGroups) => {
      const updatedWordSets = {...currentWordGroups};
      updatedWordSets[pageNumber] = {
        set: updatedWordSets[pageNumber].set,
        words: updatedWordSets[pageNumber].words.map(word =>({
          ...word,
          rank: null
        })),
      };
      return updatedWordSets;
    });
    words = $wordGroupsStore[pageNumber].words.filter(word => word.rank === null)
    options = {
      first: words[0],
      second: words[1],
      third: words[2],
      fourth: words[3]
    }  
    items1 = []
    items2 = []
    items3 = []
    items4 = []    
  }
  
</script>

{#await fetchData() then}
  {#if !showResults}
  <div class="flex-none sm:container sm:mx-auto mx-10" style="text-align: center">
    <p>
      Drag and drop the words on the left into a ranked order on the right that most closely fits your view of yourself.
    </p>
  </div>  
  <div class="available flex w-full h-50 pb-3">
    <div class="flex flex-col w-full">
      <List items={[options.first]} bind:pageNumber />   
      <List items={[options.second]} bind:pageNumber />   
      <List items={[options.third]} bind:pageNumber />   
      <List items={[options.fourth]} bind:pageNumber />   
    </div>
    <div class="divider divider-horizontal"></div>
    <div class="flex flex-col w-full">
      <List items={items1} testValue=3 bind:pageNumber placeholder={testLanguage.scale[0]}/>   
      <List items={items2} testValue=2 bind:pageNumber placeholder={testLanguage.scale[1]}/>
      <List items={items3} testValue=1 bind:pageNumber placeholder={testLanguage.scale[2]}/>   
      <List items={items4} testValue=0 bind:pageNumber placeholder={testLanguage.scale[3]}/>
    </div>
  </div>
  <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
    <div class="bg-yellow-500 h-2.5 rounded-full" style="width: {progress}%"></div>
  </div>
  <div class="flex justify-evenly space-x-2 mt-1">
    <button on:click={handleReset} class="btn md:btn-wide btn-secondary">{testLanguage.resetButton}</button>
    <button on:click={handleNext} class="btn md:btn-wide btn-primary {ready ? '': 'btn-disabled'}">{testLanguage.nextButton}</button>
  </div>
  {:else}
  {#await resultsLanguagePromise then resultsLanguage}
    <Results {resultsLanguage} /> 
  {/await}
  {/if}
{/await}
