export default process.env.NODE_ENV === 'development'
  ? (...msg) => console.log('[Debug]', ...msg)
  : () => null
