<script>
	import '../app.css';
  import { base } from '$app/paths'
  export const prerender = true;
  const logo = new URL('../images/glp-logo-head.png', import.meta.url).href
</script>
<div class="navbar h-30">
  <div class="navbar-start flex-grow">
    <img src={logo} alt='global leadership partners logo'/>
  </div>
  <div class="navbar-center flex-grow">
    <a href='{base}/' class="btn btn-ghost normal-case text-xl">DISC Assessment</a>
  </div>
  <div class="navbar-end flex-grow">
  </div>
</div>
<div class="container mx-auto">
<slot />
</div>

<style>
  .navbar {
    background-color: #00416b; 
    color: white;
    margin-bottom: 2rem;
  }
  img {
    max-width: 20vh;
  }
</style>