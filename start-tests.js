#!/usr/bin/env node
// const cli = require('@wdio/cli');
(async () => {
	const cli = await import('@wdio/cli');
	cli.run();
})();

