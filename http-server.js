var http = require('http'),
	through = require('through');

function Upper(content) {
	this.queue(content.toString().toUpperCase());
}

var srv = http.createServer(function (rq, rs) {
	if (rq.method === 'POST') {
		rq.pipe(through(Upper)).pipe(rs);
	} else {
		rs.end('Nothing to do here!');
	}
});

srv.listen(parseInt(process.argv[2]));