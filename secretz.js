var tar          = require('tar'),
	zlib         = require('zlib'),
	crypto       = require('crypto'),
	through      = require('through');
	tarParser    = tar.Parse(),
	cryptoStream = crypto.createDecipher(process.argv[2], process.argv[3]);


tarParser.on('entry', function (e) {
	if (e.type === 'File') {
		var hexStream = crypto.createHash('md5', { encoding: 'hex' });
		e.pipe(hexStream).pipe(through(null, hexEnd)).pipe(process.stdout);
	}

	function hexEnd () {
		this.queue(' ' + e.path + '\n');
		this.queue(null);
	}
});

process
   .stdin
   .pipe(cryptoStream)
   .pipe(zlib.createGunzip())
   .pipe(tarParser);