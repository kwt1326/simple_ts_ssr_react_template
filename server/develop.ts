const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackClientConfig = require('../config/webpack.client.config.js');
const webpackServerConfig = require('../config/webpack.server.config.js');

const options = {
  publicPath: './dist',
  contentBase: './dist',
  hot: true,
  host: 'localhost',
}

webpackDevServer.addDevServerEntrypoints(webpackClientConfig, options);

const compiler = webpack(webpackClientConfig);
const server = new webpackDevServer(compiler, options);

server.listen(process.env.PORT, 'localhost', () => { console.log(`listening start ${process.env.PORT} port ...`) })