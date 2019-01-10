
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

// get radio button radioValue

$(document).ready(function(){
       $("input[type='radio']").click(function(){
           axisChoice = $("input[name='axis']:checked").val();
       });
});



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
