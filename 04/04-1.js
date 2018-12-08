var fs = require('fs');
var inputFile = fs.readFileSync(__dirname + '/input.txt');
var input = inputFile.toString().split('\n');

var events = [];

for(i in input) {
    input[i] = input[i].slice(6);
    events.push({
		time: {
				month: input[i].slice(0, 2),
				day: input[i].slice(3, 5),
				hour: input[i].slice(6, 8),
				minute: input[i].slice(9, 11)
		},
		message: input[i].split('] ')[1]
    });
}

for(i in events) {
    var e = events[i];
    events[i].timestamp = '' + e.time.month + e.time.day + e.time.hour + e.time.minute;
}

events.sort((x, y) => {
    return x.timestamp - y.timestamp;
});

var guards = [];
var guardID;

for(e in events) {
	if(events[e].message.includes('#')) {
		guardID = /[0-9]+/g.exec(events[e].message)[0];
		var exists = false;
		for(g in guards) {
			if(g.id == guardID) exists = true;
		}
		if(!exists) {
			guards.push({
				id: guardID,
				naps: []
			});
		}
	}
	else if(events[e].message.includes('falls')) {
		for(g in guards) {
			if(guards[g].id == guardID) {
				guards[g].naps.push({start: parseInt(events[e].time.minute)})
			}
		}
	}
	else if(events[e].message.includes('wakes')) {
		for(g in guards) {
			if(guards[g].id == guardID) {
				guards[g].naps[guards[g].naps.length-1].end = parseInt(events[e].time.minute);
			}
		}
	}
}

var sleepiestGuard = {totalSleep:0, naps: []};
for(g in guards) {
	guards[g].totalSleep = 0;
	for(n in guards[g].naps){ 
		guards[g].totalSleep += guards[g].naps[n].end - guards[g].naps[n].start;
			
	}

	if(guards[g].totalSleep >= sleepiestGuard.totalSleep) {
		sleepiestGuard = guards[g];
	}
}

var minutes = [];
for(var i = 0; i < 60; i++) minutes.push(0);
for(n in sleepiestGuard.naps) {
	var nap = sleepiestGuard.naps[n];
	for(var i = nap.start; i < nap.end; i++){
		minutes[i]++;
	}
}

console.log(minutes.indexOf(Math.max.apply(null, minutes)) * sleepiestGuard.id);