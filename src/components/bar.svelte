<script>
  export let value;
  export let max;
  export let barColor;
  
  const width = value / max * 100 + "%";
  const style = `background-color: ${barColor}; width: ${width};`;
</script>

<div class="bar" style={style}></div>

<style>
  .bar {
    height: 20px;
    margin-bottom: 10px;
  }
</style>
