const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {

  entry: {
    'configurable-view-visualizations': [
      path.join(__dirname, './src', '/index.js')
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
    library: 'interactiveLayout',
    libraryTarget: 'umd',
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
