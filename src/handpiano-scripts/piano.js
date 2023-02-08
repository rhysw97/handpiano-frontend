import * as Tone from 'tone'
//class to handle the canvas key
class Key {
  //constructor takes in x and y coordinate for key to be drawn at as well as the height and colour and the note that will be assigned to it
  constructor(x, y, width, height, note, colour) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.note = note
    this.colour = colour
    this.playing = false
    this.fingersOnNote = new Set();
    this.oscillator = new Tone.PolySynth().toDestination()
  }

  //draws white rectangle to canvas
  draw(p) {
    p.fill(this.colour);
    p.stroke(0);
    p.rect(this.x, this.y, this.width, this.height);
    p.fill(0)

    //checks the key's note and draws smaller black rectangle where needed to make look like a real piano
    if(
      this.note[0] === 'C' || 
      this.note[0] === 'D' ||
      this.note[0] === 'F' ||
      this.note[0] === 'G' ||
      this.note[0] === 'A' 
    ) {
      p.rect(this.x + this.width - 25, 0, 25, 250, 2, 0, 0, 0)
    }

    if(
      this.note[0] === 'D' ||
      this.note[0] === 'E' ||
      this.note[0] === 'G' ||
      this.note[0] === 'A' ||
      this.note[0] === 'B'
    ) {
      p.rect(this.x, 0, 25, 250, 0, 0, 0, 5)
    }
    
   // p.rect(this.x + this.width - 10, 0, 10, 250, 2, 0, 0, 0)
    
  }
//checks if finger is on key and is added to fingersOnNote set if it is
//if it isn't then it is deleted from fingersOnNote set.
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

//class for whole piano
export class Piano {
  constructor() {
    this.keys = []
    this.notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
    this.notesToPlay = new Set()
    this.notesPlaying = new Set()
    this.notesToRelease = new Set()
    this.createKeys()
  }

  //function to create key objects and add them to piano's keys array
  createKeys() {
    for(let i = 0; i < this.notes.length; i++) {

      //passes in x, y, width and height of the key as well as the note and colour
      let tempKey = new Key(i * 80, 0, 80, 480, this.notes[i], 255)
      this.keys.push(tempKey);
    }
  }
  
  //function to draw the pianos keys to the canvas by calling each key in this.keys' draw method
  drawKeys(p) {
    this.keys.forEach(key => {
      key.draw(p)
    }) 
  }

  //loops through each note in notes to play and 
  playNotes() {
   // console.log(this.notesToPlay);
    if(this.notesToPlay.size > 0) {
      this.keys.forEach(key => {
      
        if(this.notesToPlay.has(key.note)) {
          key.colour = 155
          key.oscillator.triggerAttack(key.note)
        }
      })
      this.notesToPlay.forEach(note => {
        this.notesPlaying.add(note)
      })
      this.notesToPlay.clear()
    }
  }

  //function that loops through each not in notes to release set and then triggers release on that notes oscillator
  releaseNotes() {
    if(this.notesToRelease.size > 0) {
      this.keys.forEach(key => {
        key.colour = 255
        if(this.notesToRelease.has(key.note)) {
          //console.log('hello')
          key.oscillator.triggerRelease(key.note)
        }
      })
      
      this.notesToRelease.clear()
    }
  }


  //finds which notes fingers are curled on to check if it should be added to the notesToPlay set.
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
    //loops through each key of piano and checks if it is the notes playing set
    this.keys.forEach(key => {
      let stopNote = true; //stop note is true by default as will only be true if it meets requirements
      if(this.notesPlaying.has(key.note)) {
        //if key's note is in the notes playing array then loop through each curled finger and check if it is on the key
        curledFingers.forEach(curledFinger => {
          if(key.fingersOnNote.has(curledFinger)) {
            //if it is on note then stop note is set to false to carry on
            stopNote = false;
          }
        })
      }
      
      //if note is stopped then delete the note from notes playing set and add to notesToRelease set
      if(stopNote) {
        this.notesPlaying.delete(key.note)
        this.notesToRelease.add(key.note)
      }
    })
    this.releaseNotes() //calls the release notes function
  } 

  
} 

