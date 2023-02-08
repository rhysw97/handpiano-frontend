<script lang="ts">
    import {Hand} from '../../handpiano-scripts/hand'
    import {SocketPiano} from '../../handpiano-scripts/socket-piano'
    import {pianoSketch} from '../../handpiano-scripts/sketch'
    import { onMount } from 'svelte'
    export let id;
    export let name;
    let names = new Set(name)
    let nameElements;
    
  
    onMount (() => {
        console.log(document.getElementById("pianoContainer"))
        let piano = new SocketPiano(name, id, (otherNames) => {
            nameElements = [... otherNames.json()]
            console.log(nameElements)
            
        });
       // console.log(piano)
        const pianoScreen = new p5(pianoSketch)
        pianoScreen.piano = piano
       // console.log(pianoScreen.piano)
    //giving values to empty p5 sketch properties
    //pianoScreen.piano = new SocketPiano()
    
    })
</script>
<div>
    <div class="mobile"><p>Please Rotate your screen to use the piano</p></div>
    <div class="sketch">
        <div class="p5-container" id="pianoContainer"></div>
        <div class="names">
            <h2>Making Music With:</h2>
            <ul>
                {#each nameElements as name}
                    <li>{name}</li>
                {/each}
            </ul>
        </div>
    </div>
</div>


<style>
    ul {
        list-style: none;
    }
    div {
        text-align: center;
    }

    .sketch {
        padding-top: 40px;
    }

    .mobile {
        display: none
    }
    @media(max-width: 820px) {
        .p5-container canvas {
            width: 100vw;
            height: 80vh;
        }
    }

    @media (max-width: 550px) {
        .sketch {
            display: none;
        }

        .mobile {
            display: flex;
            width: 100wv;
            height: 90vh;
            justify-content: center;
            align-items: center;

        }

    }



    
</style>