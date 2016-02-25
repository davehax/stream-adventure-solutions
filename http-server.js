var http = require('http');
var through = require('through2');
var concat = require('concat-stream');

// Define 'through' object
var tr = through(function(buffer, enc, next) {
	this.push(buffer.toString().toUpperCase());
	next();
});

// Our server, nice and simple
var server = http.createServer(function(req, res) {
	req.pipe(tr).pipe(res);
});

server.listen(process.argv[2]);
