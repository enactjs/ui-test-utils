const path = require('path');
const externals = require('@enact/dev-utils/mixins/externals');
const framework = require('@enact/dev-utils/mixins/framework');
const readdirp = require('readdirp');
const webpack = require('webpack');
const generator = require('./webpack.config.js');

const enact = generator({APPENTRY: 'framework', APPOUTPUT: path.join('dist', 'framework')});
framework.apply(enact);
enact.entry.enact = enact.entry.enact.filter(e => !e.includes('@enact/dev-utils') && !e.includes('ReactPerf') && !e.includes('node_modules'));
process.env.ILIB_BASE_PATH = path.join('/framework', 'node_modules', '@enact', 'i18n', 'ilib');

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
		console.log('Packing Enact framework...');
		return Promise.resolve()//epack([enact])
			.then(() => console.log('Packing views in parallel...'))
			.then(() => findViews())
			.then(files => (
				epack(files.map(f => {
					let config = generator({
						APPENTRY: f.fullPath,
						APPOUTPUT: path.join('dist', path.basename(f.fullPath, '.js'))
					});
					externals.apply(config, {externalsPublic:'dist/framework'});
					return config;
				})))
			).catch(err => {
				console.error('Build failed:');
				console.error();
				console.error(err);
				process.exit(1);
			});
	}
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
