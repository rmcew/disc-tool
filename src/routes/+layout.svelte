<script>
	import '../app.css';
  export const prerender = true;
  const logo = new URL('../images/glp-logo-head.png', import.meta.url).href
</script>
<div class="navbar h-30">
  <div class="navbar-start">
    <img src={logo} alt='global leadership partners logo'/>
  </div>
  <div class="navbar-center">
    <a href='/' class="btn btn-ghost normal-case text-xl">DISC Assessment</a>
  </div>
  <div class="navbar-end">
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