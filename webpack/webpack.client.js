const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

const config = ({
  mode: process.env.NODE_ENV || 'development',
  name: 'client',
  target: 'web',
  entry: {
    main: path.resolve(__dirname, '/src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'client-bundle.js',
    publicPath: '/web/',
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          {
            loader: isDev ? 'style-loader' : miniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
                exportOnlyLocals: false,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
         {
          loader: 'url-loader',
          options: {
           useRelativePath: true,
           limit: 10000
          }
         }
        ]
      },
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
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
    modules: ['src', 'node_modules'],
  },
  plugins: []
});

if (isDev) {
  config.plugins = [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new miniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
    }),
  ]
  config.entry = {
    main: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, '/src/index.tsx'),
    ]
  }
}

module.exports = config;