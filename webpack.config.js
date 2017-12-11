const path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, './main.js'),
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    ],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'cardsFramework.js',
  },

};
