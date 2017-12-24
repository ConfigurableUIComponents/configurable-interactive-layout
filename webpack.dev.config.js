const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common,{
  devtool: 'source-map',
  devServer: {
    contentBase: [path.join(__dirname, "res")],
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  entry: [
    path.join(__dirname, './dev/main.js'),
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  module: {
    rules: [{
      test: /\.(css|scss)$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      }],
    },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Dev Mode - Cards Framework',
  })],
});
