var Combine = require('stream-combiner'),
	through = require('through'),
	split   = require('split'),
	zlib    = require('zlib');


var genres = {},
	current = '';

function groupItems(content) {
	if (content.length === 0) return;
	var row = JSON.parse(content.toString());
	if (row.type === 'genre') {
		current = row.name;
		genres[current] = [];
	} else {
		genres[current].push(row.name);
	}
}

function writeItems() {
	var books = '';
	for(var genre in genres) {
		if (genres.hasOwnProperty(genre)) {
			books += JSON.stringify({name: genre, books: genres[genre]}) + '\n';
		}
	}
	this.queue(books);
	this.queue(null);
}

module.exports = function () {
	return Combine(
			split(),
			through(groupItems, writeItems),
			zlib.createGzip()
		);
};

 