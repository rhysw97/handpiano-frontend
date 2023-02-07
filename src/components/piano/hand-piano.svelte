<script lang="ts">
    import { onMount } from 'svelte';
    import { Piano } from './../../handpiano-scripts/piano'
    import {pianoSketch} from '../../handpiano-scripts/sketch'
    import p5 from 'p5'
    //giving values to empty p5 sketch properties
    let show = false;

    interface PianoP5 extends p5 {
        piano?: Piano,
    }
    const createSketch = () => {
        show = !show;
        if(show) {
            const pianoP5 : PianoP5= new p5(pianoSketch)
            pianoP5.piano = new Piano()
        }
    }

</script>

<div>
    <div class="p5-container" id="pianoContainer"></div>
    <p on:click={createSketch}>show</p>
   
</div>
  

<style>
    div {
        text-align: center;
    }
</style>