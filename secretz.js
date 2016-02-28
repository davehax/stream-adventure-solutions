var tar = require('tar');
var zlib = require('zlib');
var crypto = require('crypto');
var concat = require('concat-stream');

// encrypted, gzipped tar file will be streamed in via process.stdin
var ciphername = process.argv[2];
var passphrase = process.argv[3];
var parser = tar.Parse();
parser.on('entry', function(e) {
	if (e.type != 'File') return;
	// md5 {SPACE} filename {NEWLINE}
	// This hashstream is single use only!
	var hashStream = crypto.createHash('md5', { encoding: 'hex' });
	e.pipe(hashStream)
	.pipe(concat(function(hash) {
		console.log(hash + ' ' + e.path);
	}))
});

var decrypter = crypto.createDecipher(ciphername, passphrase);

process.stdin
	// decrypt the input
	.pipe(decrypter)
	// unzip the tar file
	.pipe(zlib.createGunzip())
	// process the tar files contents
	.pipe(parser);
