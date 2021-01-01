module.exports = env => {
  let config = require(`./webpack/webpack.${env}`)
  // if (env === 'development') {
  //   config = require(`./webpack/webpack.dev-${env}`)
  // }
  return config;
}