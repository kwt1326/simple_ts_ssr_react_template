module.exports = api => {
  return {
    "presets": [
      "@babel/typescript",
      "@babel/react",
      [
        "@babel/env",
        { targets: { node: 'current' } }
      ],
    ],
    "plugins": [
      "@babel/proposal-class-properties",
      "@babel/proposal-object-rest-spread"
    ]
  }
}