var through = require('through2');
var split = require('split');

var line = 1;

var stream = through(function(buffer, encoding, next) {
	var thisLine = line % 2 == 0
		? buffer.toString().toUpperCase()
		: buffer.toString().toLowerCase()

	this.push(thisLine + '\n');
	line++;
	next();
});

process.stdin
	.pipe(split())
	.pipe(stream)
	.pipe(process.stdout);
