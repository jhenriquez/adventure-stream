var cryptoStream = require('crypto').createDecipher('aes256', process.argv[2]);

process.stdin.pipe(cryptoStream).pipe(process.stdout);

