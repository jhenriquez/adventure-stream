var rq = require('request');

process.stdin.pipe(rq.post('http://localhost:8000/')).pipe(process.stdout);