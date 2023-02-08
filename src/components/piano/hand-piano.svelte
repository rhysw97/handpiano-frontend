<script lang="ts">
    import { onMount } from 'svelte';
    import { Piano } from './../../handpiano-scripts/piano'
    import {pianoSketch} from '../../handpiano-scripts/sketch'

    //giving values to empty p5 sketch properties
    onMount(() => {
        const pianoP5= new p5(pianoSketch)
        pianoP5.piano = new Piano()
    })

</script>

<div class="container">
    <div class="p5-container" id="pianoContainer"></div>

   
</div>
  

<style>
    .container {
        padding-top: 40px;
    }
    div {
        text-align: center;
    }
</style>