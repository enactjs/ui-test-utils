const path = require('path');
const externals = require('@enact/dev-utils/mixins/externals');
const framework = require('@enact/dev-utils/mixins/framework');
const readdirp = require('readdirp');
const webpack = require('webpack');
const generator = require('./webpack.config.js');

const ilib = path.join('node_modules', 'ilib');
process.env.ILIB_BASE_PATH = ilib;
const enact = framework.apply(generator({APPENTRY: 'framework', APPOUTPUT: path.join('tests', 'ui', 'dist', 'framework')}));

function findViews () {
	return new Promise((resolve, reject) => {
		readdirp({root: 'tests/ui/apps', fileFilter: '*-View.js'}, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.files);
			}
		});
	});
}

function buildApps () {
	if (process.argv.includes('--skip-build')) return;

	return Promise.resolve()
		.then(() => {
			if(!process.argv.includes('--skip-enact')) {
				console.log('Packing Enact framework...');
				return epack([enact]);
			}
		})
		.then(() => {
			if(!process.argv.includes('--skip-tests')) {
				console.log('Packing views in parallel...');
				return findViews().then(files => (
					epack(files.map(f => (
						externals.apply(generator({
							APPENTRY: f.fullPath,
							APPOUTPUT: path.join('tests', 'ui', 'dist', path.basename(f.fullPath, '.js'))
						}), {
							externalsPublic: 'tests/ui/dist/framework'
						})
					)))
				));
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
				if (statsJSON.errors.length>0) {
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
