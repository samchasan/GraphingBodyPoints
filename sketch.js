let data = {}; // Global object to hold results from the loadJSON call
let positions = [];
let rpositions = []
let lpositions = []
// let amplitudes = []
let times = []
let dataLoaded = false;
let count;
let min = 20
let max = 300

// from kinectron.json
let handleft = 7
let handright = 11

function preload() {
    data = loadJSON('../kinectron-recordings/skeleton.json',loadData);
}

function loadData() {
  dataLoaded = true

}

function setup(){
  createCanvas(1600,400);
  background(00)
  colorMode(HSB)
  textSize(18)

  if (dataLoaded = true){
    count = Object.keys(data).length;
    let tMax = data[count-1].record_timestamp

    for (var i = 1; i < count; i++){
      let lData = data[i].bodies[5].joints[handleft].depthY;
      let rData = data[i].bodies[5].joints[handright].depthY;
      let tData = data[i].record_timestamp;
      // let amp = data[i].amplitude;
      let lpos = map(lData,-1,1,max,min);
      let rpos = map(rData,-1,1,max,min);
      let time = map(tData,0,tMax,0,width);
      // let amplitude = map(amp,0,50,height,290);
      rpositions.push(rpos)
      lpositions.push(lpos)
      // amplitudes.push(amplitude)
      times.push(time)
      }
  }
}

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
    // console.log(x)
  }
  endShape();
}

function draw(){
  background(0)
  waveForm(rpositions, "Y Right", max, 50, 150, 30, 10)
  waveForm(lpositions,"Y Left", max, 150, 250, 60, 40)
  // waveForm(amplitudes, "Music Amplitude", 400, 290, 400, 90 , 70)
  stroke(100,0,100)
  strokeWeight(1);
  line(mouseX,height,mouseX,0)

  for (var i = 0; i < count-1; i++){
    strokeWeight(1)
    stroke(200)
    line(times[i],height-80,times[i],height-60)
    noStroke()
    let overlap = abs(mouseX-times[i])
      if(overlap<9){
        fill(200)
        text(data[i].record_timestamp/1000,times[0],height-100)
      }

  }
}
