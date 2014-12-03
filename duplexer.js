var spawn = require('child_process').spawn,
	dupx = require('duplexer');

module.exports = function (cmd, args) {
	var proc = spawn(cmd, args);
	return dupx(proc.stdin, proc.stdout);
}