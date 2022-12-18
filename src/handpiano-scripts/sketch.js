//setup function from P5

export const pianoSketch = (p) => {
  p.state = 'start'
  p.hand;
  p.piano;
  p.container;

  p.setup = () => {
    
    const canvas = p.createCanvas(640, 480);
    canvas.parent(p.container)

    const video = p.createCapture(p.VIDEO);

    p.hand.setupHandpose(p.width, p.height, video);

    // Hide the video element, and just show the canvas
    p.piano.createKeys()
  }

  p.draw = () => {
    //image(video, 0, 0, width, height);
    p.fill(0);
    p.rect(0, 0, 640, 480);

    switch(p.state) {
      case 'start':
        p.drawStart();
        break;

      case 'piano':
        p.drawPiano()
        console.log(p.piano.notesPlaying)
        break;

      default:
        console.log(`The state ${p.state} doesn't exist`)
        break;
    }
  }

  p.drawPiano = () => {
    p.piano.drawKeys(p)
    p.hand.draw(p);
    p.hand.checkFingerPositions()
  
    p.piano.keys.forEach(key => {
      key.detectFingers(p.hand.fingers)
    })
    p.piano.checkNotesToPlay(p.hand.curledFingers);
    p.piano.checkNotesReleased(p.hand.curledFingers);
  }

  p.drawStart = () => {
    p.fill(255)
    p.noStroke()
    p.textAlign(p.CENTER, p.CENTER)
    p.text(p.hand.startMessage, p.width/2, p.height/2)

    if(p.mouseIsPressed) {
      p.state = 'piano'
    }
  }
}