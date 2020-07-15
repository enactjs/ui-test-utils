const fs = require('fs');
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {DefinePlugin, EnvironmentPlugin} = require('webpack');
const {optionParser: app, GracefulFsPlugin, ILibPlugin} = require('@enact/dev-utils');

const cssIdent = /(?:@(enact[/\\].*?)|^((?:(?!@enact).)*?))\.(?:module\.)?(?:less|css)/;

function resolveModule (ref, rel = '') {
	const dir = path.dirname(ref);
	if (dir !== ref) {
		rel = path.join(path.basename(ref), rel);
		const possibleMeta = path.join(dir, 'package.json');
		if (fs.existsSync(possibleMeta)) {
			const meta = require(possibleMeta);
			if (meta.name) {
				return path.join(meta.name, rel).replace(/[/\\]+/g, '/');
			}
		}
		return resolveModule(dir, rel);
	}
}

app.setEnactTargetsAsDefault();

const cssModuleOpts = {
	localIdentName: '[name]__[local]',
	getLocalIdent: (context, localIdentName, localName) => {
		let rel = path.relative(app.context, context.resourcePath);
		if (rel.startsWith('..')) {
			rel = resolveModule(fs.realpathSync(rel));
		}
		const ident = rel.match(cssIdent);
		return ((ident && (ident[1] || ident[2])) || 'unknown').replace(/[/\\]+/g, '_') +
				'_' + localName;
	}
};

const getStyleLoaders = (cssLoaderOptions = {}, preProcessor) => {
	const loaders = [
		MiniCssExtractPlugin.loader,
		{
			loader: require.resolve('css-loader'),
			options: Object.assign(
				{importLoaders: preProcessor ? 2 : 1, sourceMap: true},
				cssLoaderOptions,
				cssLoaderOptions.modules && {modules: cssModuleOpts}
			)
		},
		{
			loader: require.resolve('postcss-loader'),
			options: {
				ident: 'postcss',
				sourceMap: true,
				plugins: () =>
					[
						require('postcss-flexbugs-fixes'),
						require('postcss-global-import'),
						require('postcss-preset-env')({
							autoprefixer: {
								flexbox: 'no-2009',
								remove: false
							},
							stage: 3,
							features: {'custom-properties': false}
						}),
						require('postcss-normalize')(),
						app.ri !== false && require('postcss-resolution-independence')(app.ri)
					].filter(Boolean)
			}
		}
	];
	if (preProcessor) {
		loaders.push(preProcessor);
	}
	return loaders;
};

const getLessStyleLoaders = cssLoaderOptions =>
	getStyleLoaders(cssLoaderOptions, {
		loader: require.resolve('less-loader'),
		options: {
			lessOptions: {
				modifyVars: Object.assign({__DEV__: true}, app.accent)
			},
			sourceMap: true
		}
	});

module.exports = function (env) {
	const indexPath = env.APPOUTPUT.match('screenshot') ? 'screenshot' : 'ui';
	process.env.NODE_ENV = 'development';
	process.chdir(app.context);

	// This is the development configuration.
	// It is focused on developer experience and fast rebuilds.
	// The production configuration is different and lives in a separate file.
	return {
		mode: 'development',
		// Don't attempt to continue if there are any errors.
		bail: true,
		// We use sourcemaps to allow devtools to view the original module code data
		devtool: 'cheap-module-source-map',
		// These are the "entry points" to our application.
		// This means they will be the "root" imports that are included in JS bundle.
		// The first two entry points enable "hot" CSS and auto-refreshes for JS.
		entry: {
			main: [path.join(__dirname, '..', indexPath, 'index.js')]
		},
		output: {
			// The build output directory.
			path: path.resolve(env.APPOUTPUT || './dist'),
			// Generated JS file names (with nested folders).
			// There will be one main bundle, and one file per asynchronous chunk.
			// We don't currently advertise code splitting but Webpack supports it.
			filename: '[name].js',
			// There are also additional JS chunk files if you use code splitting.
			chunkFilename: 'chunk.[name].js',
			// Add /* filename */ comments to generated require()s in the output.
			pathinfo: true
		},
		resolve: {
			// These are the reasonable defaults supported by the React/ES6 ecosystem.
			extensions: ['.js', '.jsx', '.json'],
			// Allows us to specify paths to check for module resolving.
			modules: [path.resolve('./node_modules'), 'node_modules'],
			symlinks: false,
			alias: fs.existsSync(path.join(app.context, 'node_modules', '@enact', 'i18n', 'ilib')) ?
				{'UI_TEST_APP_ENTRY': env.APPENTRY, ilib: '@enact/i18n/ilib'} :
				{'UI_TEST_APP_ENTRY': env.APPENTRY, '@enact/i18n/ilib': 'ilib'}
		},
		// Resolve loaders (webpack plugins for CSS, images, transpilation) from the
		// directory of `@enact/cli` itself rather than the project directory.
		resolveLoader: {
			modules: [path.resolve(__dirname, '../node_modules'), path.resolve('./node_modules')]
		},
		module: {
			rules: [
				{
					// "oneOf" will traverse all following loaders until one will
					// match the requirements. When no loader matches it will fall
					// back to the "file" loader at the end of the loader list.
					oneOf: [
						// Process JS with Babel.
						{
							test: /\.(js|mjs|jsx)$/,
							exclude: /node_modules.(?!@enact)/,
							loader: require.resolve('babel-loader'),
							options: {
								configFile: path.join(__dirname, 'babel.config.js'),
								babelrc: false,
								// This is a feature of `babel-loader` for webpack (not Babel itself).
								// It enables caching results in ./node_modules/.cache/babel-loader/
								// directory for faster rebuilds.
								cacheDirectory: true,
								cacheCompression: false,
								compact: false
							}
						},
						// Style-based rules support both LESS and CSS format, with *.module.* extension format
						// to designate CSS modular support.
						// See comments within `getStyleLoaders` for details on the stylesheet loader chains and
						// options used at each level of processing.
						{
							test: /\.module\.css$/,
							use: getStyleLoaders({modules: true})
						},
						{
							test: /\.css$/,
							// The `forceCSSModules` Enact build option can be set true to universally apply
							// modular CSS support.
							use: getStyleLoaders({modules: app.forceCSSModules}),
							// Don't consider CSS imports dead code even if the
							// containing package claims to have no side effects.
							// Remove this when webpack adds a warning or an error for this.
							// See https://github.com/webpack/webpack/issues/6571
							sideEffects: true
						},
						{
							test: /\.module\.less$/,
							use: getLessStyleLoaders({modules: true})
						},
						{
							test: /\.less$/,
							use: getLessStyleLoaders({modules: app.forceCSSModules}),
							sideEffects: true
						},
						// "file" loader handles on all files not caught by the above loaders.
						// When you `import` an asset, you get its output filename and the file
						// is copied during the build process.
						{
							loader: require.resolve('file-loader'),
							// Exclude `js` files to keep "css" loader working as it injects
							// its runtime that would otherwise be processed through "file" loader.
							// Also exclude `html` and `json` extensions so they get processed
							// by webpacks internal loaders.
							// Exclude `ejs` HTML templating language as that's handled by
							// the HtmlWebpackPlugin.
							exclude: [/\.(js|mjs|jsx)$/, /\.html$/, /\.ejs$/, /\.json$/],
							options: {
								name: '[path][name].[ext]'
							}
						}
					]
				}
			]
		},
		// Specific webpack-dev-server options
		devServer: {
			// Broadcast http server on the localhost, port 8080
			host: '0.0.0.0',
			port: 8080
		},
		// Target app to build for a specific environment (default 'web')
		target: app.environment,
		// Optional configuration for polyfilling NodeJS built-ins.
		node: app.nodeBuiltins,
		performance: false,
		plugins: [
			// Generates an `index.html` file with the js and css tags injected.
			new HtmlWebpackPlugin({
				// Title can be specified in the package.json enact options or will
				// be determined automatically from any appinfo.json files discovered.
				title: env.APPTITLE || 'UI Test',
				inject: 'body',
				template: app.template || path.join(__dirname, '..', 'src', 'html-template.ejs'),
				xhtml: true
			}),
			// Make NODE_ENV environment variable available to the JS code, for example:
			// if (process.env.NODE_ENV === 'development') { ... }.
			new DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('development'),
				'process.env.PUBLIC_URL': JSON.stringify('.')
			}),
			// Inject prefixed environment variables within code, when used
			new EnvironmentPlugin(Object.keys(process.env).filter(key => /^REACT_APP_/.test(key))),
			// Note: this won't work without MiniCssExtractPlugin.loader in `loaders`.
			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: 'chunk.[name].css'
			}),
			// Watcher doesn't work well if you mistype casing in a path so this is
			// a plugin that prints an error when you attempt to do this.
			// See https://github.com/facebookincubator/create-react-app/issues/240
			new CaseSensitivePathsPlugin(),
			// Switch the internal NodeOutputFilesystem to use graceful-fs to avoid
			// EMFILE errors when hanndling mass amounts of files at once, such as
			// what happens when using ilib bundles/resources.
			new GracefulFsPlugin(),
			// Automatically configure iLib library within @enact/i18n. Additionally,
			// ensure the locale data files and the resource files are copied during
			// the build to the output directory. The configured context value requires
			// that resources directory be placed in the same folder as the entry point
			// javascript file (e.g. tests/ui/apps/Button/resources).
			new ILibPlugin({context: path.dirname(env.APPENTRY), symlinks: false})
		]
	};
};
