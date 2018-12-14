// would be nice to have 'laggy' video also so you can see yourself
// would be nice to have start capture button also visualized
// can we send instructions to kinect like: fps, how many things to send,


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
let axes = [0,1,2]

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
  createCanvas(1600, 400);
  background(00)
  colorMode(HSB)
  textSize(18)
}
//
function draw() {
  background(0)
  drawLines()
  drawAxis()
  // console.log(mouseY)
}

function submit(){
  let axis = axes[1]
  getDataPoints(line1,line2)
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
      let l1Data = data[i].joints[line1].depthY;
      let l2Data = data[i].joints[line2].depthY;
      let tData = data[i].record_timestamp;
      // let amp = data[i].amplitude;
      let pos1 = map(l1Data, 0, 1, min, max);
      let pos2 = map(l2Data, 0, 1, min, max);
      // let tDiff = tData - tPrev
      let time = map(tData, 0, tMax, 0, width);
      // let amplitude = map(amp,0,50,height,290);
      positions1.push(pos1)
      positions2.push(pos2)
      // amplitudes.push(amplitude)
      // times.push(tDiff)
      timesAdj.push(time)
      // tPrev = tData
    }
  }
dataGot = true
console.log(dataGot)
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
  stroke(hue, 100, 100);
  strokeWeight(1);
  beginShape();
  positions.forEach(function(pos,i){
    var time = timesAdj[i]
    // vertex(time,pos);
    ellipse(time,pos,2,2)
    })
  endShape();
  dataGot = false
}

function drawAxis() {
  // let axis = axis
  for (var i = 0; i < count - 1; i++) {
    strokeWeight(1)
    stroke(200)
    line(timesAdj[i], height - 80, timesAdj[i], height - 60)
    noStroke()
    let overlap = abs(mouseX - timesAdj[i])
    if (overlap < 9) {
      fill(200)
      text(data[i].record_timestamp / 1000, timesAdj[0], height - 100)
    }
  }
}

function selectFromDropDown(id, array, var2affect) {
      let idString = "`" + id + "`"
      var selectBox = document.getElementById(id);
      let selectedValue = selectBox.options[selectBox.selectedIndex].value;
      if (array == 'dataFiles'){
        data = dataFiles[selectedValue]
        // console.log(data)
      } else if (array == 'joints'){
        if(var2affect == 'line1'){
        line1 = selectedValue
        } else if(var2affect == 'line2'){
        line2 = selectedValue
          }
        }
}



function makeDropDown(input, id){
  // read generateFileList.js and generate a dropdown menu from the arraylist contained
    let inputLength = input.length
    let select = document.getElementById(id);
    for (var i = 0; i < inputLength; i++) {
        var skeleton = "/" + input[i];
        var option = document.createElement("option");
        data = loadJSON('kinectron-recordings/skeleton_files/'+input[i], loadData(data));
        dataFiles.push(data)
        option.text = input[i];
        option.value = i;
        select.appendChild(option);
      }
}

function makeSubDrop(input, id){
    let inputLength = input.length
    let select = document.getElementById(id);
    for (var i = 0; i < 25; i++){
      let name = joints[i]
      var option = document.createElement("option");
      option.text = name;
      option.value = i;
      select.appendChild(option);
    }
}


function getAvgTime() {
  let sum = 0;
  times.forEach((time) => {
    sum += time;
  });
  let avg = sum / times.length;
  // console.log(avg)
}
