var through = require('through');

function write (data) { 
	this.queue(data.toString().toUpperCase()); 
}

var middleware = through(write);

process.stdin.pipe(middleware).pipe(process.stdout);