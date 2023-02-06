<script>
    import { onMount } from 'svelte';
    import { Piano } from './../../handpiano-scripts/piano'
    import {pianoSketch} from '../../handpiano-scripts/sketch'
    import * as p5 from 'p5';

    //giving values to empty p5 sketch properties
    let show = false;
    const createSketch = () => {
        show = !show;
        if(show) {
            const pianoP5= new p5(pianoSketch)
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