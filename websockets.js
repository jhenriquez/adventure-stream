var ws = require('websocket-stream');
new ws('ws://localhost:8000').end('hello\n');

