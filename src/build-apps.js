import path from 'path';

let chalk;
import spawn from 'cross-spawn';
import fs from 'fs-extra';
import readdirp from 'readdirp';
import * as url from 'url';

const env = {
	ILIB_BASE_PATH: '/framework/ilib',
	ILIB_ASSET_CREATE: 'false',
	SIMPLE_CSS_IDENT: 'true',
	BROWSERSLIST: 'Chrome 79'
};

function findViews (base) {
	return readdirp.promise(path.join('tests', base, 'apps'), {fileFilter: '*-View.js'});
}

// eslint-disable-next-line no-shadow
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

function buildApps (base) {
	if (process.argv.includes('--skip-build')) return;
	console.log('Building content:\n');

	return import('chalk')
		.then(({default: _chalk}) => {
			chalk = _chalk;
			if (!process.argv.includes('--skip-enact')) {
				epack({
					file: {basename: 'Enact framework bundle', fullPath: 'framework'},
					opts: [
						'pack',
						'--output',
						path.join('tests', base, 'dist', 'framework'),
						'--framework',
						'--externals-polyfill',
						process.argv.includes('--no-animation') ? '--no-animation' : null
					]
				});
			}
		})
		.then(() => {
			if (!process.argv.includes('--skip-ilib')) {
				const ilibDist = path.join('tests', base, 'dist', 'framework', 'ilib');
				if (!fs.existsSync(ilibDist)) {
					fs.mkdirSync(ilibDist);
				}
				process.stdout.write('\tiLib locale data... ');
				return fs.copy(
					path.join('node_modules', 'ilib', 'locale'),
					path.join(ilibDist, 'locale')
				).then(() => {
					if (process.stdout.isTTY) {
						clearLine();
						process.stdout.write(chalk.green('\t✔ ') + 'iLib locale data\n');
					} else {
						process.stdout.write('DONE\n');
					}
				});
			}
		})
		.then(() => {
			if (!process.argv.includes('--skip-tests')) {
				return findViews(base).then(files => (
					files.forEach(file => (
						epack({
							file,
							opts: [
								'pack',
								'--entry',
								path.join(__dirname, '..', base, 'index.js'),
								'--output',
								path.join('tests', base, 'dist', path.basename(file.fullPath, '.js')),
								'--externals',
								'tests/' + base + '/dist/framework',
								'--externals-polyfill'
							]
						})
					))
				));
			}
		})
		.then(() => {
			if (base.includes('screenshot')) {
				const distUtils = path.join('tests', base, 'dist', 'utils'),
					redistSrc = path.join(__dirname, '..', 'screenshot', 'utils', 'redist');

				if (!fs.existsSync(distUtils)) {
					fs.mkdirSync(distUtils);
				}

				return fs.copy(redistSrc, distUtils);
			}
		})
		.catch(err => {
			console.error(chalk.red('Build failed:'));
			console.error();
			console.error(err.message);
			process.exit(1);
		});
}

function clearLine () {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
}

function epack ({file, opts}) {
	process.stdout.write('\t' + path.basename(file.basename, '.js') + '... ');
	const result = spawn.sync('enact', opts, {
		cwd: process.cwd(),
		env: {
			...process.env,
			...env,
			ILIB_CONTEXT: path.dirname(file.fullPath),
			ENACT_ALIAS: JSON.stringify({UI_TEST_APP_ENTRY: file.fullPath}),
			PUBLIC_URL: '/' + path.basename(file.fullPath, '.js')
		},
		encoding: 'utf8'
	});
	if (result.status === 0) {
		if (process.stdout.isTTY) {
			clearLine();
			process.stdout.write(chalk.green('\t✔ ') + path.basename(file.basename, '.js') + '\n');
		} else {
			process.stdout.write('DONE\n');
		}
	} else {
		let err = '';
		if (result.stdout) {
			err += result.stdout.split(/\n+/).slice(2).join('\n');
		}
		if (result.stderr) err += '\n' + result.stderr;

		if (process.stdout.isTTY) {
			clearLine();
			process.stdout.write(chalk.red('\t✖ ') + path.basename(file.basename, '.js') + '\n\n');
		} else {
			process.stdout.write('ERROR\n\n');
		}
		throw new Error(err || 'Unknown error');
	}
}

export default buildApps;
const modulePath = url.fileURLToPath(import.meta.url);
if (process.argv[1] === modulePath) buildApps();
