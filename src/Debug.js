export function () {
  let env = ((process || {}).env || {}).NODE_ENV || 'production'
  return env === 'development'
    ? (...msg) => console.log('[Debug]', ...msg)
    : () => null
}
