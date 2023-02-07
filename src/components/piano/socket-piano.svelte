<script lang="ts">
    import {Hand} from '../../handpiano-scripts/hand'
    import {SocketPiano} from '../../handpiano-scripts/socket-piano'
    import {pianoSketch} from '../../handpiano-scripts/sketch'
    import { onMount } from 'svelte'
    export let id;
    export let name;
    import p5 from 'p5'
    interface PianoSketch extends p5 {
        piano?: SocketPiano
    }

    onMount (() => {
        console.log(document.getElementById("pianoContainer"))
        let piano = new SocketPiano(name, id);
       // console.log(piano)
        const pianoScreen : PianoSketch = new p5(pianoSketch)
        pianoScreen.piano = piano
       // console.log(pianoScreen.piano)
    //giving values to empty p5 sketch properties
    //pianoScreen.piano = new SocketPiano()
    
    })
</script>

<div>
    <div class="p5-container" id="pianoContainer"></div>
    
</div>


<style>
    div {
        text-align: center;
    }
</style>