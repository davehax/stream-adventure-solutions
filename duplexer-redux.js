var duplexer = require('duplexer2');
var through = require('through2');

module.exports = function(counter) {
	var counts = {};

	function countRecords(buffer, encoding, next) {
		counts[buffer.country] = (counts[buffer.country] || 0) + 1;
		next();
	}

	function finishCountingRecords(done) {
		counter.setCounts(counts);
		done();
	}

	// We are being written OBJECTS (read the fucking question next time Dave)
	// use objectMode TRUE for both 'through2' and 'duplexer2'
	var tr = through({ objectMode: true }, countRecords, finishCountingRecords);
	return duplexer({ objectMode: true }, tr, counter);
}
