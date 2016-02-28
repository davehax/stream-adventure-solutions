var ws = require('websocket-stream');
// Open a websocker stream on localhost:8099
var stream = ws('ws://localhost:8099');
// Write hello\n
stream.write('hello\n');
