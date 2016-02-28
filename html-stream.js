var trumpet = require('trumpet');
var through = require('through');

var tr = trumpet();

tr.selectAll('.loud', function(elem) {
	var stream = elem.createStream();
	stream
		.pipe(through(function(buffer, enc, next) {
			this.push(buffer.toString().toUpperCase());
			typeof(next) == 'function' && next();
		}))
		.pipe(stream);
});

process.stdin.pipe(tr).pipe(process.stdout);
