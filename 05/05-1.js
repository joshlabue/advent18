var fs = require('fs');
var inputFile = fs.readFileSync('input.txt');
var input = inputFile.toString();

String.prototype.isUpperCase = function() {
    if(this == this.toUpperCase()) return true;
    else return false;
}

String.prototype.isLowerCase = function() {
    if(this == this.toLowerCase()) return true;
    else return false;
}



function reduce(target) {
    var reduced = false;
    for(var i = 0; i < target.length-1; i++) {
        var canReduce = false;
        if(target.charAt(i).toUpperCase() == target.charAt(i+1).toUpperCase()) {
            if(target.charAt(i).isLowerCase() && target.charAt(i+1).isUpperCase()) canReduce = true;
            else if(target.charAt(i).isUpperCase() && target.charAt(i+1).isLowerCase()) canReduce = true;

            if(canReduce) {
                reduced = true;
                target = target.slice(0, i) + target.slice(i + 2, target.length);
                i++;
            }
        }
    }

    input = target;
    return reduced;
}

while(reduce(input));

console.log(input.length);

