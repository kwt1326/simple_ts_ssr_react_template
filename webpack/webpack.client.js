const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const config = ({
  mode: process.env.NODE_ENV || 'development',
  name: 'client',
  target: 'web',
  entry: path.resolve(__dirname, '/src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'client-bundle.js',
    publicPath: '/web/',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)?$/,
        use: [
          //'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            },
          }
        ],
        exclude: /node_modules/,
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
    modules: ['src', 'node_modules'],
  },
  plugins: [
    new miniCssExtractPlugin(),
  ],
  // externals: [nodeExternals()],
});

if (process.env.NODE_ENV === 'development') {
  config.plugins = [
    ...config.plugins, // ES6 array destructuring, available in Node 5+
    new webpack.HotModuleReplacementPlugin(),
  ]
}

module.exports = config;