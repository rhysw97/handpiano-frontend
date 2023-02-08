import {Piano} from './piano.js'
import io from 'socket.io-client'
import * as Tone from 'tone'

//class to create a piano to be used with socket io.
export class SocketPiano extends Piano {
    //takes in a name and id given by user
    constructor(name, id, callback) {
        super()
        this.io = io('wss://handpiano-backend.glitch.me/')
        this.callback = callback
        this.name = name
        this.id = id
        this.otherSynths= []
        this.connectToServer()
        this.createOtherSynths()
        this.handleData()
        this.socketNotesPlaying = new Set();
        
    }

    onMessage() {
      this.io.on(this.id, name=> {
        console.log(`${name}`)
        this.callback(name)
      } )
    }
    //adds synths to other synths array to be triggered by other clients using the socket piano
    createOtherSynths() {
        for (let i = 0; i < this.keys.length; i++) {
            this.otherSynths.push({ note: this.keys[i].note, synth: new Tone.PolySynth().toDestination})
        }
    }

    //connects socket piano to socket server
    connectToServer() {
        const socket = this.io.connect();
        if(this.id) {
            socket.emit('create', {id: this.id, name: this.name});
        }                                                                                                                                                                  
    }

    //function to handle data returned by socket IOand play or release notes on synths depending on which event has been triggered
    handleData() {
        //handle if notes need to be played
        this.io.on("notes-to-play", data => {
          console.log(data)
          this.otherSynths.forEach(synth => {
            for(let i = 0; i < data.length; i++){
              console.log(data[i])
              if(!this.socketNotesPlaying.has(data[i])) {
                this.socketNotesPlaying.add(data[i])
                
                if(synth.note === data[i]) {
                    console.log(data[i])
                    console.log(synth)
                    synth.synth.triggerAttack(data[i])
                }
              }
            }
          })
        })

        //handle if notes need to be released
        this.io.on("notes-to-release", data => {
    
            this.otherSynths.forEach(synth => {
                for(let i = 0; i < data.length; i++){
                  if(this.socketNotesPlaying.has(data[i])){
                    this.socketNotesPlaying.delete(data[i])
                    if(synth.note === data[i]) {
                      synth.synth.triggerRelease(data[i])
                    }
                  }
                }
            })
        })
    }
  
    playNotes() {
      this.onMessage()
      this.handleData()
      // console.log(this.notesToPlay);
       if(this.notesToPlay.size > 0) {
        
        //if playing notes send to the server the notes that need to be played to send to other clients that are connected
        this.io.emit('notes-to-play', [...this.notesToPlay])
         this.keys.forEach(key => {
            //if the current note is in the notesToPlay set then play the note
            if(this.notesToPlay.has(key.note)) {
              key.colour = 155
              key.oscillator.triggerAttack(key.note)
            }
         })
         //add each not to notesPlaying and clear notes to play Array
         this.notesToPlay.forEach(note => {
           this.notesPlaying.add(note)
         })
         this.notesToPlay.clear()
       }
     }
  
     //uses polymorphism to rewrite function to send the notes to release set to server if it has 1 or more elements in it
     releaseNotes() {
      if(this.notesToRelease.size > 0) {
        this.io.emit('notes-to-release', [...this.notesToRelease])
        this.keys.forEach(key => {
          if(this.notesToRelease.has(key.note)) {
            key.colour = 255
            //console.log('hello')
            key.oscillator.triggerRelease(key.note)
          }
        })
        this.notesToRelease.clear()
      }
    }
  }