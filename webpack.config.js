var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname + "/webroot/js",
  devtool: debug ? "inline-sourcemap" : null,
  entry: ['babel-polyfill', './entry.js'],
  output: {
    path: __dirname + "/webroot/js/build/",
    filename: "scripts.min.js"
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    }]
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
  plugins: [
      new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]

};
