<script>
	import { scaleLinear, scaleBand } from 'd3-scale';
  import { slide } from 'svelte/transition';
	import { wordSetStore } from '../stores/wordSet'
	import { onMount } from 'svelte';
	import { sortBy } from 'lodash'

	let html2pdf
	onMount(async () =>{
		if (window) {
			const module = await import ('html2pdf.js')
			html2pdf = module.default
		}
	})

	function calculateTotalPoints(store) {
		const points = [
			{ id: 0, trait: "Dominance", weight: 0, color: 'rgb(0, 112, 192)' },
			{ id: 1, trait: "Influence", weight: 0, color: 'rgb(255,192,0)' },
			{ id: 2, trait: "Steadiness", weight: 0, color: 'rgb(112,173,71)'}, 
			{ id: 3, trait: "Conscientiousness", weight: 0, color: 'red' },
		]
		store.data.map(page => {
			console.log('page', page)
			points[0] = {...points[0], weight: points[0].weight + page.words[0].rank}
			points[1] = {...points[1], weight: points[1].weight + page.words[1].rank}
			points[2] = {...points[2], weight: points[2].weight + page.words[2].rank}
			points[3] = {...points[3], weight: points[3].weight + page.words[3].rank}									
		})
		return points
	}
	$: totalPoints = calculateTotalPoints($wordSetStore) 
	$: sorted = sortBy(totalPoints, 'weight')
	$: traits = totalPoints.map(d => d.trait) 
	$: console.log(totalPoints)
	
	const xTicks = ["Dominance", "Influence", 'Steadiness', "Compliance"];
	const yTicks = [0, 10, 20, 30, 40, 50];
	const padding = { top: 20, right: 15, bottom: 20, left: 25 };

	let width = 500;
	let height = 200; 

	function formatMobile(tick) {
		return tick[0];
	} 
	
	$: xScale = scaleBand()
		.domain(traits)
		.range([padding.left, width - padding.right])
	  .padding(0.2);

	$: yScale = scaleLinear()
		.domain([0, Math.max.apply(null, yTicks)])
		.range([height - padding.bottom, padding.top]); 

	$: innerWidth = width - (padding.left + padding.right);
	$: barWidth = innerWidth / xTicks.length;
</script>

<style>

	h1 {
		text-align: center;
	}

	.chart {
		width: 100%;
		max-width: 70vw;
		margin: 10vh auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 200px;
	}

	.tick {
		font-family: Helvetica, Arial;
		font-weight: 200;
	}

	.tick line {
		stroke: #4a4a4a;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #4a4a4a; 
		text-anchor: start;
	} .dominance{
			fill: rgb(0, 112, 192);
	}
 
	.tick.tick-0 line {   
		stroke-dasharray: 0;
	} 
 
	.x-axis .tick text {   
		text-anchor: middle; 
	} 

	.bars rect {
   	transition: all 1s;
		fill: #4a4a4a; 
		stroke: none;   
		opacity: 0.65;
	}

	.results {
		text-align: center;
		padding-bottom: 3vh;
	}
</style> 
<div id='results'>
	<h1 class="text-3xl md:text-4xl">Congratulations on completing the assessment!</h1>

	<div class="container mx-auto results">
		<p>Your primary personality profile is: <span style='text-transform: uppercase; font-weight: 600; color: {sorted[3].color}'>{sorted[3].trait}</span></p>
		<p>Your secondary personality profile is: <span style='text-transform: uppercase; font-weight: 600; color: {sorted[2].color}'>{sorted[2].trait}</span></p>

	</div>
	<div class="container mx-auto">
		<p><span style='text-transform: uppercase; font-weight: 600; color:rgb(0,112,192)'>Dominance</span> profile solves challenges, drives action and results, and moves at a fast pace.</p>
		<p><span style='text-transform: uppercase; font-weight: 600; color:rgb(255,192,0)'>Influence</span> profile gains energy from people, interviews well, is enthusiastic, and prefers group participation.</p>
		<p><span style='text-transform: uppercase; font-weight: 600; color:rgb(112,173,71)'>Steadiness</span> profile is loyal, listens well, employs specialized skills, and uses a calm, steady approach.</p>
		<p><span style='text-transform: uppercase; font-weight: 600; color:red'>Compliance</span> profile follows standards, focuses on details, thinks analytically, and acts diplomatically. </p>
		<p>We are all a blend of the 4 personality types which combine to make each of us unique.	</p>
	</div>


	<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
		<svg>
			<!-- y axis -->
			<g class="axis y-axis" transform="translate(0,{padding.top})">
				{#each yTicks as tick}
					<g class="tick tick-{tick}" transform="translate(0, {yScale(tick) - padding.bottom})">
						<line x2="100%"></line> 
						<text y="-4">{tick}</text>
					</g>   
				{/each}   
			</g>  

			<!-- x axis -->    
			<g class="axis x-axis">
				{#each totalPoints as point (point.trait)}  
					<g class="tick text-md" transform="translate({xScale(point.trait)},{height})">   
						<text x="{barWidth/2}" y="-4">{width > 380 ? point.trait : formatMobile(point.trait)}</text>
					</g> 
				{/each} 
			</g> 
	
			<g class='bars'> 
				{#each totalPoints as point (point.trait)}  
					<rect style='fill: {point.color}' 
						x="{xScale(point.trait)}"
						y="{yScale(point.weight)}" 
						width="{barWidth - 4}" 
						height="{height - padding.bottom - yScale(point.weight)}"
						out:slide="{{duration: 1000}}"
					></rect> 
				{/each}
			</g>
		</svg>
	</div>
</div>
<div style='display: flex;margin: 0 auto;justify-content: center;'>
	<button on:click={() => html2pdf(document.getElementById('results'))} class="btn btn-wide btn-primary ">Download Results</button>
</div>
