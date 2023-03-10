//script to handle a hand object using ml5 hand pose
export class Hand {
  constructor() {
    this.handpose;
    this.predictions = []; //stores predictions from handpose library
    this.fingers = {};
    //set to store fingers that are curled
    this.curledFingers = new Set()
    this.startMessage = "Hand Model Loading Please Wait"
  }

  //function to set up everything we need for handpose to work taking in width height and video 
  setupHandpose(width, height, video) {
   
      video.size(width, height);

      this.handpose = ml5.handpose(video, {flipHorizontal: true}, () => { 
      this.startMessage = "Click To Start" //changes tet in p5 sketch to click to start once handpose has loaded
      console.log('Model Ready')
    });

    console.log(this.handpose)

    this.getPredictions()
    video.hide(); //hides the video element so it isn't visible
  }

  //gets predictions from handpose to get x y and z coords of points on the hand
  getPredictions() {
      this.handpose.on("predict", results => {
      this.predictions = results;
    });
  }
  //takes in a single prediction and adds the ithe predicition at index 2 and 3 into an object at the key of the corresponding finger
  addPointsToFingers(prediction) {
      
      this.fingers['thumb'] = [prediction.thumb[2], prediction.thumb[3]];
      this.fingers['index'] = [prediction.indexFinger[2], prediction.indexFinger[3]];
      this.fingers['middle'] = [prediction.middleFinger[2], prediction.middleFinger[3]];
      this.fingers['ring'] = [prediction.ringFinger[2], prediction.ringFinger[3]]; 
      this.fingers['pinky'] = [prediction.pinky[2], prediction.pinky[3]];
  } 

  //function to draw points of hand to p5 canvas based on predictions given back by handpose
  draw(p) {
    //loops through each prediction
    for (let i = 0; i < this.predictions.length; i += 1) {
      const prediction = this.predictions[i].annotations;

      this.addPointsToFingers(prediction);

      for(let finger in this.fingers) {
        this.fingers[finger].forEach(joint => {
          p.fill(0, 255, 0);
          p.noStroke();
          p.ellipse(joint[0], joint[1], 10, 10)
        })
      }
    }
  }
 
  //checks if finger is in a playing position and updates areFingersCurled member accordingly
  checkFingerPositions() {
    for(let finger in this.fingers) {
      const fingerTopY = this.fingers[finger][0][1];
      const fingerBottomY = this.fingers[finger][1][1];

      if(fingerTopY - 10 <= fingerBottomY + 10) {
        this.curledFingers.add(finger)
      } else {
        this.curledFingers.delete(finger)
      }
    }
  }
}