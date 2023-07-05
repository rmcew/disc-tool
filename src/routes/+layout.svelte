<script>
	import '../app.css';
  import { base } from '$app/paths'
  export const prerender = true;
  const logo = new URL('../images/glp-logo-head.png', import.meta.url).href
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // We listen to the resize event
  window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
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
<div class="container mx-auto flex flex-col pb-0.5">
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