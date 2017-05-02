let path = require('path');
let webpack = require('webpack');
let autoprefixer = require('autoprefixer');
let LessPluginRi = require('resolution-independence');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let GracefulFsPlugin = require('graceful-fs-webpack-plugin');
let ILibPlugin = require('ilib-webpack-plugin');

let pkg = require('./package.json') || {};
let enact = pkg.enact || {};

process.env.NODE_ENV = 'development';

module.exports = {
	bail: true,
	devtool: 'cheap-module-source-map',
	entry: {
		main: [
			require.resolve('./polyfills'),
			path.resolve('loader/index.js')
		]
	},
	output: {
		path: path.resolve('./dist'),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.es6'],
		root: path.resolve('./node_modules'),
		alias: {
			'ilib':'@enact/i18n/ilib/lib'
		}
	},
	resolveLoader: {
		root: path.resolve(__dirname, './node_modules')
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx|es6)$/,
				loader: 'babel',
				exclude: /node_modules.(?!@enact)/,
				query: {
					presets: [
						require.resolve('babel-preset-es2015'),
						require.resolve('babel-preset-stage-0'),
						require.resolve('babel-preset-react')
					],
					plugins: [
						require.resolve('babel-plugin-dev-expression'),
						require.resolve('babel-plugin-dynamic-import-webpack')
					],
					cacheDirectory: true
				}
			},
			{
				test: /\.(c|le)ss$/,
				loader: ExtractTextPlugin.extract('style',
						'css?-autoprefixer&modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]!postcss!less?sourceMap')
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				loader: 'file',
				query: {
					name: '[path][name].[ext]'
				}
			},
			{
				test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: '[path][name].[ext]'
				}
			}
		]
	},
	postcss: function () {
		return [
			autoprefixer({
				browsers: [
					'>1%',
					'last 4 versions',
					'Firefox ESR',
					'not ie < 9' // React doesn't support IE8 anyway
				]
			})
		];
	},
	lessLoader: {
		lessPlugins: ((enact.ri) ? [new LessPluginRi(enact.ri)] : [])
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: process.env.APPTITLE || 'UI Test',
			inject: 'body',
			template: path.join(__dirname, 'html-template.ejs'),
			xhtml: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"development"'
			}
		}),
		new ExtractTextPlugin('[name].css'),
		new GracefulFsPlugin(),
		new ILibPlugin()
	]
};
