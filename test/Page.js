'use strict';

const shelljs = require('shelljs');
const fs = require('fs');
const nodePath = require('path');

let lastAppSrc = '';

class Page {
	constructor () {
		this.title = 'Untitled Test';
	}

	open (viewPath, urlExtra = '') {
		let url = 'localhost:4567' + (urlExtra ? '/' + urlExtra : '');
		if (lastAppSrc !== viewPath) {
			epack(viewPath);
			lastAppSrc = viewPath;
		}
		browser.url(url);
	}

	keyDelay (key, delay = 50) {
		browser.keys(key);
		browser.pause(delay);
		return browser;
	}
	spotlightLeft () {
		return this.keyDelay('Left arrow');
	}
	spotlightRight () {
		return this.keyDelay('Right arrow');
	}
	spotlightUp () {
		return this.keyDelay('Up arrow');
	}
	spotlightDown () {
		return this.keyDelay('Down arrow');
	}
}

// Writes a skeleton `index.js` for loading each sample
function writeIndex (dest, src) {
	const index =
`import React from 'react';
import {render} from 'react-dom';
import App from '${src}';

const appElement = (<App />);

if (typeof window !== 'undefined') {
	render(
		appElement,
		document.getElementById('root')
	);
}

export default appElement;
`;
	try {
		fs.mkdirSync(nodePath.dirname(dest));
	} catch (err) {
		// It's OK if it exists
	}
	fs.writeFileSync(dest, index);
}

// Runs the enyo pack command to generate output
function epack (src) {
	const dest = 'loader/index.js',
		command = `node_modules${nodePath.sep}.bin${nodePath.sep}webpack`;

	writeIndex(dest, src);

	try {
		console.log('Packing app...');
		const result = shelljs.exec(command, {silent: true});
		if (result.code !== 0) {
			console.log('Error running webpack:');
			console.log(result.stdout);
			console.log(result.stderr);
			return false;
		} else {
			console.log('Pack succeeded.');
		}
	} catch (err) {
		console.log('webpack exec failure');
		console.log(err);
		return false;
	}
	return true;
}

module.exports = Page;
