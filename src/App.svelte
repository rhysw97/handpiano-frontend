<script>
	import HandPiano from "./components/piano/hand-piano.svelte";
	import MobilePiano from "./components/piano/mobile-piano.svelte";
	import TopBar from "./components/ui/top-bar.svelte";
	
	const mediaQuery = '@media (max-width: 640px)'
	
	let isMobile = window.matchMedia(mediaQuery).matches
	window.onresize = () => {
		isMobile = window.matchMedia(mediaQuery).matches 
		console.log(isMobile)
	}
	
</script>

<main>
	
	
	<div class="desktop">
		{#if !isMobile}
			<TopBar />
			<HandPiano />

		{/if}
	</div>
	<div class="mobile">
		<MobilePiano />
	</div>


</main>

<style>
	


	.desktop {
		display: block;
	}

	.mobile {
		display: none;
	}

	@media (max-width: 640px) {
		.mobile {
			display: block;
			width: 100vw;
			height: 100vh;
		}

		.desktop {
			display: none;
		}
	}

	
</style>