const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
  entry: [
    path.join(__dirname, './dev/dev-dist/main.dist.js'),
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'dist_bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
});
