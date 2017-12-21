const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
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
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
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
      },
      ],
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
    {
      test: /\.(jpe?g|png|gif|svg)$/,
      use: [
        {
          loader: 'url-loader',
          options: { limit: 40000 },
        },
        'svg-fill-loader',
        'image-webpack-loader',
      ],
      exclude: /node_modules/,
    },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Dev Mode - Cards Framework',
  })],
};
