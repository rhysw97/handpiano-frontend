import {Piano} from './piano.js'
import io from 'socket.io-client'
import * as Tone from 'tone'

export class SocketPiano extends Piano {
 
    constructor(name, id) {
        super()
        this.io = io('http://localhost:3000')
        this.name = name
        this.id = id
        this.otherSynths= []
        this.connectToServer()
        this.createOtherSynths()
        this.handleData()
    

    }

    createOtherSynths() {
        for (let i = 0; i < this.keys.length; i++) {
            this.otherSynths.push({ note: this.keys[i].note, synth: new Tone.PolySynth()})
        }
    }

    connectToServer() {
        const socket = this.io.connect();
        if(this.id) {
            socket.emit('create', {id: this.id, name: this.name});
        }
        console.log(this.id)
    }

    handleData() {
        this.io.on("notes-to-play", data => {
            this.otherSynths.forEach(synth => {
                for(let i = 0; i < data.length; i++){
                    if(synth.note === data[i]) {
                        synth.synth.triggerAttack(data[i])
                    }
                }
              
            })
            console.log("hello")
        })

        this.io.on("notes-to-release", data => {
            this.otherSynths.forEach(synth => {
                for(let i = 0; i < data.length; i++){
                    if(synth.note === data[i]) {
                        synth.synth.triggerRelease(data[i])
                    }
                }
            })
        })
    }
  
    playNotes() {
      // console.log(this.notesToPlay);
       if(this.notesToPlay.size > 0) {
        

        this.io.emit('notes-to-play', this.notesToPlay)
         this.keys.forEach(key => {
           if(this.notesToPlay.has(key.note)) {
             key.oscillator.triggerAttack(key.note)
           }
         })
         this.notesToPlay.forEach(note => {
           this.notesPlaying.add(note)
         })
         this.notesToPlay.clear()
       }
     }
  
     //uses polymorphism to rewrite function to send the notes to release set to server if it has 1 or more elements in it
     releaseNotes() {
      if(this.notesToRelease.size > 0) {
        this.io.emit('notes-to-release', this.notesToRelease)
        this.keys.forEach(key => {
          if(this.notesToRelease.has(key.note)) {
            //console.log('hello')
            key.oscillator.triggerRelease(key.note)
          }
        })
        this.notesToRelease.clear()
      }
    }
  }