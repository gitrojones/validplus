module.exports = {
  plugins: [
    'lodash',
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-object-rest-spread'
  ],
  comments: process.env.NODE_ENV !== 'production',
  sourceType: 'unambiguous'
};
