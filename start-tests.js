#!/usr/bin/env node
(async () => {
	const cli = await import('@wdio/cli');
	cli.run();
})();
