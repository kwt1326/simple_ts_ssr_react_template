const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WebpackChunkHash = require('webpack-chunk-hash');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');


const config = {
  mode: process.env.NODE_ENV || 'development',
  name: 'server',
  target: 'node',
  node: false,
  entry: './server/index.tsx',
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: 'server-bundle.js',
    chunkFilename: '[name].js',
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
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/
    })]
  },
  externals: [nodeExternals()],
};

if (process.env.NODE_ENV === 'production') {
  config.output.filename = '[name].[chunkhash].js';
  config.plugins = [
    ...config.plugins, // ES6 array destructuring, available in Node 5+
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
      inlineManifest: true,
    }),
  ];
}

module.exports = config;