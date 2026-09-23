import path from 'path';

let chalk;
import spawn from 'cross-spawn';
import fs from 'fs-extra';
import {readdirpPromise} from 'readdirp';
import * as url from 'url';

const env = {
	ILIB_BASE_PATH: '/framework/ilib',
	ILIB_ASSET_CREATE: 'false',
	SIMPLE_CSS_IDENT: 'true',
	BROWSERSLIST: 'Chrome 132'
};

function findViews (base) {
	return readdirpPromise(path.join('tests', base, 'apps'), {
		fileFilter: (entry) => entry.basename.endsWith('-View.js')
	});
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
						'--production',
						'--no-linting',
						'--output',
						path.join('tests', base, 'dist', 'framework'),
						'--framework',
						'--externals-polyfill',
						process.argv.includes('--no-animation') ? '--no-animation' : null
					].filter(Boolean),
					artifact: path.join('tests', base, 'dist', 'framework', 'enact.js')
				});
			}
		})
		.then(() => {
			if (!process.argv.includes('--skip-ilib')) {
				const ilibDist = path.join('tests', base, 'dist', 'framework', 'ilib');
				fs.ensureDirSync(ilibDist);
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
				return findViews(base).then(files => {
					files.forEach(file => {
						epack({
							file,
							opts: [
								'pack',
								'--production',
								'--no-linting',
								'--entry',
								path.join(__dirname, '..', base, 'index.js'),
								'--output',
								path.join('tests', base, 'dist', path.basename(file.fullPath, '.js')),
								'--externals',
								'tests/' + base + '/dist/framework',
								'--externals-polyfill'
							],
							artifact: path.join(
								'tests',
								base,
								'dist',
								path.basename(file.fullPath, '.js'),
								'main.js'
							)
						});
						ensureViewIndex(
							path.join('tests', base, 'dist', path.basename(file.fullPath, '.js'))
						);
					});
				});
			}
		})
		.then(() => {
			if (base.includes('screenshot')) {
				const distUtils = path.join('tests', base, 'dist', 'utils'),
					redistSrc = path.join(__dirname, '..', 'screenshot', 'utils', 'redist');

				fs.ensureDirSync(distUtils);

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

function ensureViewIndex (outDir) {
	const defaultDist = path.join(process.cwd(), 'dist');
	if (!fs.existsSync(path.join(outDir, 'main.js')) && fs.existsSync(path.join(defaultDist, 'main.js'))) {
		fs.copySync(defaultDist, outDir);
	}

	const listing = fs.existsSync(outDir) ? fs.readdirSync(outDir) : [];
	process.stdout.write('\t' + outDir + ': ' + (listing.join(', ') || '(empty)') + '\n');

	const indexPath = path.join(outDir, 'index.html');
	if (fs.existsSync(indexPath)) return;

	const js = listing.find(name => name === 'main.js') || listing.find(name => name.endsWith('.js')) || 'main.js';
	const css = listing.find(name => name === 'main.css') || listing.find(name => name.endsWith('.css'));
	const cssLink = css ? `<link rel="stylesheet" href="${css}"/>` : '';

	fs.ensureDirSync(outDir);
	fs.writeFileSync(
		indexPath,
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<title>UI Test</title>
		<link rel="stylesheet" href="../framework/enact.css"/>
		${cssLink}
	</head>
	<body>
		<div id="root"></div>
		<script src="../framework/enact.js"></script>
		<script src="${js}"></script>
	</body>
</html>
`
	);
	process.stdout.write('\twrote missing ' + indexPath + '\n');
}

function clearLine () {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
}

function epack ({file, opts, artifact}) {
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
	const spawnOutput = [result.stdout, result.stderr].filter(Boolean).join('\n');
	if (result.status === 0 && artifact) {
		const fallback = path.join(process.cwd(), 'dist', path.basename(artifact));
		if (!fs.existsSync(artifact) && fs.existsSync(fallback)) {
			fs.ensureDirSync(path.dirname(artifact));
			fs.copySync(path.dirname(fallback), path.dirname(artifact));
		}
	}
	if (result.status === 0 && (!artifact || fs.existsSync(artifact))) {
		if (process.stdout.isTTY) {
			clearLine();
			process.stdout.write(chalk.green('\t✔ ') + path.basename(file.basename, '.js') + '\n');
		} else {
			process.stdout.write('DONE\n');
		}
		return;
	}

	let err = spawnOutput;
	if (result.status === 0 && artifact && !fs.existsSync(artifact)) {
		err = 'Pack exited 0 but missing ' + artifact + (err ? '\n' + err : '');
	}

	if (process.stdout.isTTY) {
		clearLine();
		process.stdout.write(chalk.red('\t✖ ') + path.basename(file.basename, '.js') + '\n\n');
	} else {
		process.stdout.write('ERROR\n\n');
	}
	throw new Error(err || 'Unknown error');
}

export default buildApps;
const modulePath = url.fileURLToPath(import.meta.url);
if (process.argv[1] === modulePath) buildApps();
