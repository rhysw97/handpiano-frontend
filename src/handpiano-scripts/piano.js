class Key {
  constructor(x, y, width, height, note, colour) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.note = note
    this.colour = colour
    this.fingersOnNote = new Set();
    this.oscillator = new Tone.PolySynth().toDestination()
  }

  draw(p) {
    p.fill(255);
    p.stroke(0);
    p.rect(this.x, this.y, this.width, this.height);
  }

  detectFingers(fingers) {
    for(let finger in fingers) {
      const fingerX = fingers[finger][0][0]
      const fingerY = fingers[finger][0][1];
    
      //if statement to check if fingers top point is in the bounds of the key
      if( 
        fingerX - 10 > this.x && 
        fingerX + 10 < this.x + this.width &&
        fingerY - 10 > this.y &&
        fingerY + 10 < this.y + this.height
      ) {
        this.fingersOnNote.add(finger);
      } else {
        this.fingersOnNote.delete(finger);
      }
    }
  }
}
  
export class Piano {
  constructor() {
    this.keys = []
    this.notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C4']
    this.notesToPlay = new Set()
    this.notesPlaying = new Set()
    this.notesToRelease = new Set()
  }

  createKeys() {
    for(let i = 0; i < this.notes.length; i++) {
      let tempKey = new Key(i * 80, 0, 80, 480, this.notes[i], 'white')
      this.keys.push(tempKey);
    }
  }
  
  drawKeys(p) {
    this.keys.forEach(key => {
      key.draw(p)
    }) 
  }

  playNotes() {
    console.log(this.notesToPlay);
    if(this.notesToPlay.size > 0) {
      this.keys.forEach(key => {
        if(this.notesToPlay.has(key.note)) {
          key.oscillator.triggerAttack(key.note)
        }
      })
      this.notesPlaying = new Set(this.notesToPlay)
      this.notesToPlay.clear()
    }
  }

  releaseNotes() {
    if(this.notesToRelease.size > 0) {
      this.keys.forEach(key => {
        if(this.notesToRelease.has(key.note)) {
          //console.log('hello')
          key.oscillator.triggerRelease(key.note)
        }
      })
      this.notesToRelease.clear()
    }
  }

  checkNotesToPlay(curledFingers) {
    this.keys.forEach(key => {
      if(!this.notesPlaying.has(key.note)) {
        curledFingers.forEach(curledFinger => {
          if(key.fingersOnNote.has(curledFinger)) {
            this.notesToPlay.add(key.note);
          } 
        })
      }
    })
    this.playNotes()
  }

  checkNotesReleased(curledFingers) {
    this.keys.forEach(key => {
      let stopNote = true;
      if(this.notesPlaying.has(key.note)) {
        curledFingers.forEach(curledFinger => {
          if(key.fingersOnNote.has(curledFinger)) {
            stopNote = false;
          }
        })
      }
      
      if(stopNote) {
        this.notesPlaying.delete(key.note)
        this.notesToRelease.add(key.note)
      }
    })
    this.releaseNotes()
  } 
} 