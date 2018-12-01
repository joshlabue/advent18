var fs = require('fs');
var inputFile = fs.readFileSync('input.txt'); 
console.log(eval(inputFile.toString()));