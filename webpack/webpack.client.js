const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = ({
  mode: process.env.NODE_ENV || 'development',
  name: 'client',
  target: 'web',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, '../dist/web'),
    filename: 'client-bundle.js',
    publicPath: '/web/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            },
          }
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          miniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new miniCssExtractPlugin(),
  ],
  externals: [nodeExternals()],
});