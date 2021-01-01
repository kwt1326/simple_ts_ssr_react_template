const nodeExternals = require('webpack-node-externals');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = target => ({
  mode: devMode ? 'development' : 'production',
  name: target,
  target: 'node',
  entry: './src/app.tsx',
  output: {
    path: path.resolve(__dirname, `dist/${target}`),
    filename: '[name].js',
    publicPath: '/web/',
    libraryTarget: target === 'node' ? 'commonjs2' : undefined,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          'ts-loader',
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