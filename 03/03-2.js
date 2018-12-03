var fs = require('fs');
var inputFile = fs.readFileSync(__dirname + '/input.txt');
var input = inputFile.toString().split('\n');

var claims = [];
var area = [];

for(i in input) {
    claims.push({
        id: parseInt(input[i].split(' ')[0].slice(1)),
        x: parseInt(input[i].split(' ')[2].split(',')[0]),
        y: parseInt(input[i].split(' ')[2].split(',')[1]),
        width: parseInt(input[i].split(' ')[3].split('x')[0]),
        height: parseInt(input[i].split(' ')[3].split('x')[1])
    });
}

for(i in claims) {
    for(var w = 0; w < claims[i].width; w++) {
        if(area[claims[i].x + w] == undefined) area[claims[i].x + w] = [];
        for(var h = 0; h < claims[i].height; h++) {
            if(area[claims[i].x + w][claims[i].y + h] == undefined) area[claims[i].x + w][claims[i].y + h] = [];
            area[claims[i].x + w][claims[i].y + h].push(claims[i].id);
        }
    }
}

var total = 0;

for(i in area) {
    for(j in area[i]) {
        if(area[i][j].length >= 2){
            for(k in area[i][j]) {
                for(c in claims) {
                    if(claims[c].id == area[i][j][k]) claims[c].target = 'delete';
                }
            }
        }
    }
}

for(i in claims) {
    if(claims[i].target != 'delete') console.log(claims[i].id);
}