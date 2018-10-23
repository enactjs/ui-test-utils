const fs = require('fs');
const path = require('path');
const autoprefixer = require('autoprefixer');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const flexbugfixes = require('postcss-flexbugs-fixes');
const LessPluginRi = require('resolution-independence');
const {DefinePlugin} = require('webpack');
const app = require('@enact/dev-utils/option-parser');
const GracefulFsPlugin = require('@enact/dev-utils/plugins/GracefulFsPlugin');
const ILibPlugin = require('@enact/dev-utils/plugins/ILibPlugin');
const WebOSMetaPlugin = require('@enact/dev-utils/plugins/WebOSMetaPlugin');

const cssIdent = /(?:@(enact[/\\].*)|^((?:(?!@enact).)*))\.(?:less|css)/;

function resolveModule (ref, rel = '') {
	const dir = path.dirname(ref);
	if(dir !== ref) {
		rel = path.join(path.basename(ref), rel);
		const possibleMeta = path.join(dir, 'package.json');
		if(fs.existsSync(possibleMeta)) {
			const meta = require(possibleMeta);
			if(meta.name) {
				return path.join(meta.name, rel).replace(/[/\\]+/g, '/');
			}
		}
		return resolveModule(dir, rel);
	}
}

module.exports = function (env) {
	const TARGET_PLATFORM = env.TARGET_PLATFORM || 'Chrome 53';

	process.chdir(app.context);

	// This is the development configuration.
	// It is focused on developer experience and fast rebuilds.
	// The production configuration is different and lives in a separate file.
	return {
		// Don't attempt to continue if there are any errors.
		bail: false,
		// We use sourcemaps to allow devtools to view the original module code data
		devtool: 'cheap-module-source-map',
		// Cache during build
		cache: true,
		// These are the "entry points" to our application.
		// This means they will be the "root" imports that are included in JS bundle.
		// The first two entry points enable "hot" CSS and auto-refreshes for JS.
		entry: {
			main: [app.context]
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
			modules: [path.resolve('./node_modules'), 'node_modules'],
			alias: {
				'UI_TEST_APP_ENTRY': env.APPENTRY,
				// Support ilib shorthand alias for ilib modules
				ilib: '@enact/i18n/ilib/lib'
			}
		},
		module: {
			rules: [
				// "file" loader makes sure those assets get copied during build
				// When you `import` an asset, you get its output filename.
				{
					exclude: /\.(html|js|jsx|css|less|ejs|json)$/,
					loader: require.resolve('file-loader'),
					options: {
						name: '[path][name].[ext]'
					}
				},
				// Process JS with Babel.
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules.(?!@enact)/,
					use: [
						require.resolve('thread-loader'),
						{
							loader: require.resolve('babel-loader'),
							options: {
								presets: [
									[
										'@babel/preset-env',
										{
											targets: {browsers: [TARGET_PLATFORM]},
											exclude: ['transform-regenerator', 'web.dom.iterable', 'web.timers', 'web.immediate'],
											useBuiltIns: 'entry',
											modules: false
										}
									],
									'@babel/preset-stage-0',
									'@babel/preset-react'
								],
								plugins: [
									'dev-expression',
									'@babel/plugin-transform-react-jsx-self',
									'@babel/plugin-transform-react-jsx-source',
									'@babel/plugin-transform-react-inline-elements'
								],
								// This is a feature of `babel-loader` for webpack (not Babel itself).
								// It enables caching results in ./node_modules/.cache/babel-loader/
								// directory for faster rebuilds.
								cacheDirectory: true,
								highlightCode: true
							}
						}
					]
				},
				// Multiple styling-support features are used together.
				// "less" loader compiles any LESS-formatted syntax into standard CSS.
				// "postcss" loader applies autoprefixer to our CSS.
				// "css" loader resolves paths in CSS and adds assets as dependencies.
				// `ExtractTextPlugin` applies the "less", "postcss" and "css" loaders,
				// then grabs the result CSS and puts it into a separate file in our
				// build process. If you use code splitting, any async bundles will still
				// use the "style" loader inside the async code so CSS from them won't be
				// in the main CSS file.
				{
					test: /\.(c|le)ss$/,
					// Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
					loader: ExtractTextPlugin.extract({
						fallback: require.resolve('style-loader'),
						use: [
							{
								loader: require.resolve('css-loader'),
								options: {
									importLoaders: 2,
									modules: true,
									sourceMap: true,
									localIdentName: '[name]__[local]',
									getLocalIdent: (context, localIdentName, localName) => {
										let rel = path.relative(app.context, context.resourcePath);
										if(rel.startsWith('..')) {
											rel = resolveModule(fs.realpathSync(rel));
										}
										const ident = rel.match(cssIdent);
										return ((ident && (ident[1] || ident[2])) || 'unknown').replace(/[/\\]+/g, '_') +
												'_' + localName;
									}
								}
							},
							{
								loader: require.resolve('postcss-loader'),
								options: {
									ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
									sourceMap: true,
									plugins: () => [
										// We use PostCSS for autoprefixing only, but others could be added.
										autoprefixer({
											browsers: [TARGET_PLATFORM],
											flexbox: 'no-2009',
											remove: false
										}),
										// Fix and adjust for known flexbox issues
										// See https://github.com/philipwalton/flexbugs
										flexbugfixes
									]
								}
							},
							{
								loader: require.resolve('less-loader'),
								options: {
									sourceMap: true,
									// If resolution independence options are specified, use the LESS plugin.
									plugins: app.ri ? [new LessPluginRi(app.ri)] : []
								}
							}
						]
					})
				}
				// ** STOP ** Are you adding a new loader?
				// Remember to add the new extension(s) to the "file" loader exclusion regex list.
			]
		},
		performance: {
			hints: false
		},
		plugins: [
			// Generates an `index.html` file with the js and css tags injected.
			new HtmlWebpackPlugin({
				// Title can be specified in the package.json enact options or will
				// be determined automatically from any appinfo.json files discovered.
				title: env.APPTITLE || 'UI Test',
				inject: 'body',
				template: path.join(__dirname, 'html-template.ejs'),
				xhtml: true
			}),
			// Make NODE_ENV environment variable available to the JS code, for example:
			// if (process.env.NODE_ENV === 'development') { ... }.
			new DefinePlugin({
				'process.env': {
					NODE_ENV: '"development"'
				}
			}),
			// Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
			new ExtractTextPlugin('[name].css'),
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
			// the build to the output directory.
			new ILibPlugin(),
			// Automatically detect ./appinfo.json and ./webos-meta/appinfo.json files,
			// and parses any to copy over any webOS meta assets at build time.
			new WebOSMetaPlugin()
		]
	};
}

