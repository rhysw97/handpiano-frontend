<script>
	import Handpiano from "./components/handpiano.svelte";
</script>

<main>
	<h1>Hand Piano</h1>
	<Handpiano />
</main>

<style>
	
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	
</style>