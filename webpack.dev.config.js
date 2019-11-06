const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
  devtool: 'source-map',
  devServer: {
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
    // Enable gzip compression of generated files.
    compress: true,
    // where to pull the source from
    contentBase: './dist',
    // enable hot module replacement
    hot: true,
    // launch a browser by default on start up
    open: true
  },
  entry: {
    'configurable-interactive-layout': [
      path.join(__dirname, './dev', '/main.js')
    ]
  },
  output: {
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Dev Mode - Cards Framework",
      filename: 'index.html'
    })
  ]
});
