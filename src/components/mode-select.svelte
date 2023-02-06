<script>
    import JoinRoom from './join-room.svelte'
    import HandPiano from "./piano/hand-piano.svelte";
     let mode = 'select'

     
    const modeSelect = event => {
        mode = event.target.getAttribute('data-mode');
    }
    

</script>
<div>
    {#if mode === 'select'}
        <div class="version-select">
            <h2>Please Select version of Hand Piano</h2>
            <p>Multiplayer Mode will allow you to connect with other users via rooms so that you can play together whereas Solo will allow you to play on your own</p>
            <div class="options">
                <p data-mode='multiplayer' on:click={modeSelect}>Multiplayer Mode</p>
                <p data-mode='solo' on:click={modeSelect}>Solo Mode</p>
            </div>
        </div>

    {:else if mode === 'solo'}
        <HandPiano></HandPiano>
        
        <p data-mode="select" on:click={modeSelect}></p>
        <p data-mode>Back</p>
    {:else if mode === 'multiplayer'}
        <JoinRoom></JoinRoom>
    {/if}


</div>
<style>
    .version-select {
        background-color: rgb(27, 27, 27);
        color: white;
        width: 70%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 20px;
        border-radius: 20px;
        padding: 20px;

    }
     .options {
        margin: 0 auto;
     }

    h2 {
        text-align: center;
    }

    .options p {
        width: 100%;
        text-align: center;
        padding: 20px;
        border: 1px solid white;
        margin-top: 20px;
        border-radius: 20px;
    }
</style>