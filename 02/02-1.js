var fs = require('fs');
var inputFile = fs.readFileSync('input.txt');
var input = inputFile.toString().split('\n');

var withTwo = 0, withThree = 0;

for(i in input) {
    var history = [];
    for(charIndex in input[i]) {
        var char = input[i][charIndex];
        if(history[char] == null) history[char] = 0;
        history[char]++;
    }
    
    var foundTwo = false;
    var foundThree = false;
    for(i in history) {
        if(history[i] == 2 && !foundTwo) {
            withTwo++;
            foundTwo = true;
        }
        else if(history[i] == 3 && !foundThree) {
            withThree++;
            foundThree = true;
        }
    }
    
}

console.log(withTwo * withThree);