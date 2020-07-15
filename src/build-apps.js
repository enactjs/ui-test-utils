const path = require('path');
const fs = require('fs-extra');
const externals = require('@enact/dev-utils/mixins/externals');
const framework = require('@enact/dev-utils/mixins/framework');
const readdirp = require('readdirp');
const webpack = require('webpack');
const generator = require('../config/webpack.config.js');

process.env.ILIB_BASE_PATH = '/framework/ilib';

function findViews (base) {
	return new Promise((resolve, reject) => {
		readdirp({root: path.join('tests', base, 'apps'), fileFilter: '*-View.js'}, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.files);
			}
		});
	});
}

function buildApps (base) {
	if (process.argv.includes('--skip-build')) return;

	return Promise.resolve()
		.then(() => {
			if (!process.argv.includes('--skip-enact')) {
				const enact = framework.apply(generator({
					APPENTRY: 'framework',
					APPOUTPUT: path.join('tests', base, 'dist', 'framework')
				}));

				console.log('Packing Enact framework...');
				return epack([enact]);
			}
		})
		.then(() => {
			if (!process.argv.includes('--skip-ilib')) {
				console.log('Copying ilib locale data...');

				const ilibDist = path.join('tests', base, 'dist', 'framework', 'ilib');
				if (!fs.existsSync(ilibDist)) {
					fs.mkdirSync(ilibDist);
				}

				return fs.copy(
					path.join('node_modules', 'ilib', 'locale'),
					path.join(ilibDist, 'locale')
				);
			}
		})
		.then(() => {
			if (!process.argv.includes('--skip-tests')) {
				console.log('Packing views in parallel...');
				return findViews(base).then(files => (
					epack(files.map(f => (
						externals.apply(generator({
							APPENTRY: f.fullPath,
							APPOUTPUT: path.join('tests', base, 'dist', path.basename(f.fullPath, '.js'))
						}), {
							externalsPublic: 'tests/' + base + '/dist/framework'
						})
					)))
				));
			}
		})
		.then(() => {
			if (base.indexOf('screenshot') >= 0) {
				const distUtils = path.join('tests', base, 'dist', 'utils'),
					redistSrc = path.join(__dirname, '..', 'screenshot', 'utils', 'redist');

				if (!fs.existsSync(distUtils)) {
					fs.mkdirSync(distUtils);
				}

				return fs.copy(redistSrc, distUtils);
			}
		})
		.catch(err => {
			console.error('Build failed:');
			console.error();
			console.error(err.message);
			process.exit(1);
		});
}

function epack (configs) {
	process.env.NODE_ENV = 'development';
	console.log();
	return new Promise((resolve, reject) => {
		const multiCompiler = webpack(configs);
		multiCompiler.compilers.forEach(compiler => {
			compiler.hooks.done.tap('UITests', () => {
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
				if (statsJSON.errors.length > 0) {
					reject(new Error(statsJSON.errors.join('\n\n')));
				} else {
					if (statsJSON.warnings.length) {
						console.log('Build completed with warnings:');
						console.log();
						console.log(statsJSON.warnings.join('\n\n'));
					}
					console.log('Build completed successfully.\n');
					resolve();
				}
			}
		});
	});
}

module.exports = buildApps;
if (require.main === module) buildApps();
