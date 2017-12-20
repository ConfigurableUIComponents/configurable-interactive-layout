const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry: [
    path.join(__dirname, 'src', 'index.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'CardsLayoutManager.dist.js',
    publicPath: '/',
    library: 'CardsLayoutManager',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        },
        {
          loader: 'eslint-loader',
          options: {
            failOnError: true,
          },
        }],
      },
      {
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
  plugins: [
    // new ExtractTextPlugin('cardsFramework.css'),
  ],

  externals: ['react-dom', 'react'],

};
