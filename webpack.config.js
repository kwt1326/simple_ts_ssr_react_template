const webpackClientConfig = require('./webpack/webpack.client');
const webpackServerConfig = require('./webpack/webpack.server');

module.exports = [webpackClientConfig, webpackServerConfig]