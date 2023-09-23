<script>
	import { wordGroupsStore } from '../stores/wordSet'
	import { onMount } from 'svelte';
	import { orderBy } from 'lodash'
	import Chart from './chart.svelte';

	export let resultsLanguage

	let html2pdf
	onMount(async () =>{
		if (window) {
			const module = await import ('html2pdf.js')
			html2pdf = module.default
		}
	})

	async function saveScreenshot() {
		var element = document.getElementById("results");
		var opt = {	
			margin:       0,
			filename:     'myfile.pdf',
			image:        { type: 'jpeg', quality: 0.98 },
			html2canvas:  {
					scale: 2,           // higher quality
					windowWidth: 1024   // simulate a browser size that causes the page's responsive CSS to output a pleasing layout in the rendered PDF
    	},
    	jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
		};
		html2pdf().set(opt).from(element).outputPdf().save();
	}

	async function calculatepoints(store) {
		console.log('store', store)
		const points = [
			{ id: 0, trait: resultsLanguage.attributes[0].name, weight: 0, color: resultsLanguage.attributes[0].color },
			{ id: 1, trait: resultsLanguage.attributes[1].name, weight: 0, color: resultsLanguage.attributes[1].color },
			{ id: 2, trait: resultsLanguage.attributes[2].name, weight: 0, color: resultsLanguage.attributes[2].color}, 
			{ id: 3, trait: resultsLanguage.attributes[3].name, weight: 0, color: resultsLanguage.attributes[3].color },
		]
		
		store.map(page => {
			points[0] = {...points[0], weight: points[0].weight + page.words[0].rank}
			points[1] = {...points[1], weight: points[1].weight + page.words[1].rank}
			points[2] = {...points[2], weight: points[2].weight + page.words[2].rank}
			points[3] = {...points[3], weight: points[3].weight + page.words[3].rank}									
		})
		return {points, sortedPoints: orderBy(points, 'weight', 'desc')}
	}
</script>


{#await calculatepoints($wordGroupsStore) then {points, sortedPoints} }
<div id='results'>
	<h1 class="text-3xl md:text-4xl">{resultsLanguage.heading}</h1>

	<div class="container mx-auto results">
		<p>{resultsLanguage.primaryText}: <span style='text-transform: uppercase; font-weight: 600; color: {sortedPoints[0].color}'>{sortedPoints[0].trait}</span></p>
		<p>{resultsLanguage.secondaryText}: <span style='text-transform: uppercase; font-weight: 600; color: {sortedPoints[1].color}'>{sortedPoints[1].trait}</span></p>

	</div>
	<div class="container mx-auto" style="max-width:900px">
	{#each resultsLanguage.attributes as attribute}
		<p><span style='text-transform: uppercase; font-weight: 600; color:{attribute.color}'>{attribute.name}</span> - {attribute.definition}</p>
	{/each}
		<p>{resultsLanguage.descriptionText}</p>
		<Chart {resultsLanguage} data={points.map(points => points.weight)} />
	</div>
</div>
<div style='display: flex;margin: 0 auto;justify-content: center; margin-top: 2rem'>
	<button on:click={() => saveScreenshot()} class="btn btn-wide btn-primary ">{resultsLanguage.button}</button>
</div>
{/await}


<style>
	h1 {
		text-align: center;
	}

	.results {
		text-align: center;
		padding-bottom: 3vh;
	}
</style> 