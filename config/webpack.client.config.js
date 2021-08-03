const path = require('path');
const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';

// target : client (web)
const config = {
  name: 'client',
  target: 'web',
  mode: 'production',
  entry: {
    client: [
      path.resolve(__dirname, '../src/index.tsx'),
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: '../config/tsconfig.client.json',
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          env === 'production' ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
              sourceMap: true,
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ]
}

if (env === 'development') {
  Object.assign(config, {
    mode: 'development',
    devtool: 'source-map',
    entry: {
      client: [
        'webpack-hot-middleware/client?reload=true',
        path.resolve(__dirname, '../src/index.tsx'),
      ]
    },
    output: {
      ...config.output,
      filename: '[name].js', // hash 제거
    },
    plugins: [
      ...config.plugins,
      new webpack.HotModuleReplacementPlugin(),
    ]
  })
}

module.exports = config;