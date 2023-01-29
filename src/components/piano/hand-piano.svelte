<script>
    import {Hand} from '../../handpiano-scripts/hand'
    import {Piano} from '../../handpiano-scripts/piano'
    import {pianoSketch} from '../../handpiano-scripts/sketch'
    
    const pianoScreen = new p5(pianoSketch)
    
    //giving values to empty p5 sketch properties
    pianoScreen.hand = new Hand();
    pianoScreen.piano = new Piano();
    pianoScreen.container = 'pianoContainer'
</script>

<div>
    <div class="p5-container" id="pianoContainer"></div>
</div>


<style>
    div {
        text-align: center;
    }
</style>