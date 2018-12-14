const path = require('path');
const fs = require('fs');


const folder = path.join(__dirname, 'kinectron-recordings/skeleton_files');

console.log(folder);

fs.readdir(folder, function(err, items) {
    console.log(items);

    var result = 'var skeletonFiles = [';

    for(let i = 0; i < items.length; i++){
      const file = items[i];

      result = result + "'" + file + "',";
    }

    result = result + '];';

    console.log('writing result to file: ', result);

    const fileToWrite = path.join(__dirname, 'skeletonFiles.js');

    fs.writeFile(fileToWrite, result, function(err) {
      if(err) {
        return console.log(err);
      }
      else
        console.log("The file was saved!");
    });
    // for (var i=0; i<items.length; i++) {
    //     console.log(items[i]);
    // }
});
