<script>
	import HandPiano from "./piano/hand-piano.svelte";
	import MobilePiano from "./piano/mobile-piano.svelte";
	import TopBar from "./ui/top-bar.svelte";
	import io from 'socket.io-client'
	import {onMount} from 'svelte'
	const mediaQuery = '@media (max-width: 640px)'
	
	let isMobile = window.matchMedia(mediaQuery).matches
	window.onresize = () => {
		isMobile = window.matchMedia(mediaQuery).matches 
		console.log(isMobile)
	}

	let currentState = 'home'

	const socket = io('http://localhost:3000')
	
	console.log(socket)
	
</script>

<main>
	
	<div class="desktop">
		{#if !isMobile}
			<TopBar />
			<HandPiano/>

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