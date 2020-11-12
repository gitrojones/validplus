module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: 'ie 9, >0.25%, not dead',
      useBuiltIns: 'usage',
      corejs: 3
    }]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-object-rest-spread'
  ],
  comments: process.env.NODE_ENV !== 'production',
  sourceType: 'unambiguous'
};
