//setup function from P5
import { Hand } from "./hand";

//p5 instance for piano sketch
export const pianoSketch = (p) => {
  p.state = 'start'
  p.hand = new Hand()
  p.piano
  p.container = 'pianoContainer';

  //creates canvas and makes it a child of the piano container then creates capture of users web cam to set up handPose
  p.setup = () => {
    const canvas = p.createCanvas(640, 480);
    
    canvas.parent('pianoContainer')
    
    const video = p.createCapture(p.VIDEO);
    //console.log(p.hand)
    p.hand.setupHandpose(p.width, p.height, video);
   // console.log(p.piano)
    // Hide the video element, and just show the canvas

  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  p.draw = () => {
  //  console.log(p.piano);
    //image(video, 0, 0, width, height);
    p.fill(0);
    p.rect(0, 0, 640, 480);
    //checks state of the canvas
    switch(p.state) {
      case 'start':
        p.drawStart();
        break;

      case 'piano':
        p.drawPiano()
        //console.log(p.piano.notesPlaying)
        break;

      default:
        console.log(`The state ${p.state} doesn't exist`)
        break;
    }
  }

  //draws keys and hand on sketch 
  p.drawPiano = () => {
    p.piano.drawKeys(p)
    p.hand.draw(p);
    p.hand.checkFingerPositions()
    
    //detects if there is a finger on the key
    p.piano.keys.forEach(key => {
      key.detectFingers(p.hand.fingers)
    })
    //checks if notes need to be played or released
    p.piano.checkNotesToPlay(p.hand.curledFingers);
    p.piano.checkNotesReleased(p.hand.curledFingers);
  }

  //function to show the start screen
  p.drawStart = () => {
    p.fill(255)
    p.noStroke()
    p.textAlign(p.CENTER, p.CENTER)
    p.text(p.hand.startMessage, p.width/2, p.height/2)
    //changes state to piano if clicked so the piano will show on the canvas
    if(p.mouseIsPressed) {
      p.state = 'piano'
    }
  }
}

