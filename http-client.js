var request = require('request');
// Create a POST request to localhost:8099 - returns a read/write stream
var r = request.post('http://localhost:8099');
process.stdin
	// Pipe process.stdin to our POST request
	.pipe(r)
	// and then pipe the response to process.stdout
	.pipe(process.stdout);
