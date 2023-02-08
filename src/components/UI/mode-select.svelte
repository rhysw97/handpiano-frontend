<script>
    import JoinRoom from './join-room.svelte'
    import { onMount } from 'svelte';
    import { Piano } from './../../handpiano-scripts/piano'
    import {pianoSketch} from '../../handpiano-scripts/sketch'
    import HandPiano from '../piano/hand-piano.svelte';
    import Instructions from '../content/Instructions.svelte';
     let mode = 'select'
     let pianoP5
//component handles start screen and allows user to select which mode they would like to use (Solo or Multiplayer)
     onMount(() =>  {
        if(mode === 'solo') {
            (console.log("wey"))
            pianoP5= new p5(pianoSketch)
            pianoP5.piano = new Piano()
        }
     })

    const modeSelect = event => {
        mode = event.target.getAttribute('data-mode');
    }
    

</script>
<div>
    {#if mode === 'select'}
        <Instructions></Instructions>
        <div class="version-select">
            <h2>Please Select version of Hand Piano</h2>
            <p>Multiplayer Mode will allow you to connect with other users via rooms so that you can play together whereas Solo will allow you to play on your own</p>
            <div class="options">
                <p data-mode='multiplayer' on:click={modeSelect}>Multiplayer Mode</p>
                <p data-mode='solo' on:click={modeSelect}>Solo Mode</p>
            </div>
        </div>

    {:else if mode === 'solo'}
        {#if window.innerWidth < 640} 
            <div class="mobile">
                <p>Please rotate your phone to landscape mode to use</p>
            </div>
        {:else}
            <HandPiano></HandPiano>
        {/if}

    {:else if mode === 'multiplayer'}
        <JoinRoom></JoinRoom>
    {/if}


</div>
<style>
    .p5-container {
        text-align: center;
    }
    .version-select {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: rgb(27, 27, 27);
        color: white;
        width: 70%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 20px;
        border-radius: 20px;
        padding: 20px;
        align-items: center;

    }
     .options {
        display: flex;
        flex-direction: column;
        padding: 40px;
        align-items: center;
    }

    .version-select p {
        padding: 20px 40px;
    }

    h2 {
        text-align: center;
        padding-bottom: 40px;

    }

    .options p, .button {
        width: 100%;
        text-align: center;
        padding: 20px;
        border: 1px solid white;
        margin-top: 20px;
        border-radius: 20px;
    }

    .options p:hover, .button:hover {
        width: 100%;
        text-align: center;
        padding: 20px;
        background-color: rgb(41, 41, 41);
        border: 1px solid rgb(83, 83, 83);
        margin-top: 20px;
        border-radius: 20px;
    }

    .button {
        box-shadow: 3px black;
    }

    .mobile {
        width: 100vw;
        height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .mobile p {
        padding: 20px 50px;
        text-align: center;
    }
</style>