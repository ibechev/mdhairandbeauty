const webpack = require('webpack');
const debug = process.env.NODE_ENV !== 'production';

const config = {
	context: __dirname + '/webroot/js',
	devtool: debug ? 'inline-sourcemap' : null,
	entry: ['babel-polyfill', './entry.js'],
	output: {
		path: __dirname + '/webroot/js/build/',
		filename: 'scripts.min.js'
	},
	resolve: {
		extensions: ['.js', 'json']
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	plugins: debug
		? []
		: [
				new webpack.optimize.DedupePlugin(),
				new webpack.optimize.OccurenceOrderPlugin(),
				new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
		  ],
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	]
};

module.exports = config;
