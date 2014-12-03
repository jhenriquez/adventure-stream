var through = require('through'),
	trumpet = require('trumpet');

var tr = new trumpet();

var loadElements = tr.select('.loud').createStream();

function write(content) {
	this.queue(content.toString().toUpperCase());
}

loadElements.pipe(through(write)).pipe(loadElements);

process.stdin.pipe(tr).pipe(process.stdout);