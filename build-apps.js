const shelljs = require('shelljs');
const fs = require('fs');
const nodePath = require('path');
const readdirp = require('readdirp');

function findViews () {
	return new Promise((resolve, reject) => {
		readdirp({root: 'apps', fileFilter: '*-View.js'}, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.files);
			}
		});
	});
}

function buildApps () {
	if (process.argv.includes('--skip-build')){
		return true;
	} else {
		return findViews().then(files => {
			files.forEach(entry => {
				if(!epack(entry.fullPath)) {
					throw new Error(`Failed to package ${entry.path}`);
				}
			});
		});
	}
}

// Writes a skeleton `index.js` for loading each sample
function writeIndex (dest, src) {
	const index =
`import React from 'react';
import {render} from 'react-dom';
import App from ${JSON.stringify(src)};

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
		dirName = nodePath.basename(src, '.js'),
		command = `node_modules${nodePath.sep}.bin${nodePath.sep}webpack --output-path dist${nodePath.sep}${dirName}${nodePath.sep}`;

	writeIndex(dest, src);

	try {
		console.log(`Packing ${dirName}...`);
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

module.exports = buildApps;
