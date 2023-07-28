<script lang='ts'>
  import List from '../../../components/list.svelte'
  import { wordSetStore } from '../../../stores/wordSet'
  import Results from '../../../components/results.svelte'
  import { page } from '$app/stores'
  import { base } from '$app/paths'

  let words, maxPageNumber, options, ready
  async function fetchData() {
    const response = await fetch(`${base}/languages.json`);
    const languageSet = await response.json();
    wordSetStore.set(languageSet[$page.params.slug])
    words = $wordSetStore.data[pageNumber].words.filter(word => word.rank === null)
    maxPageNumber = $wordSetStore.data.length
    options = {
      first: words[0],
      second: words[1],
      third: words[2],
      fourth: words[3]
    }    
  }


  $:if ($wordSetStore) {
    words = $wordSetStore.data[pageNumber].words.filter(word => word.rank === null)
  }

  let pageNumber = 0
  let showResults = false
  let items1 = [], items2 = [], items3 = [], items4 = []

  $: ready = !$wordSetStore?.data[pageNumber]?.words.some(word => word.rank === null)
  $: progress = pageNumber / maxPageNumber * 100

  function handleNext() {
    if (pageNumber === maxPageNumber-1){
      showResults = true
    }
    else {
      pageNumber++
      options = {
        first: $wordSetStore.data[pageNumber].words[0],
        second: $wordSetStore.data[pageNumber].words[1],
        third: $wordSetStore.data[pageNumber].words[2],
        fourth: $wordSetStore.data[pageNumber].words[3]
      }      
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
    words = $wordSetStore.data[pageNumber].words.filter(word => word.rank === null)
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

    <Results /> 
{/await}
