module.exports = api => {
  const web = api.caller((caller) => { return Boolean(caller && caller.target === 'web') });
  const webpack = api.caller((caller) => { return Boolean(caller && caller.target === 'babel-loader') });

  api.cache(true);

  return {
    presets: [
      "@babel/preset-react",
      "@babel/preset-typescript",
      [
        "@babel/preset-env",
        {
          useBuiltIns: web ? 'entry' : undefined,
          targets: !web ? { node: 'current' } : undefined,
          modules: webpack ? false : 'commonjs'
        },
      ],
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      "@babel/proposal-class-properties",
      "@babel/proposal-object-rest-spread",
      "@babel/plugin-syntax-dynamic-import"
    ]
  }
}