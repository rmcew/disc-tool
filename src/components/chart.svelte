<script lang="ts">
  import { Bar } from 'svelte-chartjs';
  import { Chart, Title, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  import ChartDataLabels from 'chartjs-plugin-datalabels';

  export let data
  
  const options = {
    responsive:true,
    plugins:{
      legend:{
        display: false
      },
      datalabels: {
        labels:{
          title:{
            font:{
              weight: 'bold',
              size: '17'
            }
          }
        },
        formatter: (value, context) => {
          function totalSum(total, dataPoint) {
            return total + dataPoint
          }
          const totalValue = data.reduce(totalSum, 0)
          const percentageValue = (value / totalValue * 100).toFixed(0)
          return `${percentageValue}%`
        }
      }
    }
  }


  const labels = ['DOMINANCE', 'INFLUENCE', 'STEADINESS', 'COMPLIANCE']
  const datasets = [
    {
      data,
      backgroundColor: [
        'rgba(0,112,192,0.4)',
        'rgba(255,192,0,0.4)',
        'rgba(112,173,71,0.4)',
        'rgba(255, 0, 0,0.4)',
      ],
      borderWidth: 2,
      borderColor: [
        'rgba(0,112,192, 1)',
        'rgba(255,192,0, 1)',
        'rgba(112,173,71, 1)',
        'rgba(255, 0, 0, 1)',
      ],
    },
  ]
  Chart.register(
    ChartDataLabels,
    Title,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );
</script>
<Bar data={{labels, datasets}} {options} />
