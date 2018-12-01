var fs = require('fs');
var inputFile = fs.readFileSync('input.txt');
var input = inputFile.toString().split('\n');

var val = 0;
var history = [];
var foundMatch = false;
while(!foundMatch) {
    for(i in input) {
        val += parseInt(input[i]);
        console.log(val);
        if(history.includes(val)){
            foundMatch = true;
            break;
        }
        history.push(val);
    }
}

console.log(val);