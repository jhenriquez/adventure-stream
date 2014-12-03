var duplexer = require('duplexer'),
	through = require('through');

function duplexRedux(counter) {
	var counts = {};
	var writableStream = through(function (data) {
		counts[data.country] = counts[data.country] || 0;
		counts[data.country] += 1;
		this.queue(data);
	},
	function () {
		counter.setCounts(counts);
	});

	return duplexer(writableStream,counter);
}

module.exports = duplexRedux;