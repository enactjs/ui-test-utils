const path = require('path');
const readdirp = require('readdirp');
const webpack = require('webpack');
const generator = require('./webpack.config.js');

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
		return findViews().then(files => (
			epack(files.map(f => (
				generator({
					APPENTRY: f.fullPath,
					APPOUTPUT: path.join('dist', path.basename(f.fullPath, '.js'))
				})
			)))
		)).catch(err => {
			console.error('Build failed:');
			console.error();
			console.error(err.message)
			process.exit(1);
		})
	}
}

function epack (configs) {
	process.env.NODE_ENV = 'development';
	console.log('Packing views in parallel...');
	console.log();
	return new Promise((resolve, reject) => {
		const multiCompiler = webpack(configs);
		multiCompiler.compilers.forEach(compiler => {
			compiler.plugin('done', () => {
				const src = path.relative(process.cwd(), compiler.options.resolve.alias['UI_TEST_APP_ENTRY']);
				const out = path.relative(process.cwd(), compiler.options.output.path);
				console.log('Built ' + src + ' to ' + out);
			});
		});
		multiCompiler.run((err, stats) => {
			if (err) {
				reject(err);
			} else {
				const statsJSON = stats.toJson({}, true);
				if (statsJSON.errors.length>0) {
					reject(new Error(statsJSON.errors.join('\n\n')));
				} else {
					if (statsJSON.warnings.length) {
						console.log('Build completed with warnings:');
						console.log();
						console.log(statsJSON.warnings.join('\n\n'));
					}
					console.log('Build completed successfully.');
					resolve();
				}
			}
		});
	});
}

module.exports = buildApps;
