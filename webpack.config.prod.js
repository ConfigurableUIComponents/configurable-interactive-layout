const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {

  entry: [
    path.join(__dirname, 'src', 'index.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'cardsLayoutManager.js',
    publicPath: '/',
    library: 'cardsLayoutManager',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', query: { sourceMaps: true } },
            //  { loader: 'postcss-loader' },
            { loader: 'sass-loader', query: { sourceMaps: true } },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('cards-framework.css'),
  ],
  externals: ['react-dom', 'react'],

});
