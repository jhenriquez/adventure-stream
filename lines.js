var split = require('split'),
	through = require('through');

var transform = false;

process
	.stdin
	.pipe(split())
	.pipe(through(function write(line) {
		this.queue((transform ? line.toString().toUpperCase() : line.toString().toLowerCase()) + '\n');
		transform = !transform;
	}))
	.pipe(process.stdout);