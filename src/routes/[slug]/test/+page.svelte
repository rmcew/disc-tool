<script>
  import { page } from '$app/stores'
  import List from '../../../components/list.svelte'
  import { wordSetStore } from '../../../stores/wordSet'
  import { get } from 'svelte/store'
  import Results from '../../../components/results.svelte'
  let pageNumber = 0
  let showResults = false
  console.log($wordSetStore)
  const maxPageNumber = $wordSetStore.data.length
  let ready = false
  let items1, items2, items3, items4 = []
  $: words = get(wordSetStore).data[pageNumber].words

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
  
</script>

{#if !showResults}
<Results /> 

<div class="available flex w-full">
    <List items={words} type='available' reset bind:ready />
  <div class="divider divider-horizontal"></div>
  <div class="flex flex-col w-full">
    <List items={items1} type='answer' testValue=0 bind:pageNumber placeholder="Very much"/>   
    <List items={items2} type='answer' testValue=1 bind:pageNumber placeholder="In most cases"/>   
    <List items={items3} type='answer' testValue=2 bind:pageNumber placeholder="A little bit"/>   
    <List items={items4} type='answer' testValue=3 bind:pageNumber placeholder="Not at all"/>
  </div>
</div>

<div class="flex justify-center mt-6">
  <button on:click={handleNext} class="btn btn-wide {ready ? '': 'btn-disabled'}">Next</button>
</div>

{:else}
  showResults

{/if}
<style>

</style>