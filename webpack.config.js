const path = require('path');

module.exports = {

  entry: [
    path.join(__dirname, './dev/main.js'),
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'cardsFramework.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
  externals: ['react-dom', 'react'],

};
