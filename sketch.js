// TO ADD
// -- 'laggy' video so you can see yourself
// -- start capture button also visualized
//

let timePoints = []
var joints = [  "SPINEBASE", "SPINEMID", "NECK", "HEAD", "SHOULDERLEFT", "ELBOWLEFT",
                "WRISTLEFT", "HANDLEFT", "SHOULDERRIGHT", "ELBOWRIGHT", "WRISTRIGHT",
                "HANDRIGHT", "HIPLEFT", "KNEELEFT", "ANKLELEFT", "FOOTLEFT", "HIPRIGHT",
                "KNEERIGHT", "ANKLERIGHT",  "FOOTRIGHT","SPINESHOULDER",  "HANDTIPLEFT",
                "THUMBLEFT", "HANDTIPRIGHT", "THUMBRIGHT"]

let data = {}; // Global object to hold results from the loadJSON call
// let positions = [];
let positions1 = [];
let positions2 = [];
// let amplitudes = []
let times = [];
let timesAdj = [];
let dataLoaded = false;
let dataGot = false
let count;
let min = 20;
let max = 300;
let tPrev = 0;
let dataFiles = [];
let selectedValue;
let selectedFile;
let dataFilesMade = false
let line1
let line2
let axis;
let axisChoice;
let axes = ['depthX','depthY','cameraZ']
let l1Data;
let l2Data;
let overlap;


// preload initial data set
function preload() {
  let kinectronData = loadJSON("libraries/kinectron.json")
  makeDropDown(skeletonFiles, "selectBox")
}
// call back to proceed with data visualization
function loadData(data) {
  // console.log(data)
  dataLoaded = true
}

function setup() {
  makeSubDrop(joints,"jointBoxY1")
  makeSubDrop(joints,"jointBoxY2")
  createCanvas(window.innerWidth, 400);
  background(0)
  colorMode(HSB)
  textSize(18)
}
//
function draw() {
  background(0)
  drawLines()
  drawTimeline()
  checkPoints()

  console.log(timePoints.length)
}

function checkPoints(){
  timePoints.forEach( point => {
  point.display()
  point.checkDist()
  })
  timePoints = []
}

function getDataPoints(line1,line2){
// create graph from data & evaluate avg delta T
  if (dataLoaded = true) {
    count = Object.keys(data).length;
    let tMax = data[count - 1].record_timestamp
    positions1 = []
    positions2 = []
    timesAdj = []
    for (var i = 1; i < count; i++) {
      if (axisChoice == 0){
      l1Data = data[i].joints[line1].depthX;
      l2Data = data[i].joints[line2].depthX;
      mapData(0,1)
    } else if(axisChoice == 1){
      l1Data = data[i].joints[line1].depthY;
      l2Data = data[i].joints[line2].depthY;
      mapData(0,1)
    } else if(axisChoice == 2){
      l1Data = data[i].joints[line1].cameraZ;
      l2Data = data[i].joints[line2].cameraZ;
      mapData(2,4)
      }
      // let amp = data[i].amplitude;
      // let tDiff = tData - tPrev
      // let amplitude = map(amp,0,50,height,290);
      // amplitudes.push(amplitude)
      // times.push(tDiff)
      let tData = data[i].record_timestamp;
      let time = map(tData, 0, tMax, 0, width);
      timesAdj.push(time)
      // tPrev = tData
    }
  }
dataGot = true
// console.log(dataGot)
}

function mapData(low, high){
  let pos1 = map(l1Data, low, high, min, max);
  let pos2 = map(l2Data, low, high, min, max);
  positions1.push(pos1)
  positions2.push(pos2)
}

function drawLines() {
  // background(0)
  if (dataGot = true){
  waveForm(positions1, "Y 1", 30, 10)
  waveForm(positions2, "Y 2", 60, 40)
  // waveForm(amplitudes, "Music Amplitude", 400, 290, 400, 90 , 70)
  stroke(100, 0, 100)
  strokeWeight(1);
}
  line(mouseX, height, mouseX, 0)
}


// generate line graph for input
function waveForm(positions, name, nameheight, hue) {
  noStroke()
  fill(hue, 100, 100)
  text(name, 20, nameheight)
  noFill();
  positions.forEach(function(pos,i){
    var time = timesAdj[i]
    timePoints.push(new timePoint(time,pos,i,hue))
    })
  dataGot = false
}

function drawTimeline() {
  // let axis = axis
  for (var i = 0; i < count - 1; i++) {
    strokeWeight(1)
    stroke(200)
    line(timesAdj[i], height - 80, timesAdj[i], height - 60)
    noStroke()
  }
}


class timePoint {
  constructor(x,y,id,hue){
    this.pos = createVector(x,y)
    this.id = id
    this.hue = hue
  }

  display(){
    fill(this.hue, 100, 100)
    ellipse(this.pos.x, this.pos.y, 2, 2)
  }

  checkDist(){
    const xDist = abs(mouseX - this.pos.x)
    const yDist = this.hue + 100
    if (xDist < 2 ) {
      noStroke()
      fill(this.hue, 100, 100)
      textSize(20)
      text(floor(this.pos.y), 50, height - yDist)
      fill(200)
      text(floor(timesAdj[this.id]), 50, height - 10)
    }
  }

}
