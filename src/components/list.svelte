<style>
	.answer.answer .rounded-box {
		margin: 0;
	}
	.rounded-box {
		margin: 0.2em;
		padding: 0.3em;
	}

	.available {
		height: 100%;
		width: 100%;
		text-align: center;
		border: 1px solid black;
		min-height: 13vh;
	}

	.answer {
		text-align: center;
		border: 1px solid black;
		margin: 0.2em;
		padding: 0.3em;
		height: 3rem;
	}
</style>
<script>
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { wordSetStore } from '../stores/wordSet'
	const flipDurationMs = 100;
	
	export let items = [];
	export let type;
	export let ready
	export let placeholder
	export let testValue
	export let pageNumber
	

	const MAX_ALLOWED = type === 'available' ? 4 : 1;
	$: dropFromOthersDisabled = (items.length === MAX_ALLOWED); 
	$: ready = items.length === 0

	const updateWordRank = (pageNumber, wordId, newRank) => {
		if (pageNumber, wordId, newRank) {
			wordSetStore.update(sets => {
				const wordIndex = sets.data[pageNumber].words.findIndex(word => word.id === wordId);
				if(wordIndex > -1) {
					console.log ('setting ', sets.data[pageNumber].words[wordIndex].word, 'to ', newRank)
					sets.data[pageNumber].words[wordIndex].rank = Number(newRank);
					console.log(typeof newRank)
				}
			return sets; // return the updated store
			});
		}
	}

	function handleConsider(e) {
		items = e.detail.items;
	}

	function handleFinalize(e) {
		items = e.detail.items;
		updateWordRank(pageNumber, e.detail.items[0].id, testValue)
	}	

</script>

 <div class="flex flex-col justify-evenly w-full place-items-center {type}" use:dndzone={{items, flipDurationMs, dropFromOthersDisabled}} on:consider={handleConsider} on:finalize={handleFinalize}>
  {#if !items.length && type === 'answer'}
		<span style="text-align:left; color: grey">{placeholder}</span>
	{/if}
  {#each items as item(item.id)}
    <div class="rounded-box" style={'background-color:#3e5387; color: white'} animate:flip={{duration:flipDurationMs}}>
      {item.word}	
    </div>
  {/each}
</div>

