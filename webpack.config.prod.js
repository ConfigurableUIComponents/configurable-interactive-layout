const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
  devtool: 'source-map',
  entry: {
    'configurable-interactive-layout': [
      path.join(__dirname, '/index.js')
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
    library: 'configurableInteractiveLayout',
    libraryTarget: 'umd',
    sourceMapFilename: "[name].js.map",
  },
  externals: [
    'react-dom',
    'react',
    'prop-types'
  ],
  mode: 'production',
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  }
});
