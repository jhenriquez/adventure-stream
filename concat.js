var concat = require('concat-stream');

function reverse(content) {
	console.log(content.toString().split('').reverse().join(''));
};

process.stdin.pipe(concat(reverse));