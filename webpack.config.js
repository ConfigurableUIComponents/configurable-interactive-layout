const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', query: { sourceMaps: true } },
            //  { loader: 'postcss-loader' },
            { loader: 'sass-loader', query: { sourceMaps: true } }
          ],
        }),
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
  plugins: [
    new ExtractTextPlugin('cards-framework.css'),
  ],

  externals: ['react-dom', 'react'],

};
