<script>
    const notes = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"]
    const noteELements = [];
    const synths = {}
    notes.forEach(note => {
        const synth = new Tone.PolySynth().toDestination();
        synths[note] = synth;
    })


    function playNote(event) {
        const note = event.target.id
        synths[note].triggerAttack(note)
    }

    function releaseNote(event) {
        const note = event.target.id
        synths[note].triggerRelease(note);
    }
</script>

<div class="piano">
    {#each notes as note}
        <div class="key" id={note} on:pointerdown={playNote} on:pointerup={releaseNote} on:mouseleave={releaseNote}>{note}</div>
    {/each}
</div>

<div class="portrait-message">
    <p>Please rotate your phone to play the piano</p>
</div>

<style>
    
    @media (orientation: portrait) {
        .piano {
            display: none;
        }

        .portrait-message {
            display: flex;
        }
    }

    @media (orientation: landscape) {
        .piano {
            display: flex;
            width: 100%;
            height: 100%;
            flex-direction: row;
            justify-content: space-evenly;
        }
        
        .piano div {
            flex-basis: calc(100% / 8);
            border: 1px solid black;
        }
        

        .portrait-message {
            display: none;
        }
    }
</style>