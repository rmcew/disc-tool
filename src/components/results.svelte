<script>
	import { scaleLinear, scaleBand } from 'd3-scale';
  import { slide } from 'svelte/transition';
	import { wordSetStore } from '../stores/wordSet'
	import { page } from '$app/stores'

	function calculateTotalPoints(store) {
		const points = [
			{ id: 0, trait: "Dominance", weight: 0 },
			{ id: 1, trait: "Influence", weight: 0 },
			{ id: 2, trait: "Steadiness", weight: 0 }, 
			{ id: 3, trait: "Conscientiousness", weight: 0 },
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
	$: console.log('totalPoints', totalPoints)
	let points = [
		{ id: 1, trait: "Dominance", weight: 28 },
		{ id: 2, trait: "Influence", weight: 22 },
		{ id: 3, trait: "Steadiness", weight: 15 }, 
		{ id: 4, trait: "Compliance", weight: 11 },
	];  
	 
$: traits = points.map(d => d.trait) 
	
	const xTicks = ["Dominance", "Influence", 'Steadiness', "Compliance"];
	const yTicks = [0, 5, 10, 15, 20, 25, 30];
	const padding = { top: 20, right: 15, bottom: 20, left: 25 };

	let width = 500;
	let height = 200; 

	function formatMobile(tick) {
		return "'" + tick.toString().slice(-2);
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
		font-size: .725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #4a4a4a;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #4a4a4a; 
		text-anchor: start;
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
</style> 
 
<div class="container mx-auto">
{totalPoints}
  <h1>Congratulations on completing the assessment!</h1>
  <p>Below you will find your unique combination for the personality profile.</p>
  <p>You are 28% Dominant</p>
  <p>You are type D. You probably already knew that. You like immediate results; you love action,
  and you accept any challenge. You are the type of person who makes decisions quickly and does
  not have much patience with those who are calm and do not know how to adapt easily. You like
  direct answers, you work focused, and you appreciate logical things. You are bored with long
  meetings and lots of talking. When you are in a group and a leader is needed, you are one of the
  few who want to take over. There are no problems to be afraid of, in fact, you are happy to
  solve anything</p>
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
			{#each points as point (point.trait)}  
				<g class="tick" transform="translate({xScale(point.trait)},{height})">   
					<text x="{barWidth/2}" y="-4">{width > 380 ? point.trait : formatMobile(point.trait)}</text>
				</g> 
			{/each} 
		</g> 
 
		<g class='bars'> 
			{#each points as point (point.trait)}  
				<rect
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
