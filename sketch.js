let data = {}; // Global object to hold results from the loadJSON call
let positions = [];
let xpositions = []
let ypositions = []
let amplitudes = []
let times = []
let dataLoaded = false;

function preload() {
    data = loadJSON('positions-test1.json',loadData);
}

function loadData() {
  dataLoaded = true
}

function setup(){
  createCanvas(1200,400);
  background(00)
  colorMode(HSB)
  textSize(18)
  if (dataLoaded = true){
    let count = Object.keys(data).length;
    for (var i = 1; i < count; i++){
      let xData = data[i].positiondata.leftHand.x;
      let yData = data[i].positiondata.leftHand.y;
      let tData = data[i].timeStamp;
      let amp = data[i].amplitude;
      let ypos = map(yData,0,720,max,min);
      let xpos = map(xData,0,1280,max,min);
      let time = map(tData,0,count,0,width);
      let amplitude = map(amp,0,50,height,290);
      xpositions.push(xpos)
      ypositions.push(ypos)
      amplitudes.push(amplitude)
      times.push(time)
      }
  }
}

let min = 20
let max = 300


function waveForm(ypos,name,inMax,outMin,outMax,nameheight,hue) {
  noStroke()
  fill(hue, 100, 100)
  text(name,20,nameheight)
  vertices = []
  let vertexPt = {}
  noFill();
  stroke(hue, 100, 100);
  beginShape();
  strokeWeight(1);
  for (var i = 0; i < ypos.length; i += 1) {
    var x = times[i]
    var y = map(ypos[i], 0, inMax, outMin,outMax);
    vertex(x, y);
  }
  endShape();
}

function draw(){
  background(0)
  waveForm(xpositions, "X Pos", 200, max, min, 30, 10)
  waveForm(ypositions,"Y Pos", 200, max, min, 60, 40)
  waveForm(amplitudes, "Music Amplitude", 100, 0, 100, 90 , 70)
  stroke(100,0,100)
  strokeWeight(1);
  line(mouseX,height,mouseX,0)
}
