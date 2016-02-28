var combine = require('stream-combiner');
var through = require('through2');
var duplexer = require('duplexer');
var split = require('split');
var zlib = require('zlib');

module.exports = function() {
	var genre = '';
	var thisGenre;

	var tr = through(function (buffer, encoding, next) {
		// This line i had to look at the solution for :(
		if (buffer.length == 0) return next();

		// Get our object from the buffer
		var obj = JSON.parse(buffer.toString());

		// If it's a genre..
		if (obj.type == 'genre') {
			// If this is NOT the first 'row' or 'entry'
			if (thisGenre) {
				this.push(JSON.stringify(thisGenre) + '\n');
			}
			// Construct our object
			thisGenre = { books: [], name: obj.name };
		}
		else if (obj.type == 'book') {
			thisGenre.books.push(obj.name);
		}

		next();
	},
	function (done) {
		if (thisGenre) {
			this.push(JSON.stringify(thisGenre) + '\n');
		}
		done();
	});

	return combine(
		split(),
		tr,
		zlib.createGzip()
	);
}
