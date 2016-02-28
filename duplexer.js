var duplexer = require('duplexer2');
var spawn = require('child_process').spawn;

module.exports = function(cmd, args) {
	var child = spawn(cmd, args);
	// child.stdin is the writeable stream from an EXTERNAL perspective
	// child.stdout is the readable steam from an EXTERNAL perspective
	return duplexer(child.stdin, child.stdout);
};
