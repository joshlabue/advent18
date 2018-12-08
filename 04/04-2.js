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

	guards[g].minutes = [];
	for(var i = 0; i < 60; i++) guards[g].minutes.push(0);
	for(n in guards[g].naps) {
		var nap = guards[g].naps[n];
		for(var i = nap.start; i < nap.end; i++){
			guards[g].minutes[i]++;
		}
	}
}

var min = [];
for(var i = 0; i < 60; i++) min[i] = [];

for(g in guards) {
	for(n in guards[g].naps) {
		var nap = guards[g].naps[n];
		for(var i = nap.start; i <= nap.end; i++){
			//if(min[i][guards[g].id] == undefined) min[i][guards[g].id] = 0;
			//min[i][guards[g].id]++;
			var found = false;
			for(j in min[i]) if(min[i][j].id == guards[g].id) found = true;
			
			if(found == false) {
				min[i].push({
					id: guards[g].id,
					count: 0
				});
			}

			for(j in min[i]) if(min[i][j].id == guards[g].id) min[i][j].count++;

		}
	}
}

var max = {gid: 0, minute: 0, count: 0};
for(minute in min) {
	for(guard in min[minute]) {
		
		if(min[minute][guard].count > max.count) max = {
			gid: min[minute][guard].id,
			minute: minute,
			count: min[minute][guard].count
		}
	}
}

console.log(max.gid * max.minute);