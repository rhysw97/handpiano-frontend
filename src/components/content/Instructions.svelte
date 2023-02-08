<div>
    <article class="about"> 
        <h2>About</h2>
        <p>This app is designed to allow a user to play a virtual piano created using <a target="_blank" rel ="noreferrer" href="https://p5js.org/">p5.js</a> and <a target="_blank" rel ="noreferrer" href="https://tonejs.github.io/">Tone JS</a> which can be controlled with your hand and a webcam powered by <a target="_blank" rel ="noreferrer" href="https://learn.ml5js.org/#/reference/handpose">handpose ml5</a></p>

        <p>
            If you choose multiplayer mode you will be able to connect with other people using the site and play together.
        </p>

        <p>
            There are many planned updates such as having settings to edit the sound of the synth as well as a chat function within rooms and even a more responsive piano for mobile.
        </p>
    </article>

    <article class="instructions">
        <h2>Instructions</h2>
        <div class="solo">
            <h3>Solo</h3>
            <ul>
                <li>Click Solo below</li>
                <li>Wait for handpose to load and once prompted click on the black rectangle</li>
                <li>Once the keys appear hold one hand up infront of the camera</li>
                <li>Green dots should appear tracking your hands movements which you can move to hover any key of the piano</li>
                <li>When a finger is over the desired key ben the top joint of the finger to play the note</li>
                <li>The note will release once finger either leaves the note or is straightened</li>
                <li>Note: the black notes do not work and are just for aesthetics</li>
                
            </ul>
        </div>
        <div class="multiplayer">
            <h3>Multiplayer</h3>
            <ul>
                <li>Click multiplayer below</li>
                <li>Enter your dersired name into the top input field</li>
                <li>Enter the id of the room you want to join. If no room with id entered exists then a new room will be created</li>
                <li>Click Join Room button</li>
                <li>Follow the steps under the solo section to use the piano </li>
            </ul>
        </div>
    </article>
</div>  

<style>
    .about {
        background-color: rgba(15, 15, 15, 0.95);
        color: white;
    }

    .instructions {
        background-color: white;
        color: black;
        padding-top: 5%;
    }

    .multiplayer {
        background-color: rgba(15, 15, 15, 0.95);
        color: white;
    }

    .about, .multiplayer, .solo {
        padding: 5% 15%;
    }

    
    h2, h3 {
        text-align: center;
    }

    h3 {
        padding-bottom: 20px;
    }

    a {
        color: white;
    }

    p, li {
        padding-bottom: 20px;
    }

    .multiplayer {
        margin-bottom: 40px;
    }

</style>