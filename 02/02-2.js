//day 2 part 2 - there goes writing pretty code.

var fs = require('fs');
var inputFile = fs.readFileSync('input.txt');
var input = inputFile.toString().split('\n');

for(i in input) {
    var history = [];
    for(charIndexI in input[i]) {
        var charI = input[i][charIndexI];
        var strI = input[i].slice(0, charIndexI-1) + input[i].slice(charIndexI);

        var filtered = input.filter(line => line != input[i])
        for(j in filtered) {
            for(charIndexJ in filtered[j]) {
                var charJ = filtered[j][charIndexJ];
                var strJ = filtered[j].slice(0, charIndexJ-1) + filtered[j].slice(charIndexJ);
        
               if(strI == strJ) console.log(strI);
            }    
        }
    }    
}
