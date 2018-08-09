let env = ((process || {}).env || {}).NODE_ENV || 'production'

export default env === 'development'
  ? (...msg) => console.log('[Debug]', ...msg)
  : () => null
