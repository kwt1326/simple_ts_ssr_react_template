const path = require('path');
const nodeExternals = require('webpack-node-externals');

const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';

// target : node
const config = {
  name: 'server',
  target: 'node',
  mode: 'production',
  entry: {
    server: path.resolve(__dirname, '../server/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js', // name: 'server'
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.tsx', 'js'],
  },
  externals: [nodeExternals()],
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: '../config/tsconfig.server.json',
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
        ],
      }
    ]
  },
}

if (env === 'development') {
  Object.assign(config, {
    mode: 'development',
    devtool: 'source-map',
  })
}

module.exports = config;